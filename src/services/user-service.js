import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.js';
import {
  findUserByUsername,
  createUser,
  deleteUser,
  updateUserPassword,
} from '../repositories/user-repository.js';
import ApiError from '../errors/api-error.js';

// 회원가입 서비스
export const registerUser = async ({ username, password, nickname }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await createUser({
    username,
    password: hashedPassword,
    nickname,
  });
  return { userId: user.id, nickname: user.nickname };
};

// 로그인 서비스
export const loginUser = async ({ username, password }) => {
  const user = await findUserByUsername(username);
  if (!user) throw new Error('Invalid username or password');

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) throw new Error('Invalid username or password');

  const token = jwt.sign(
    { userId: user.id, username: user.username },
    JWT_SECRET,
    { expiresIn: '1h' }
  );
  return { token };
};

// 회원탈퇴 서비스
export const deleteUserById = async (userId) => {
  await deleteUser(userId);
  return { message: 'User deleted successfully' };
};

// 비밀번호 변경 서비스
export const changePassword = async (userId, oldPassword, newPassword) => {
  const user = await findUserByUsername(userId);
  const validPassword = await bcrypt.compare(oldPassword, user.password);
  if (!validPassword) throw new Error('Old password is incorrect');

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await updateUserPassword(userId, hashedPassword);
  return { message: 'Password updated successfully' };
};
