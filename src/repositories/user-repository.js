import { prisma } from '../lib/prisma.js';

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

export const findUserById = async (userId) => {
  return await prisma.user.findUnique({ where: { id: userId } });
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

// 유저의 선택된 캐릭터 정보 업데이트
export const deleteSelectedCharacterForUser = async (userId) => {
  return prisma.user.update({
    where: { id: userId },
    data: { selectedCharacterId: null },
  });
};
