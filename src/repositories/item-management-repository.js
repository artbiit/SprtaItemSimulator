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
