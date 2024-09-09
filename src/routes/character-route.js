import {
  createCharacter,
  deleteCharacter,
  renameCharacter,
  selectCharacter,
  getCharacterInfo,
} from '../services/character-service.js';

const characterRoutes = [
  {
    method: 'post',
    url: '/characters',
    action: createCharacter,
    authRequired: true, // 인증된 유저만 접근 가능
  },
  {
    method: 'delete',
    url: '/characters/',
    action: deleteCharacter,
    authRequired: true, // 인증된 유저만 접근 가능
  },
  {
    method: 'patch',
    url: '/characters/name',
    action: renameCharacter,
    authRequired: true, // 인증된 유저만 접근 가능
  },
  {
    method: 'post',
    url: '/characters/select/',
    action: selectCharacter,
    authRequired: true, // 인증된 유저만 접근 가능
  },
  {
    method: 'get',
    url: '/characters/:characterName',
    action: getCharacterInfo,
  },
];

export default characterRoutes;
