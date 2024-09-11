import { prisma } from '../lib/prisma.js';

/**
 * 새 유저를 생성하는 함수
 * @param {Object} param - 유저 정보 객체
 * @param {string} param.username - 유저 이름
 * @param {string} param.password - 유저 비밀번호
 * @param {string} param.nickname - 유저 닉네임
 * @returns {Promise<Object>} - 생성된 유저 객체
 */
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

/**
 * 유저를 ID로 조회하는 함수
 * @param {number} userId - 조회할 유저 ID
 * @returns {Promise<Object|null>} - 조회된 유저 객체 (없을 경우 null 반환)
 */
export const findUserById = async (userId) => {
  return await prisma.user.findUnique({ where: { id: userId } });
};

/**
 * 유저를 이름으로 조회하는 함수
 * @param {string} username - 유저 이름
 * @returns {Promise<Object|null>} - 조회된 유저 객체 (없을 경우 null 반환)
 */
export const findUserByUsername = async (username) => {
  return await prisma.user.findUnique({
    where: { username },
  });
};

/**
 * 유저를 삭제하는 함수
 * @param {number} userId - 삭제할 유저 ID
 * @returns {Promise<Object>} - 삭제된 유저 객체
 */
export const deleteUser = async (userId) => {
  return await prisma.user.delete({
    where: { id: userId },
  });
};

/**
 * 유저 비밀번호를 업데이트하는 함수
 * @param {number} userId - 유저 ID
 * @param {string} newPassword - 새 비밀번호
 * @returns {Promise<Object>} - 업데이트된 유저 객체
 */
export const updateUserPassword = async (userId, newPassword) => {
  return await prisma.user.update({
    where: { id: userId },
    data: { password: newPassword },
  });
};

/**
 * 유저의 선택된 캐릭터를 삭제하는 함수
 * @param {number} userId - 유저 ID
 * @returns {Promise<Object>} - 업데이트된 유저 객체
 */
export const deleteSelectedCharacterForUser = async (userId) => {
  return prisma.user.update({
    where: { id: userId },
    data: { selectedCharacterId: null },
  });
};

/**
 * 유저의 권한을 업데이트하는 함수
 * @param {number} userId - 유저 ID
 * @param {string} newRole - 새로운 권한
 * @returns {Promise<Object>} - 업데이트된 유저 객체
 */
export const updateUserRole = async (userId, newRole) => {
  return prisma.user.update({
    where: { id: userId },
    data: { role: newRole },
  });
};

/**
 * 유저가 선택한 캐릭터 ID를 조회하는 함수
 * @param {number} userId - 유저 ID
 * @returns {Promise<number|null>} - 선택된 캐릭터 ID (없을 경우 null 반환)
 */
export const getSelectedCharacterId = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { selectedCharacterId: true },
  });
  return user?.selectedCharacterId;
};
