import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ApiError from '../errors/api-error.js';
import env from '../lib/env.js';

import {
  findUserByUsername,
  createUser,
  deleteUser,
  updateUserPassword,
  deleteSelectedCharacterForUser,
  findUserById,
} from '../repositories/user-repository.js';
import logger from '../lib/logger.js'; // 로깅 시스템 추가

const {
  JWT_SECRET,
  JWT_EXPIRES_IN,
  JWT_ALGORITHM,
  JWT_ISSUER,
  JWT_AUDIENCE,
  SECURITY_PEPPER,
} = env;
const getPepperedPassword = (password) => {
  return `${password}${SECURITY_PEPPER}`;
};
// 회원가입 서비스
export const registerUser = async ({ username, password, nickname }) => {
  const pepperedPassword = getPepperedPassword(password);
  const hashedPassword = await bcrypt.hash(pepperedPassword, 10);

  try {
    const user = await createUser({
      username,
      password: hashedPassword,
      nickname,
    });
    logger.info(`User registered: ${username}`);
    return { userId: user.id, nickname: user.nickname };
  } catch (error) {
    logger.error(`Error registering user: ${username}, ${error.message}`);
    throw new ApiError('Error registering user', 500);
  }
};

// 로그인 서비스
export const loginUser = async ({ username, password }) => {
  const user = await findUserByUsername(username);
  if (!user) {
    throw new ApiError('Invalid username or password', 401);
  }

  const pepperedPassword = getPepperedPassword(password);
  const validPassword = await bcrypt.compare(pepperedPassword, user.password);
  if (!validPassword) {
    throw new ApiError('Invalid username or password', 401);
  }

  await deleteSelectedCharacterForUser(user.id);

  const token = jwt.sign(
    { userId: user.id, username: user.username },
    JWT_SECRET,
    {
      expiresIn: JWT_EXPIRES_IN,
      algorithm: JWT_ALGORITHM,
      issuer: JWT_ISSUER,
      audience: JWT_AUDIENCE,
    }
  );

  return { token };
};

//로그아웃 서비스
export const logoutUser = async ({ userId }) => {
  await deleteSelectedCharacterForUser(userId);
  // 즉시 만료되는 토큰 발급 (expiresIn: '1ms')
  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: '1ms',
  });

  return { message: 'Logged out successfully', token };
};

// 비밀번호 변경 서비스
export const changePassword = async ({ userId, oldPassword, newPassword }) => {
  const user = await findUserById(userId);
  const validPassword = await bcrypt.compare(
    getPepperedPassword(oldPassword),
    user.password
  );

  if (!validPassword) {
    logger.warn(
      `Password change failed: incorrect old password for user ${userId}`
    );
    throw new ApiError('Old password is incorrect', 401);
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await updateUserPassword(userId, hashedPassword);
  logger.info(`Password changed for user: ${userId}`);
  return { message: 'Password updated successfully' };
};

// 회원 삭제 서비스
export const deleteUserById = async ({ userId }) => {
  await deleteUser(userId);
  logger.info(`User deleted: ${userId}`);
  return { message: 'User deleted successfully' };
};
