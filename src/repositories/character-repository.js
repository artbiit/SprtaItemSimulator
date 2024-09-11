import { prisma } from '../lib/prisma.js';

/**
 * 캐릭터 이름과 골드를 조회하는 함수
 * @param {number} characterId - 캐릭터 ID
 * @returns {Promise<Object|null>} - 캐릭터 이름과 골드 정보 (없을 경우 null 반환)
 */
export const findCharacterNameAndGoldById = (characterId) =>
  prisma.character.findUnique({
    where: {
      id: characterId,
    },
    select: { name: true, gold: true },
  });

/**
 * 캐릭터의 골드를 조회하는 함수
 * @param {number} characterId - 캐릭터 ID
 * @returns {Promise<Object|null>} - 캐릭터 골드 정보 (없을 경우 null 반환)
 */
export const findGoldById = (characterId) => {
  return prisma.character.findUnique({
    where: { id: characterId },
    select: { gold: true },
  });
};

/**
 * 캐릭터의 골드를 업데이트하는 함수
 * @param {number} characterId - 캐릭터 ID
 * @param {number} newGold - 새 골드 값
 * @returns {Promise<Object>} - 업데이트된 캐릭터 객체
 */
export const updateCharacterGold = (characterId, newGold) => {
  if (typeof newGold !== 'number' || isNaN(newGold)) {
    throw new Error('Invalid gold value : ', newGold);
  }

  return prisma.character.update({
    where: { id: characterId },
    data: { gold: newGold },
  });
};

/**
 * 캐릭터의 골드와 골드 획득률을 조회하는 함수
 * @param {number} characterId - 캐릭터 ID
 * @returns {Promise<Object|null>} - 캐릭터 골드 및 골드 획득률 정보 (없을 경우 null 반환)
 */
export const getCharacterGoldAndRates = async (characterId) => {
  return prisma.character.findUnique({
    where: { id: characterId },
    select: {
      gold: true,
      goldGainRate: true,
    },
  });
};

/**
 * 새로운 캐릭터를 생성하는 함수
 * @param {number} userId - 유저 ID
 * @param {string} name - 캐릭터 이름
 * @returns {Promise<Object>} - 생성된 캐릭터 객체
 */
export const createNewCharacter = (userId, name) => {
  return prisma.character.create({
    data: {
      name,
      owner: { connect: { id: userId } },
    },
  });
};

/**
 * 캐릭터를 ID로 조회하는 함수
 * @param {number} characterId - 캐릭터 ID
 * @returns {Promise<Object|null>} - 조회된 캐릭터 객체 (없을 경우 null 반환)
 */
export const findCharacterById = (characterId) => {
  return prisma.character.findUnique({
    where: { id: characterId },
    include: { owner: true, equippedItems: true, inventoryItems: true },
  });
};

/**
 * 캐릭터를 이름으로 조회하는 함수
 * @param {string} characterName - 캐릭터 이름
 * @returns {Promise<Object|null>} - 조회된 캐릭터 객체 (없을 경우 null 반환)
 */
export const findCharacterByName = (characterName) => {
  return prisma.character.findUnique({
    where: { name: characterName },
    include: { owner: true, equippedItems: true, inventoryItems: true },
  });
};

/**
 * 캐릭터를 삭제하는 함수
 * @param {number} characterId - 삭제할 캐릭터의 ID
 * @returns {Promise<Object>} - 삭제된 캐릭터 객체
 */
export const removeCharacter = (characterId) => {
  return prisma.character.delete({
    where: { id: characterId },
  });
};

/**
 * 캐릭터 이름을 변경하는 함수
 * @param {Object} character - 캐릭터 객체
 * @returns {Promise<Object>} - 업데이트된 캐릭터 객체
 */
export const updateCharacterName = (character) => {
  return prisma.character.update({
    where: { id: character.id },
    data: { name: character.name },
  });
};

/**
 * 유저의 선택된 캐릭터를 업데이트하는 함수
 * @param {number} userId - 유저 ID
 * @param {number} characterId - 캐릭터 ID
 * @returns {Promise<Object>} - 업데이트된 유저 객체
 */
export const updateSelectedCharacterForUser = (userId, characterId) => {
  return prisma.user.update({
    where: { id: userId },
    data: { selectedCharacterId: characterId },
  });
};
