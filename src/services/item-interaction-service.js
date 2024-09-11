import {
  getCharacterItems,
  searchItems,
  sellItem,
  getEquippedItemsAndStats,
  gainHuntingReward,
  getItemById,
  getInventoryByItemName,
  updateInventoryItem,
  createInventoryItemWithItemData,
  getInventoryItem,
  equipItem,
  unequipItem,
} from '../repositories/item-interaction-repository.js';
import {
  findCharacterNameAndGoldById,
  updateCharacterGold,
} from '../repositories/character-repository.js';
import { getSelectedCharacterId } from '../repositories/user-repository.js';

import ApiError from '../errors/api-error.js';
import { prisma } from '../lib/prisma.js';
// 캐릭터의 아이템 목록 서비스 (인벤토리 및 장착 아이템 포함) 및 총 아이템 수 반환
export const listCharacterItems = async ({ userId = null, page, pageSize }) => {
  const characterId = await getSelectedCharacterId(userId);

  if (!characterId) {
    throw new ApiError('No character selected', 400);
  }

  return await getCharacterItems(characterId, page, pageSize);
};
// 아이템 검색 서비스
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

// 아이템 구매 서비스
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

// 아이템 판매 서비스
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

// 아이템 장착 서비스
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

// 아이템 장착 해제 서비스
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

// 사냥 보상 서비스
export const rewardUserForHunting = async ({ userId }) => {
  return await gainHuntingReward(userId);
};
