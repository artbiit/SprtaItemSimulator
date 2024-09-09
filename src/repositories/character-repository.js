import { prisma } from '../lib/prisma.js';

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
