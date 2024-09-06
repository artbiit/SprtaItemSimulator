import { prisma } from '../prisma-client.js';

// 유저 생성
export const createUser = async ({ username, password, nickname }) => {
  return await prisma.user.create({
    data: {
      username,
      password,
      nickname,
      role: 'USER',
    },
  });
};

// 유저 조회 by Username
export const findUserByUsername = async (username) => {
  return await prisma.user.findUnique({
    where: { username },
  });
};

// 유저 삭제
export const deleteUser = async (userId) => {
  return await prisma.user.delete({
    where: { id: userId },
  });
};

// 비밀번호 업데이트
export const updateUserPassword = async (userId, newPassword) => {
  return await prisma.user.update({
    where: { id: userId },
    data: { password: newPassword },
  });
};
