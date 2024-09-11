import { prisma } from '../lib/prisma.js';

export const findCharacterNameAndGoldById = (characterId) =>
  prisma.character.findUnique({
    where: {
      id: characterId,
    },
    select: { name: true, gold: true },
  });

export const findGoldById = (characterId) => {
  return prisma.character.findUnique({
    where: { id: characterId },
    select: { gold: true },
  });
};

export const updateCharacterGold = (characterId, newGold) => {
  if (typeof newGold !== 'number' || isNaN(newGold)) {
    throw new Error('Invalid gold value : ', newGold);
  }

  return prisma.character.update({
    where: { id: characterId },
    data: { gold: newGold },
  });
};

// 캐릭터의 보유 골드 및 goldGainRate 정보 가져오기
export const getCharacterGoldAndRates = async (characterId) => {
  return prisma.character.findUnique({
    where: { id: characterId },
    select: {
      gold: true,
      goldGainRate: true,
    },
  });
};

// 캐릭터 생성
export const createNewCharacter = (userId, name) => {
  return prisma.character.create({
    data: {
      name,
      owner: { connect: { id: userId } },
    },
  });
};

// 캐릭터 ID로 조회
export const findCharacterById = (characterId) => {
  return prisma.character.findUnique({
    where: { id: characterId },
    include: { owner: true, equippedItems: true, inventoryItems: true },
  });
};

// 캐릭터 이름으로 조회
export const findCharacterByName = (characterName) => {
  return prisma.character.findUnique({
    where: { name: characterName },
    include: { owner: true, equippedItems: true, inventoryItems: true },
  });
};

// 캐릭터 삭제
export const removeCharacter = (characterId) => {
  return prisma.character.delete({
    where: { id: characterId },
  });
};

// 캐릭터 이름 변경
export const updateCharacterName = (character) => {
  return prisma.character.update({
    where: { id: character.id },
    data: { name: character.name },
  });
};

// 선택한 캐릭터 업데이트
export const updateSelectedCharacterForUser = (userId, characterId) => {
  return prisma.user.update({
    where: { id: userId },
    data: { selectedCharacterId: characterId },
  });
};
