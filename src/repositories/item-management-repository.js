import { prisma } from '../lib/prisma.js';

/**
 * 새 아이템을 생성하는 함수
 * @param {Object} itemData - 생성할 아이템의 데이터
 * @returns {Promise<Object>} - 생성된 아이템 객체
 */
export const createItem = async (itemData) => {
  return prisma.item.create({
    data: itemData,
    include: {
      stats: true,
    },
  });
};

/**
 * 아이템을 수정하는 함수
 * @param {number} itemId - 수정할 아이템의 ID
 * @param {Object} updateData - 수정할 데이터 객체
 * @returns {Promise<Object>} - 수정된 아이템 객체
 */
export const updateItem = async (itemId, updateData) => {
  return prisma.item.update({
    where: { id: itemId },
    data: updateData,
  });
};

/**
 * 아이템의 스탯을 삽입 또는 업데이트하는 함수
 * @param {number} itemId - 아이템 ID
 * @param {Object} stats - 스탯 데이터 객체
 * @returns {Promise<Object>} - 수정 또는 생성된 스탯 객체
 */
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

/**
 * 아이템을 삭제하는 함수
 * @param {number} itemId - 삭제할 아이템의 ID
 * @returns {Promise<Object>} - 삭제된 아이템 객체
 */
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
