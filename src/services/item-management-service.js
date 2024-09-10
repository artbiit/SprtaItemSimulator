import {
  createItem,
  updateItem,
  deleteItem,
} from '../repositories/item-management-repository.js';
// 아이템 등록
export const createNewItem = async ({ itemData }) => {
  // 장비일 경우에만 스탯을 추가
  if (itemData.isEquippable) {
    itemData.stats = {
      create: {
        healthBonus: itemData.stats.healthBonus,
        attackBonus: itemData.stats.attackBonus,
        defenseBonus: itemData.stats.defenseBonus,
        critChanceBonus: itemData.stats.critChanceBonus,
        critMultiplierBonus: itemData.stats.critMultiplierBonus,
        evasionBonus: itemData.stats.evasionBonus,
        accuracyBonus: itemData.stats.accuracyBonus,
      },
    };
  }

  // Prisma를 이용해 아이템을 생성
  const newItem = await createItem(itemData);

  // 결과 반환
  return { ...newItem, message: 'Item created successfully' };
};

// 아이템 수정
export const modifyItem = async (itemId, updateData) => {
  const updatedItem = await updateItem(itemId, updateData);
  return { ...updatedItem, message: 'Item modified successfully' };
};

// 아이템 삭제
export const removeItem = async (itemId) => {
  await deleteItem(itemId);
  return { message: 'Item deleted successfully' };
};
