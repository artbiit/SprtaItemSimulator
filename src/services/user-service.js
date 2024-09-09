import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ApiError from '../errors/api-error.js';
import env from '../lib/env.js';
import Utils from '../lib/utils.js';

import {
  findUserByUsername,
  createUser,
  deleteUser,
  updateUserPassword,
  deleteSelectedCharacterForUser,
  findUserById,
  updateUserRole,
} from '../repositories/user-repository.js';
import logger from '../lib/logger.js'; // 로깅 시스템 추가

const {
  JWT_SECRET,
  JWT_EXPIRES_IN,
  JWT_ALGORITHM,
  JWT_ISSUER,
  JWT_AUDIENCE,
  JWT_REFRESH_EXPIRES_IN,
  JWT_REFRESH_SECRET,
  SERVER_ADMIN_ID,
} = env;

// 회원가입 서비스
export const registerUser = async ({ username, password, nickname }) => {
  if (!Utils.testUsername(username)) {
    throw new ApiError(
      'The username must contain at least 5 characters, using only letters and numbers',
      400
    );
  }

  if (!Utils.testPassword(password)) {
    throw new ApiError(
      'The password must be at least 6 characters long and include letters, numbers, and special characters.',
      400
    );
  }

  if (!Utils.testNickname(nickname)) {
    throw new ApiError(
      'The nickname can contain up to 16 Korean characters, or a mix of letters and numbers up to 32 characters, with no special characters allowed.',
      400
    );
  }

  const pepperedPassword = Utils.getPepperedPassword(password);
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

  if (user.role === 'SUSPEND') {
    throw new ApiError(
      'Your account has been suspended. Please contact support for further assistance.',
      403
    );
  }

  const pepperedPassword = Utils.getPepperedPassword(password);
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

  // Refresh Token 발급
  const refreshToken = jwt.sign(
    { userId: user.id, username: user.username },
    JWT_REFRESH_SECRET,
    {
      expiresIn: JWT_REFRESH_EXPIRES_IN,
      algorithm: JWT_ALGORITHM,
      issuer: JWT_ISSUER,
      audience: JWT_AUDIENCE,
    }
  );

  return { token, refreshToken };
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
    Utils.getPepperedPassword(oldPassword),
    user.password
  );

  if (!validPassword) {
    logger.warn(
      `Password change failed: incorrect old password for user ${userId}`
    );
    throw new ApiError('Old password is incorrect', 401);
  }

  const hashedPassword = await bcrypt.hash(
    Utils.getPepperedPassword(newPassword),
    10
  );
  await updateUserPassword(userId, hashedPassword);
  logger.info(`Password changed for user: ${userId}`);
  return { message: 'Password updated successfully' };
};

// 회원 삭제 서비스
export const deleteUserById = async ({ userId }) => {
  // 1. 유저 정보 가져오기
  const user = await findUserById(userId);

  // 2. 유저의 권한(role)이 'ADMIN'인지 확인
  if (user.role === 'ADMIN') {
    logger.warn(`Attempt to delete admin account: ${userId}`);
    throw new ApiError('Admin accounts cannot be deleted', 403); // 403 Forbidden
  }

  // 3. 권한이 관리자(Admin)가 아니면 삭제
  await deleteUser(userId);
  logger.info(`User deleted: ${userId}`);
  return { message: 'User deleted successfully' };
};

// 토큰 재발급 API
export const refreshToken = async ({ refreshToken }) => {
  // 리프레시 토큰 검증
  const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);

  // 유저가 DB에 존재하는지 확인
  const user = await findUserById(decoded.userId);
  if (!user) {
    throw new ApiError('User not found', 404);
  }
  try {
    // 새로운 액세스 토큰 발급
    const newAccessToken = jwt.sign(
      { userId: user.id, username: user.username },
      JWT_SECRET,
      {
        expiresIn: JWT_EXPIRES_IN,
        algorithm: JWT_ALGORITHM,
        issuer: JWT_ISSUER,
        audience: JWT_AUDIENCE,
      }
    );

    return { token: newAccessToken };
  } catch (error) {
    throw new ApiError('Invalid or expired refresh token', 403); // 리프레시 토큰이 유효하지 않은 경우
  }
};

/** 사용자 권한 변경 */
export const changeUserRole = async ({ userId, targetUserName, newRole }) => {
  const requestingUser = await findUserById(userId);
  if (!requestingUser || requestingUser.role !== 'ADMIN') {
    throw new ApiError('Only admins can change user roles', 403); // 관리자 권한이 없는 경우
  }

  // 변경하려는 대상이 env에 있는 관리자 계정이면 변경 불가
  const targetUser = await findUserByUsername(targetUserName);
  if (!targetUser) {
    throw new ApiError('User not found', 404); // 유저가 없는 경우
  }

  // 대상 계정이 ENV에 정의된 관리자 계정과 동일한지 확인
  if (targetUser.username === SERVER_ADMIN_ID) {
    throw new ApiError('Cannot change the role of this protected account', 403); // 보호된 계정은 변경 불가
  }

  try {
    // 사용자 권한 변경
    await updateUserRole(targetUser.id, newRole);
    return { message: 'User role updated successfully' };
  } catch (error) {
    logger.error(`ChangeUserRole Error : ${error}`);
    throw new ApiError(
      "An error occurred while attempting to change the user's role.",
      500
    );
  }
};
