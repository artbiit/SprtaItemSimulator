import {
  getCharacterItems,
  searchItems,
  sellItem,
  getEquippedItemsAndStats,
  getItemById,
  getInventoryByItemName,
  updateInventoryItem,
  createInventoryItemWithItemData,
  getInventoryItem,
  equipItem,
  unequipItem,
  getRandomItemByRarity,
} from '../repositories/item-interaction-repository.js';
import {
  findCharacterNameAndGoldById,
  updateCharacterGold,
  getCharacterGoldAndRates,
} from '../repositories/character-repository.js';
import { getSelectedCharacterId } from '../repositories/user-repository.js';

import ApiError from '../errors/api-error.js';
import { prisma } from '../lib/prisma.js';

/**
 * 캐릭터의 아이템 목록 조회 서비스
 * @param {Object} param - 파라미터 객체
 * @param {number} param.userId - 유저 ID
 * @param {number} param.page - 페이지 번호
 * @param {number} param.pageSize - 페이지당 항목 수
 * @returns {Object} - 캐릭터의 아이템 목록 및 총 아이템 수
 * @returns {number} statusCode - 200: 성공, 400: 캐릭터 미선택
 */
export const listCharacterItems = async ({ userId = null, page, pageSize }) => {
  const characterId = await getSelectedCharacterId(userId);

  if (!characterId) {
    throw new ApiError('No character selected', 400);
  }

  return await getCharacterItems(characterId, page, pageSize);
};

/**
 * 아이템 검색 서비스
 * @param {Object} param - 검색 조건 객체
 * @param {string} param.searchTerm - 아이템 이름 검색어
 * @param {Object} [param.stats] - 스탯 조건
 * @param {number} [param.minValue] - 최소 가격
 * @param {boolean} [param.isEquippable] - 장비 가능 여부
 * @param {number} param.page - 페이지 번호
 * @param {number} param.pageSize - 페이지당 항목 수
 * @returns {Object} - 검색된 아이템 목록 및 총 개수
 * @returns {number} statusCode - 200: 성공
 */
export const findItems = async ({
  searchTerm,
  stats = null,
  minValue = null,
  isEquippable = null,
  page,
  pageSize,
}) => {
  // Prisma 쿼리 필터를 구성
  const filters = {};

  // 이름 검색 (포함되는지 여부)
  if (searchTerm) {
    filters.name = { contains: searchTerm };
  }

  // 스탯 조건 추가 (정확히 일치하는 값)
  if (stats != null) {
    filters.stats = { some: stats };
  }

  // 가격 (이상 조건)
  if (minValue !== null) {
    filters.value = { gte: minValue };
  }

  if (isEquippable !== null) {
    filters.isEquippable = isEquippable;
  }

  // 레포지터리에 쿼리 전달 및 결과 반환
  const [items, totalItems] = await searchItems(filters, page, pageSize);

  return {
    totalItems, // 검색된 총 아이템 수
    items, // 검색된 아이템 목록
  };
};

/**
 * 아이템 구매 서비스
 * @param {Object} param - 구매 요청 정보
 * @param {number} param.userId - 유저 ID
 * @param {string} param.role - 유저 역할 (ADMIN이면 가격이 0으로 설정)
 * @param {number} param.itemId - 구매할 아이템 ID
 * @param {number} [param.quantity=1] - 구매할 수량
 * @returns {Object} - 구매한 아이템 목록 및 남은 골드
 * @returns {number} statusCode - 200: 성공, 404: 캐릭터 또는 아이템을 찾을 수 없음, 400: 골드 부족
 */
export const purchaseItem = async ({
  userId = null,
  role = null,
  itemId,
  quantity = 1,
}) => {
  // 캐릭터 정보 가져오기
  const characterId = await getSelectedCharacterId(userId);
  if (!characterId) {
    throw new ApiError('Character not found', 404);
  }

  const character = await findCharacterNameAndGoldById(characterId);

  // 아이템 정보 가져오기
  const item = await getItemById(itemId);
  if (!item) {
    throw new ApiError('Item not found', 404);
  }
  // ADMIN이면 가격을 0으로 설정, 아니면 아이템 가격 * 수량 계산
  const finalPrice = role === 'ADMIN' ? 0 : item.value * quantity;

  // 유저가 충분한 골드를 가지고 있는지 확인
  if (character.gold < finalPrice) {
    throw new ApiError('Insufficient gold', 400);
  }

  // 아이템 보유 상황 확인
  let remainingQuantity = quantity;
  const existingItems = await getInventoryByItemName(characterId, item.name);

  // 트랜잭션 시작
  const result = await prisma.$transaction(async (prisma) => {
    // 유저의 골드 차감
    await updateCharacterGold(characterId, character.gold - finalPrice);

    // 기존 인벤토리에 아이템이 있으면 중첩 가능한 만큼 추가
    if (existingItems) {
      for (let i = 0; i < existingItems.length && remainingQuantity > 0; i++) {
        const availableSpace = item.maxStack - existingItems[i].quantity;
        const amountToAdd = Math.min(availableSpace, remainingQuantity);

        await updateInventoryItem(
          existingItems[i].id,
          existingItems[i].quantity + amountToAdd
        );
        remainingQuantity -= amountToAdd;
      }
    }

    // 남은 수량에 대해 새 슬롯에 아이템 생성
    while (remainingQuantity > 0) {
      const amountToAdd = Math.min(item.maxStack, remainingQuantity);
      await createInventoryItemWithItemData(characterId, item, amountToAdd);
      remainingQuantity -= amountToAdd;
    }

    // 유저의 남은 골드 및 아이템 상태 반환
    const updatedCharacter = await findCharacterNameAndGoldById(characterId);
    const finalInventory = await getInventoryByItemName(characterId, item.name);

    return { items: finalInventory, remainingGold: updatedCharacter.gold };
  });

  return result;
};
/**
 * 아이템 판매 서비스
 * @param {Object} param - 판매 요청 정보
 * @param {number} param.userId - 유저 ID
 * @param {string} param.itemName - 판매할 아이템 이름
 * @param {number} param.quantity - 판매할 수량
 * @returns {Object} - 판매 결과 (골드 및 남은 아이템)
 * @returns {number} statusCode - 200: 성공, 404: 캐릭터를 찾을 수 없음
 */
export const sellUserItem = async ({
  userId = null,
  role = null,
  itemName,
  quantity,
}) => {
  const salePriceFactor = role === 'ADMIN' ? 0.0 : 0.6;

  // 선택된 캐릭터 정보 가져오기
  const characterId = await getSelectedCharacterId(userId);
  if (!characterId) {
    throw new ApiError('Character not found', 404);
  }

  // 아이템 판매 처리
  return await sellItem({
    characterId,
    itemName,
    quantity,
    salePriceFactor,
  });
};

/**
 * 아이템 장착 서비스
 * @param {Object} param - 장착 요청 정보
 * @param {number} param.userId - 유저 ID
 * @param {number} param.itemId - 장착할 아이템 ID
 * @returns {Object} - 장착된 아이템 목록 및 최종 스탯
 * @returns {number} statusCode - 200: 성공, 404: 캐릭터를 찾을 수 없음
 */
export const equipUserItem = async ({ userId = null, itemId }) => {
  const characterId = await getSelectedCharacterId(userId);
  if (!characterId) {
    throw new ApiError('character not found', 404);
  }
  // 아이템 장착 (인벤토리 -> 장착으로 상태 변경)
  await equipItem(characterId, itemId);

  // 장착된 모든 아이템 및 스탯 정보 가져오기
  const { equippedItems, aggregatedStats } = await getEquippedItemsAndStats(
    characterId
  );

  // 캐릭터의 기본 스탯 가져오기
  const character = await prisma.character.findUnique({
    where: { id: characterId },
    select: {
      health: true,
      attackPower: true,
      defense: true,
      critChance: true,
      critMultiplier: true,
      evasion: true,
      accuracy: true,
    },
  });

  // 캐릭터의 최종 스탯 계산 (기본 스탯 + 장착된 아이템 스탯)
  const finalStats = {
    health: character.health + aggregatedStats.healthBonus,
    attackPower: character.attackPower + aggregatedStats.attackBonus,
    defense: character.defense + aggregatedStats.defenseBonus,
    critChance: character.critChance + aggregatedStats.critChanceBonus,
    critMultiplier:
      character.critMultiplier + aggregatedStats.critMultiplierBonus,
    evasion: character.evasion + aggregatedStats.evasionBonus,
    accuracy: character.accuracy + aggregatedStats.accuracyBonus,
  };

  return {
    equippedItems,
    finalStats,
    message: 'Item equipped successfully',
  };
};

/**
 * 아이템 장착 해제 서비스
 * @param {Object} param - 장착 해제 요청 정보
 * @param {number} param.userId - 유저 ID
 * @param {number} param.itemId - 장착 해제할 아이템 ID
 * @returns {Object} - 해제된 아이템 정보 및 장착된 아이템 목록
 * @returns {number} statusCode - 200: 성공, 404: 캐릭터를 찾을 수 없음
 */
export const unequipUserItem = async ({ userId = null, itemId }) => {
  const characterId = await getSelectedCharacterId(userId);
  if (!characterId) {
    throw new ApiError('Character not found', 404);
  }

  // 아이템 장착 해제
  const updatedItem = await unequipItem(characterId, itemId);

  // 장착 해제 후 캐릭터의 스탯 정보 및 장착된 아이템 목록 반환
  const { equippedItems, aggregatedStats } = await getEquippedItemsAndStats(
    characterId
  );

  return {
    unequippedItem: updatedItem,
    equippedItems,
    finalStats: aggregatedStats,
    message: 'Item unequipped successfully',
  };
};

/**
 * 사냥 보상 서비스
 * @param {Object} param - 유저 ID
 * @param {number} param.userId - 유저 ID
 * @returns {Object} - 보상으로 획득한 골드 및 아이템 정보
 * @returns {number} statusCode - 200: 성공, 404: 캐릭터를 찾을 수 없음
 */
export const rewardUserForHunting = async ({ userId = null }) => {
  const characterId = await getSelectedCharacterId(userId);
  if (!characterId) {
    throw new ApiError('Character not found', 404);
  }

  // 캐릭터 정보 가져오기
  const character = await getCharacterGoldAndRates(characterId);

  // 기본 골드 보상 + goldGainRate 반영
  const baseGold = 100;
  const additionalGold = baseGold * (1 + character.goldGainRate);
  const updatedGold = (
    await updateCharacterGold(characterId, character.gold + additionalGold)
  ).gold;

  // 아이템 획득 확률 계산
  const itemDropChance = Math.random(); // 0~1 사이의 랜덤 값
  let acquiredItem = null;

  // 낮은 확률로 아이템 획득 (예: 20% 확률)
  if (itemDropChance < 0.2) {
    const itemType = Math.random(); // 일반 아이템과 장비 아이템 구분

    // 장비 획득 (10% 확률)
    if (itemType < 0.1) {
      // 장비 아이템을 낮은 확률로 획득
      acquiredItem = await getRandomItemByRarity(characterId, true);
    } else {
      // 일반 아이템 획득
      acquiredItem = await getRandomItemByRarity(characterId, false);
    }

    if (acquiredItem) {
      // 기존 인벤토리 아이템 확인
      const existingItems = await getInventoryItem(
        characterId,
        acquiredItem.id
      );

      // 중첩 가능한 아이템이면 수량 결합 처리
      if (existingItems && existingItems.length > 0) {
        let remainingQuantity = 1; // 새로 획득한 아이템의 수량

        for (const existingItem of existingItems) {
          const availableSpace = acquiredItem.maxStack - existingItem.quantity;
          const amountToAdd = Math.min(availableSpace, remainingQuantity);

          if (amountToAdd > 0) {
            await updateInventoryItem(
              existingItem.id,
              existingItem.quantity + amountToAdd
            );
            remainingQuantity -= amountToAdd;
          }

          // 중첩 완료 시 중단
          if (remainingQuantity === 0) break;
        }

        // 남은 수량이 있다면 새로운 슬롯에 아이템 추가
        if (remainingQuantity > 0) {
          await createInventoryItemWithItemData(
            characterId,
            acquiredItem,
            remainingQuantity
          );
        }
      } else {
        // 아이템이 인벤토리에 없으면 새로 추가
        await createInventoryItemWithItemData(characterId, acquiredItem, 1);
      }
    }
  }

  // 최종 결과 반환
  return {
    message: 'Hunting reward gained!',
    goldEarned: additionalGold,
    currentGold: updatedGold,
    itemAcquired: acquiredItem
      ? `[${acquiredItem.rarity}]${acquiredItem.name}`
      : 'No item acquired',
  };
};
