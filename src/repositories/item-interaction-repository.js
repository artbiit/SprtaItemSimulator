import ApiError from '../errors/api-error.js';
import { prisma } from '../lib/prisma.js';
import { findCharacterNameAndGoldById } from './character-repository.js';

// 아이템 목록 조회 (페이지네이션 포함)
export const getCharacterItems = async (
  characterId,
  page = 1,
  pageSize = 10
) => {
  const character = await findCharacterNameAndGoldById(characterId);

  //아이템 목록(페이징)
  const where = {
    OR: [
      { inventoryOfCharacterId: characterId }, // 인벤토리에 있는 아이템
      { equippedByCharacterId: characterId }, // 장착된 아이템
    ],
  };
  const items = await prisma.item.findMany({
    where,
    skip: (page - 1) * pageSize,
    take: pageSize,
    include: {
      stats: true, // 아이템에 연결된 스탯 정보도 포함
    },
  });
  //조건에 맞는 총 아이템 갯수
  const totalItems = await prisma.item.count({
    where,
  });

  return { ...character, totalItems, items };
};

// 아이템 검색 (이름, 스탯, 가격)
export const searchItems = async (filters, page = 1, pageSize = 10) => {
  // 기존 필터와 보유 캐릭터가 없는 조건을 결합
  const combinedFilters = {
    AND: [
      filters, // 기존의 검색 필터
      {
        inventoryOfCharacterId: null, // 인벤토리에 보유된 캐릭터가 없는 아이템
        equippedByCharacterId: null, // 장착된 캐릭터가 없는 아이템
      },
    ],
  };

  const items = await prisma.item.findMany({
    where: combinedFilters,
    include: {
      stats: true,
    },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const totalItems = await prisma.item.count({
    where: combinedFilters,
  });

  return [items, totalItems];
};

export const getItemById = async (itemId) => {
  return prisma.item.findUnique({
    where: { id: itemId },
    include: { stats: true },
  });
};

/** 주어진 아이템 이름과 같은 캐릭터가 보유중인 아이템 목록을 반환합니다. */
export const getInventoryByItemName = async (characterId, ItemName) => {
  return prisma.item.findMany({
    where: {
      name: ItemName,
      inventoryOfCharacterId: characterId,
    },
    include: { stats: true }, // 스탯 정보를 포함해서 가져옴
  });
};

export const updateInventoryItem = async (inventoryItemId, newQuantity) => {
  return prisma.item.update({
    where: { id: inventoryItemId },
    data: { quantity: newQuantity },
  });
};

export const createInventoryItem = async (characterId, itemId, quantity) => {
  // 원본 아이템 정보 가져오기
  const originalItem = await prisma.item.findUnique({
    where: { id: itemId },
    include: { stats: true },
  });
  if (!originalItem) {
    throw new ApiError('Original item not found', 404);
  }

  // 새 아이템을 생성하고 인벤토리에 추가
  return prisma.item.create({
    data: {
      name: originalItem.name,
      value: originalItem.value,
      isEquippable: originalItem.isEquippable,
      maxStack: originalItem.maxStack,
      rarity: originalItem.rarity,
      inventoryOfCharacterId: characterId, // 캐릭터 인벤토리에 넣기
      quantity: quantity,
      stats: originalItem.isEquippable
        ? {
            create: {
              healthBonus: originalItem.stats?.healthBonus || 0,
              attackBonus: originalItem.stats?.attackBonus || 0,
              defenseBonus: originalItem.stats?.defenseBonus || 0,
              critChanceBonus: originalItem.stats?.critChanceBonus || 0,
              critMultiplierBonus: originalItem.stats?.critMultiplierBonus || 0,
              evasionBonus: originalItem.stats?.evasionBonus || 0,
              accuracyBonus: originalItem.stats?.accuracyBonus || 0,
            },
          }
        : undefined,
    },
  });
};

export const createInventoryItemWithItemData = async (
  characterId,
  itemData,
  quantity
) => {
  if (!itemData) {
    throw new ApiError('Invalid item data', 400);
  }

  // 인벤토리에 새 아이템 추가
  return prisma.item.create({
    data: {
      name: itemData.name,
      value: itemData.value,
      isEquippable: itemData.isEquippable,
      maxStack: itemData.maxStack,
      rarity: itemData.rarity,
      inventoryOfCharacterId: characterId, // 인벤토리에 추가
      quantity: quantity,
      stats:
        itemData.isEquippable && Array.isArray(itemData.stats)
          ? {
              create: itemData.stats.map((stat) => ({
                healthBonus: stat.healthBonus ?? 0,
                attackBonus: stat.attackBonus ?? 0,
                defenseBonus: stat.defenseBonus ?? 0,
                critChanceBonus: stat.critChanceBonus ?? 0,
                critMultiplierBonus: stat.critMultiplierBonus ?? 0,
                evasionBonus: stat.evasionBonus ?? 0,
                accuracyBonus: stat.accuracyBonus ?? 0,
              })),
            }
          : undefined,
    },
  });
};

// 아이템 판매
export const sellItem = async ({
  characterId,
  itemName,
  quantity,
  salePriceFactor,
}) => {
  // 트랜잭션 처리
  return prisma.$transaction(async (prisma) => {
    // 아이템 정보 가져오기
    const items = await prisma.item.findMany({
      where: {
        inventoryOfCharacterId: characterId,
        name: itemName,
      },
      orderBy: {
        quantity: 'desc', // 가장 수량이 많은 아이템부터 삭제
      },
    });

    const haveQuantity = items.reduce((acc, item) => acc + item.quantity, 0);

    if (haveQuantity < quantity) {
      throw new ApiError("You don't have enough.", 400);
    }
    let remainingQuantity = quantity;
    let totalPrice = 0;

    // 아이템 판매 처리
    for (const item of items) {
      const sellQuantity = Math.min(item.quantity, remainingQuantity);
      totalPrice += item.value * sellQuantity * salePriceFactor;
      remainingQuantity -= sellQuantity;

      // 아이템 수량 업데이트 또는 삭제
      if (item.quantity > sellQuantity) {
        await prisma.item.update({
          where: { id: item.id },
          data: { quantity: item.quantity - sellQuantity },
        });
      } else {
        await prisma.item.delete({
          where: { id: item.id },
        });
      }

      // 남은 수량이 0이 되면 판매 종료
      if (remainingQuantity <= 0) break;
    }

    totalPrice = Math.round(totalPrice);
    // 캐릭터의 골드 업데이트
    await prisma.character.update({
      where: { id: characterId },
      data: { gold: { increment: totalPrice } },
    });

    const character = await findCharacterNameAndGoldById(characterId);
    const soldItems = quantity - remainingQuantity;
    // 최종 결과 반환
    return {
      ...character,
      soldItems,
      totalPrice,
      remaining: haveQuantity - soldItems,
    };
  });
};

export const getInventoryItem = async (characterId, itemId) => {
  return await prisma.item.findFirst({
    where: {
      id: itemId,
      inventoryOfCharacterId: characterId, // 인벤토리에 있는지 확인
    },
  });
};
// 아이템 장착 (스탯 반영)
export const equipItem = async (characterId, itemId) => {
  // 1. 인벤토리 내 아이템 조회
  const itemInInventory = await getInventoryItem(characterId, itemId);
  if (!itemInInventory || itemInInventory.length === 0) {
    throw new ApiError('Item not found in inventory', 404); // 아이템이 없으면 에러
  }

  return prisma.$transaction(async (prisma) => {
    // 2. 아이템 장착 처리 (인벤토리 -> 장착중)
    const updatedItem = await prisma.item.update({
      where: { id: itemId },
      data: {
        inventoryOfCharacterId: null, // 인벤토리에서 제거
        equippedByCharacterId: characterId, // 장착 상태로 변경
      },
    });

    // 3. 캐릭터의 스탯에 장착된 아이템의 스탯을 적용
    const equippedItems = await prisma.item.findMany({
      where: { equippedByCharacterId: characterId },
      include: { stats: true },
    });

    // 스탯이 배열일 경우 하나씩 추가하도록 처리
    const totalStats = equippedItems.reduce(
      (total, item) => {
        if (Array.isArray(item.stats)) {
          item.stats.forEach((stat) => {
            total.health += stat.healthBonus || 0;
            total.attackPower += stat.attackBonus || 0;
            total.defense += stat.defenseBonus || 0;
            total.critChance += stat.critChanceBonus || 0;
            total.critMultiplier += stat.critMultiplierBonus || 0;
            total.evasion += stat.evasionBonus || 0;
            total.accuracy += stat.accuracyBonus || 0;
          });
        }
        return total;
      },
      {
        health: 0,
        attackPower: 0,
        defense: 0,
        critChance: 0,
        critMultiplier: 0,
        evasion: 0,
        accuracy: 0,
      }
    );

    // 캐릭터의 스탯을 업데이트
    await prisma.character.update({
      where: { id: characterId },
      data: {
        health: totalStats.health,
        attackPower: totalStats.attackPower,
        defense: totalStats.defense,
        critChance: totalStats.critChance,
        critMultiplier: totalStats.critMultiplier,
        evasion: totalStats.evasion,
        accuracy: totalStats.accuracy,
      },
    });
  });
};

export const getEquippedItemsAndStats = async (characterId) => {
  const equippedItems = await prisma.item.findMany({
    where: { equippedByCharacterId: characterId },
    include: { stats: true }, // 아이템 스탯 포함
  });

  // 장착된 아이템들의 스탯을 합산
  const aggregatedStats = equippedItems.reduce(
    (totalStats, item) => {
      if (item.stats) {
        totalStats.healthBonus += item.stats.healthBonus || 0;
        totalStats.attackBonus += item.stats.attackBonus || 0;
        totalStats.defenseBonus += item.stats.defenseBonus || 0;
        totalStats.critChanceBonus += item.stats.critChanceBonus || 0;
        totalStats.critMultiplierBonus += item.stats.critMultiplierBonus || 0;
        totalStats.evasionBonus += item.stats.evasionBonus || 0;
        totalStats.accuracyBonus += item.stats.accuracyBonus || 0;
      }
      return totalStats;
    },
    {
      healthBonus: 0,
      attackBonus: 0,
      defenseBonus: 0,
      critChanceBonus: 0,
      critMultiplierBonus: 0,
      evasionBonus: 0,
      accuracyBonus: 0,
    }
  );

  return { equippedItems, aggregatedStats };
};

export const unequipItem = async (characterId, itemId) => {
  // 장착된 아이템 조회
  const equippedItem = await prisma.item.findFirst({
    where: {
      id: itemId,
      equippedByCharacterId: characterId,
    },
    include: { stats: true },
  });

  if (!equippedItem) {
    throw new ApiError('Item not found in equipped items', 404); // 장착된 아이템이 없을 경우 에러
  }

  return prisma.$transaction(async (prisma) => {
    // 1. 아이템을 인벤토리로 이동 (장착 해제)
    const updatedItem = await prisma.item.update({
      where: { id: itemId },
      data: {
        equippedByCharacterId: null, // 장착 해제
        inventoryOfCharacterId: characterId, // 다시 인벤토리에 넣음
      },
    });

    // 2. 장착 해제된 아이템의 스탯을 캐릭터에서 제거
    const equippedItems = await prisma.item.findMany({
      where: { equippedByCharacterId: characterId },
      include: { stats: true },
    });

    const totalStats = equippedItems.reduce(
      (total, item) => {
        if (Array.isArray(item.stats)) {
          item.stats.forEach((stat) => {
            total.health -= stat.healthBonus || 0;
            total.attackPower -= stat.attackBonus || 0;
            total.defense -= stat.defenseBonus || 0;
            total.critChance -= stat.critChanceBonus || 0;
            total.critMultiplier -= stat.critMultiplierBonus || 0;
            total.evasion -= stat.evasionBonus || 0;
            total.accuracy -= stat.accuracyBonus || 0;
          });
        }
        return total;
      },
      {
        health: 0,
        attackPower: 0,
        defense: 0,
        critChance: 0,
        critMultiplier: 0,
        evasion: 0,
        accuracy: 0,
      }
    );

    // 3. 캐릭터의 스탯 업데이트
    await prisma.character.update({
      where: { id: characterId },
      data: {
        health: totalStats.health,
        attackPower: totalStats.attackPower,
        defense: totalStats.defense,
        critChance: totalStats.critChance,
        critMultiplier: totalStats.critMultiplier,
        evasion: totalStats.evasion,
        accuracy: totalStats.accuracy,
      },
    });

    return updatedItem; // 업데이트된 아이템 정보 반환
  });
};

// 사냥 보상 (100원 지급)
export const gainHuntingReward = async (userId) => {
  return prisma.user.update({
    where: { id: userId },
    data: {
      balance: {
        increment: 100,
      },
    },
  });
};
