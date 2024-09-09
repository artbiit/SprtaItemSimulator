import {
  registerUser,
  loginUser,
  changePassword,
  deleteUserById,
} from '../services/user-service.js';

const authRoutes = [
  {
    method: 'post',
    url: '/users', // 회원가입 (POST /users)
    action: registerUser,
  },
  {
    method: 'post',
    url: '/users/login', // 로그인 (POST /users/login)
    action: loginUser,
  },
  {
    method: 'patch',
    url: '/users/password', // 비밀번호 변경 (PATCH /users/password)
    action: changePassword,
    authRequired: true, // 인증 필요
    ownershipRequired: true,
  },
  {
    method: 'delete',
    url: '/users', // 회원 삭제 (DELETE /users)
    action: deleteUserById,
    authRequired: true, // 인증 필요
    ownershipRequired: true,
  },
];

export default authRoutes;
