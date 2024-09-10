import { prisma } from '../lib/prisma.js';

// 아이템 목록 조회 (페이지네이션 포함)
export const getCharacterItems = async (
  characterId,
  page = 1,
  pageSize = 10
) => {
  return prisma.item.findMany({
    where: {
      OR: [
        { inventoryOfCharacterId: characterId }, // 인벤토리에 있는 아이템
        { equippedByCharacterId: characterId }, // 장착된 아이템
      ],
    },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });
};

// 캐릭터의 인벤토리 및 장착된 아이템 수 카운트
export const countCharacterItems = async (characterId) => {
  return prisma.item.count({
    where: {
      OR: [
        { inventoryOfCharacterId: characterId }, // 인벤토리 아이템
        { equippedByCharacterId: characterId }, // 장착된 아이템
      ],
    },
  });
};

// 선택된 캐릭터 정보 조회
export const getSelectedCharacterId = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { selectedCharacterId: true },
  });
  return user?.selectedCharacterId;
};

// 아이템 검색 (이름 또는 스탯으로)
export const searchItems = async (searchTerm, page = 1, pageSize = 10) => {
  return prisma.item.findMany({
    where: {
      OR: [
        { name: { contains: searchTerm } },
        { stats: { some: { attackBonus: { gte: 10 } } } }, // 예시 조건
      ],
    },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });
};

// 아이템 구매 (사용자 또는 관리자)
export const buyItem = async ({ userId, itemId, price }) => {
  return prisma.transaction.create({
    data: {
      userId,
      itemId,
      amount: price,
    },
  });
};

// 아이템 판매
export const sellItem = async ({ userId, itemId, salePrice }) => {
  return prisma.transaction.create({
    data: {
      userId,
      itemId,
      amount: salePrice,
    },
  });
};

// 아이템 장착 (스탯 반영)
export const equipItem = async (userId, characterId, itemId) => {
  return prisma.character.update({
    where: { id: characterId },
    data: {
      equippedItems: {
        connect: { id: itemId },
      },
    },
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
