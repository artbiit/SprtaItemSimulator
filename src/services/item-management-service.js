import {
  createItem,
  updateItem,
  deleteItem,
  upsertItemStats,
} from '../repositories/item-management-repository.js';
import { prisma } from '../lib/prisma.js';

/**
 * 신규 아이템 생성 서비스
 * @param {Object} param - 아이템 정보
 * @param {Object} param.itemData - 아이템 정보 객체
 * @returns {Object} - 생성된 아이템 정보
 * @returns {number} statusCode - 201: 성공
 */
export const createNewItem = async ({ itemData }) => {
  return await prisma.$transaction(async (prisma) => {
    let newItem;

    // 장비일 경우에만 스탯을 추가
    if (itemData.isEquippable) {
      const { stats, ...itemDataWithoutStats } = itemData;

      // 아이템 생성
      newItem = await prisma.item.create({
        data: {
          ...itemDataWithoutStats,
          stats: {
            create: {
              healthBonus: stats.healthBonus,
              attackBonus: stats.attackBonus,
              defenseBonus: stats.defenseBonus,
              critChanceBonus: stats.critChanceBonus,
              critMultiplierBonus: stats.critMultiplierBonus,
              evasionBonus: stats.evasionBonus,
              accuracyBonus: stats.accuracyBonus,
            },
          },
        },
      });
    } else {
      // 장비가 아닌 경우, 아이템만 생성
      newItem = await prisma.item.create({
        data: itemData,
      });
    }

    // 결과 반환
    return { ...newItem, message: 'Item created successfully' };
  });
};

/**
 * 아이템 수정 서비스
 * @param {Object} param - 아이템 수정 정보
 * @param {number} param.itemId - 수정할 아이템 ID
 * @param {Object} param.updateData - 수정할 데이터
 * @returns {Object} - 수정된 아이템 정보
 * @returns {number} statusCode - 200: 성공
 */
export const modifyItem = async ({ itemId, updateData }) => {
  return await prisma.$transaction(async (prisma) => {
    // 스탯 정보 분리
    const { stats, ...itemUpdateData } = updateData;

    // 아이템 업데이트
    const updatedItem = await prisma.item.update({
      where: { id: itemId },
      data: itemUpdateData,
    });

    // 장비 아이템의 경우 스탯 업데이트
    if (stats && updateData.isEquippable) {
      await prisma.itemStat.upsert({
        where: { itemId }, // 아이템 ID를 기준으로 기존 스탯이 있는지 확인
        update: stats, // 스탯이 존재하면 업데이트
        create: {
          // 스탯이 없으면 생성
          itemId,
          ...stats,
        },
      });
    }

    return { ...updatedItem, message: 'Item modified successfully' };
  });
};

/**
 * 아이템 삭제 서비스
 * @param {Object} param - 아이템 삭제 정보
 * @param {number} param.itemId - 삭제할 아이템 ID
 * @returns {Object} - 삭제 결과 메시지
 * @returns {number} statusCode - 200: 성공, 404: 아이템을 찾을 수 없음
 */
export const removeItem = async ({ itemId }) => {
  return await prisma.$transaction(async (prisma) => {
    await deleteItem(itemId);
    return { message: 'Item deleted successfully' };
  });
};
