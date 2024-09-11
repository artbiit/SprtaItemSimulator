import {
  getCharacterItems,
  searchItems,
  buyItem,
  sellItem,
  equipItem,
  gainHuntingReward,
  getSelectedCharacterId,
} from '../repositories/item-interaction-repository.js';
import ApiError from '../errors/api-error.js';

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
export const purchaseItem = async ({ userId = null, role = null, itemId }) => {
  const finalPrice = userRole === 'ADMIN' ? 0 : price;
  return await buyItem({ userId, itemId, price: finalPrice });
};

// 아이템 판매 서비스
export const sellUserItem = async ({
  userId,
  itemId,
  userRole,
  originalPrice,
}) => {
  const salePrice = userRole === 'ADMIN' ? 0 : originalPrice * 0.6; // 판매가는 원가의 60%
  return await sellItem({ userId, itemId, salePrice });
};

// 아이템 장착 서비스
export const equipUserItem = async ({ userId, characterId, itemId }) => {
  return await equipItem(userId, characterId, itemId);
};

// 사냥 보상 서비스
export const rewardUserForHunting = async ({ userId }) => {
  return await gainHuntingReward(userId);
};
