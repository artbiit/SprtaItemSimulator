import { prisma } from '../lib/prisma.js';

// 아이템 목록 조회 (페이지네이션 포함)
export const getCharacterItems = async (
  characterId,
  page = 1,
  pageSize = 10
) => {
  const character = await prisma.character.findUnique({
    where: {
      id: characterId,
    },
    select: { name: true, gold: true },
  });

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

// 선택된 캐릭터 정보 조회
export const getSelectedCharacterId = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { selectedCharacterId: true },
  });
  return user?.selectedCharacterId;
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
