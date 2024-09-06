import {
  registerUser,
  loginUser,
  deleteUserById,
  changePassword,
} from '../services/user-service.js';

const userRoutes = [
  {
    method: 'post',
    url: '/register',
    action: registerUser,
    authRequired: false, // 인증 필요 없음
  },
  {
    method: 'post',
    url: '/login',
    action: loginUser,
    authRequired: false, // 인증 필요 없음
  },
  {
    method: 'delete',
    url: '/user/delete',
    action: deleteUserById,
    authRequired: true, // 인증 필요
  },
  {
    method: 'patch',
    url: '/user/change-password',
    action: changePassword,
    authRequired: true, // 인증 필요
  },
];

export default userRoutes;
