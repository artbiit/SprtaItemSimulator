import { faker } from '@faker-js/faker';
import {
  createNewItem,
  removeItem,
} from '../services/item-management-service.js'; // 실제 서비스 함수 가져오기

// 희귀도에 따른 가격 범위 설정
const rarityPriceMap = {
  COMMON: { min: 10, max: 50 },
  UNCOMMON: { min: 51, max: 200 },
  RARE: { min: 201, max: 500 },
  EPIC: { min: 501, max: 1000 },
  LEGENDARY: { min: 1001, max: 5000 },
};

// 테스트 데이터 생성 함수
const generateRandomItemData = () => {
  const rarity = faker.helpers.arrayElement([
    'COMMON',
    'UNCOMMON',
    'RARE',
    'EPIC',
    'LEGENDARY',
  ]);
  const isEquippable = faker.datatype.boolean(0.5);

  const baseItem = {
    name: faker.commerce.productName(),
    value: faker.number.int(rarityPriceMap[rarity]),
    isEquippable,
    maxStack: isEquippable ? 1 : faker.number.int({ min: 1, max: 100 }),
    rarity,
  };

  if (isEquippable) {
    baseItem.stats = {
      healthBonus: faker.number.int({ min: 0, max: 100 }),
      attackBonus: faker.number.int({ min: 0, max: 50 }),
      defenseBonus: faker.number.int({ min: 0, max: 50 }),
      critChanceBonus: faker.number.int({ min: 0, max: 30 }),
      critMultiplierBonus: faker.number.float({ min: 1.0, max: 2.0 }),
      evasionBonus: faker.number.int({ min: 0, max: 30 }),
      accuracyBonus: faker.number.int({ min: 0, max: 30 }),
    };
  }

  return baseItem;
};

// 간단한 테스트 함수
const testCreateNewItem = async () => {
  const mockItemData = generateRandomItemData();

  try {
    const newItem = await createNewItem({ itemData: mockItemData });
    console.log('Item created successfully:', newItem);

    // 검증
    if (newItem.name !== mockItemData.name) {
      console.error('Test failed: Name does not match');
    } else {
      console.log('Test passed: Name matches');
    }

    if (newItem.value !== mockItemData.value) {
      console.error('Test failed: Value does not match');
    } else {
      console.log('Test passed: Value matches');
    }

    // 장비일 경우 스탯도 검증
    if (mockItemData.isEquippable && newItem.stats) {
      console.log('Test passed: Stats exist for equippable item');
    } else if (!mockItemData.isEquippable && !newItem.stats) {
      console.log('Test passed: No stats for non-equippable item');
    } else {
      console.error('Test failed: Stats check failed');
    }
  } catch (error) {
    console.error('Error creating item:', error);
  }
};

// 테스트 실행
for (let i = 0; i < 200; i++) {
  await testCreateNewItem();
}
