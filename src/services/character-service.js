import {
  findCharacterById,
  createNewCharacter,
  removeCharacter,
  updateCharacterName,
  updateSelectedCharacterForUser,
  findCharacterByName,
} from '../repositories/character-repository.js';
import ApiError from '../errors/api-error.js';
import logger from '../lib/logger.js';
import Utils from '../lib/utils.js';

/**
 * 캐릭터 생성 서비스
 * @param {Object} param - 캐릭터 생성 정보
 * @param {number} param.userId - 유저 ID
 * @param {string} param.characterName - 캐릭터 이름
 * @returns {Object} - 생성된 캐릭터 정보
 * @returns {number} statusCode - 201: 성공, 400: 캐릭터 이름 형식 오류
 */
export const createCharacter = async ({ userId, characterName }) => {
  if (!Utils.testNickname(characterName)) {
    throw new ApiError(
      'The characterName can contain up to 16 Korean characters, or a mix of letters and numbers up to 32 characters, with no special characters allowed.',
      400
    );
  }

  const character = await createNewCharacter(userId, characterName);
  logger.info(`Character created for user ${userId}: ${characterName}`);
  return { name: character.name };
};

/**
 * 캐릭터 삭제 서비스
 * @param {Object} param - 캐릭터 삭제 정보
 * @param {number} param.userId - 유저 ID
 * @param {string} param.characterName - 삭제할 캐릭터 이름
 * @returns {Object} - 삭제 성공 메시지
 * @returns {number} statusCode - 200: 성공, 403: 권한 부족 또는 캐릭터가 없음
 */
export const deleteCharacter = async ({ userId, characterName }) => {
  const character = await findCharacterByName(characterName);
  if (!character || character.ownerId !== userId) {
    throw new ApiError('Character not found or not owned by user', 403);
  }

  await removeCharacter(character.id);
  logger.info(`Character deleted for user ${userId}: ${characterName}`);
  return { message: 'Character deleted successfully.' };
};

/**
 * 캐릭터 이름 변경 서비스
 * @param {Object} param - 캐릭터 이름 변경 정보
 * @param {number} param.userId - 유저 ID
 * @param {string} param.characterName - 기존 캐릭터 이름
 * @param {string} param.newName - 새로운 캐릭터 이름
 * @returns {Object} - 변경된 캐릭터 이름
 * @returns {number} statusCode - 200: 성공, 403: 권한 부족
 */
export const renameCharacter = async ({ userId, characterName, newName }) => {
  if (!Utils.testNickname(newName)) {
    throw new ApiError(
      'The newName can contain up to 16 Korean characters, or a mix of letters and numbers up to 32 characters, with no special characters allowed.',
      400
    );
  }

  const character = await findCharacterByName(characterName);
  if (!character || character.ownerId !== userId) {
    throw new ApiError('Character not found or not owned by user', 403);
  }

  character.name = newName;
  await updateCharacterName(character);
  logger.info(
    `Character name changed for user ${userId}: ${characterName} -> ${newName}`
  );
  return { name: newName };
};

/**
 * 캐릭터 선택 서비스
 * @param {Object} param - 캐릭터 선택 정보
 * @param {number} param.userId - 유저 ID
 * @param {string} param.characterName - 선택할 캐릭터 이름
 * @returns {Object} - 선택된 캐릭터 정보
 * @returns {number} statusCode - 200: 성공, 403: 권한 부족
 */
export const selectCharacter = async ({ userId, characterName }) => {
  const character = await findCharacterByName(characterName);
  if (!character || character.ownerId !== userId) {
    throw new ApiError('Character not found or not owned by user', 403);
  }

  await updateSelectedCharacterForUser(userId, character.id);
  logger.info(`Character selected for user ${userId}: ${characterName}`);
  return { selectedCharacter: characterName };
};

/**
 * 캐릭터 정보 조회 서비스
 * @param {Object} param - 캐릭터 조회 정보
 * @param {number} [param.userId] - 유저 ID (선택 사항)
 * @param {string} param.characterName - 캐릭터 이름
 * @returns {Object} - 캐릭터의 스탯 및 장착된 아이템 정보
 * @returns {number} statusCode - 200: 성공, 404: 캐릭터를 찾을 수 없음
 */
export const getCharacterInfo = async ({
  userId = undefined,
  characterName,
}) => {
  const character = await findCharacterByName(characterName);
  if (!character) {
    throw new ApiError('Character not found', 404);
  }

  // 캐릭터의 기본 스탯 정보 및 장착 아이템
  let info = {
    name: character.name,
    health: character.health,
    attackPower: character.attackPower,
    defense: character.defense,
    critChance: character.critChance,
    critMultiplier: character.critMultiplier,
    evasion: character.evasion,
    accuracy: character.accuracy,
    expGainRate: character.expGainRate,
    goldGainRate: character.goldGainRate,
    equippedItems: character.equippedItems, // 장착된 아이템 정보는 누구나 조회 가능
  };

  if (userId && character.ownerId === userId) {
    info = {
      ...info,
      gold: character.gold,
      inventory: character.inventoryItems,
    };
  }

  return { ...info };
};
