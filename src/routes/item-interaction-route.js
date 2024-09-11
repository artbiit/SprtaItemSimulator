import {
  listCharacterItems,
  findItems,
  purchaseItem,
  sellUserItem,
  equipUserItem,
  rewardUserForHunting,
  unequipUserItem,
} from '../services/item-interaction-service.js';

const itemRoutes = [
  {
    method: 'get',
    url: '/items',
    action: listCharacterItems, // 캐릭터 아이템 목록 조회
    authRequired: true, // 인증된 사용자만 접근 가능
  },
  {
    method: 'get',
    url: '/items/search',
    action: findItems, // 아이템 검색
  },
  {
    method: 'post',
    url: '/items/buy',
    action: purchaseItem, // 아이템 구매
    authRequired: true,
  },
  {
    method: 'post',
    url: '/items/sell',
    action: sellUserItem, // 아이템 판매
    authRequired: true,
  },
  {
    method: 'post',
    url: '/items/equip',
    action: equipUserItem, // 아이템 장착
    authRequired: true,
  },
  {
    method: 'post',
    url: '/items/reward',
    action: rewardUserForHunting, // 사냥 보상 획득
    authRequired: true,
  },
  {
    method: 'post',
    url: '/items/unequip', // 아이템 장착 해제
    action: unequipUserItem,
    authRequired: true,
  },
];

export default itemRoutes;
