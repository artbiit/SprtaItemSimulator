import {
  getCharacterItems,
  searchItems,
  buyItem,
  sellItem,
  equipItem,
  gainHuntingReward,
  getSelectedCharacterId,
  countCharacterItems,
} from '../repositories/item-interaction-repository.js';
import ApiError from '../errors/api-error.js';

// 캐릭터의 아이템 목록 서비스 (인벤토리 및 장착 아이템 포함) 및 총 아이템 수 반환
export const listCharacterItems = async ({ userId = null, page, pageSize }) => {
  const characterId = await getSelectedCharacterId(userId);

  if (!characterId) {
    throw new ApiError('No character selected', 400);
  }

  // 총 아이템 수 계산
  const totalItemsCount = await countCharacterItems(characterId);

  return {
    totalItems: totalItemsCount, // 캐릭터가 보유한 총 아이템 수
    items: (await getCharacterItems(characterId, page, pageSize)) || [], // 현재 페이지의 아이템 목록
  };
};
// 아이템 검색 서비스
export const findItems = async ({ searchTerm, page, pageSize }) => {
  return await searchItems(searchTerm, page, pageSize);
};

// 아이템 구매 서비스
export const purchaseItem = async ({ userId, itemId, userRole, price }) => {
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
