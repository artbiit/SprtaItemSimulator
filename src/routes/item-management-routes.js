import {
  createNewItem,
  modifyItem,
  removeItem,
} from '../services/item-management-service.js';

const itemManagementRoutes = [
  {
    method: 'post',
    url: '/items',
    action: createNewItem,
    authRequired: true, // 관리자만 접근 가능
    roleRequired: 'ADMIN',
  },
  {
    method: 'put',
    url: '/items/',
    action: modifyItem,
    authRequired: true, // 관리자만 접근 가능
    roleRequired: 'ADMIN',
  },
  {
    method: 'delete',
    url: '/items/',
    action: removeItem,
    authRequired: true, // 관리자만 접근 가능
    roleRequired: 'ADMIN',
  },
];

export default itemManagementRoutes;
