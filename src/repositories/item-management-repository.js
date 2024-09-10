import { prisma } from '../lib/prisma.js';

// 신규 아이템 등록
export const createItem = async (itemData) => {
  return prisma.item.create({
    data: itemData,
    include: {
      stats: true,
    },
  });
};

// 아이템 수정
export const updateItem = async (itemId, updateData) => {
  return prisma.item.update({
    where: { id: itemId },
    data: updateData,
  });
};

// 아이템 스탯 업데이트 함수
export const upsertItemStats = async (itemId, stats) => {
  // 스탯을 itemId와 id를 기준으로 검색
  const existingStat = await prisma.itemStat.findFirst({
    where: {
      itemId,
      id: stats.id || undefined, // 스탯의 id가 있으면 해당 id로 찾음
    },
  });

  if (existingStat) {
    // 기존 스탯이 있을 경우 업데이트
    return prisma.itemStat.update({
      where: { id: existingStat.id },
      data: stats,
    });
  } else {
    // 기존 스탯이 없을 경우 새로 생성
    return prisma.itemStat.create({
      data: {
        itemId,
        ...stats,
      },
    });
  }
};

// 아이템 삭제
export const deleteItem = async (itemId) => {
  // 먼저 관련된 스탯 삭제 (또는 연관된 테이블에서 삭제)
  await prisma.itemStat.deleteMany({
    where: { itemId },
  });

  // 그 후에 아이템 삭제
  const deletedItem = await prisma.item.delete({
    where: { id: itemId },
  });

  return deletedItem;
};
