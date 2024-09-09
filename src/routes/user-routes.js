import {
  registerUser,
  loginUser,
  changePassword,
  deleteUserById,
  logoutUser,
  refreshToken,
  changeUserRole,
} from '../services/user-service.js';

const authRoutes = [
  {
    method: 'post',
    url: '/users', // 회원가입
    action: registerUser,
  },
  {
    method: 'post',
    url: '/users/login', // 로그인
    action: loginUser,
  },
  {
    method: 'patch',
    url: '/users/password', // 비밀번호 변경
    action: changePassword,
    authRequired: true, // 인증 필요
    ownershipRequired: true,
  },
  {
    method: 'delete',
    url: '/users', // 회원 삭제
    action: deleteUserById,
    authRequired: true, // 인증 필요
    ownershipRequired: true,
  },
  {
    method: 'post',
    url: '/users/logout', // 회원 삭제
    action: logoutUser,
    authRequired: true, // 인증 필요
    ownershipRequired: true,
  },
  {
    method: 'post',
    url: '/users/refresh-token', //토큰 재발급
    action: refreshToken,
  },
  {
    method: 'patch',
    url: '/users/role', //사용자 등급 변경
    action: changeUserRole,
    authRequired: true, // 인증 필요
  },
];

export default authRoutes;
