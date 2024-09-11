/** api로 요청해서 장비를 추가합니다. */
import axios from 'axios';
import https from 'https';

const agent = new https.Agent({
  rejectUnauthorized: false, // SSL 인증서 검증 비활성화
});
import { faker } from '@faker-js/faker';

// 전역 변수 설정
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE3MjYwNTcwNDEsImV4cCI6MTcyNjIyOTg0MSwiYXVkIjoic3BhcnRhIiwiaXNzIjoicG9zaXRpdmVuZXJkLmR1Y2tkbnMub3JnIn0.BszCmiPNCDbuXxkUDcgftUucX3Ht_SbRJnGdPmN0GAI'; // 로그인 후 가져온 토큰
const url = 'http://sprata.positivenerd.duckdns.org/items'; // 서버 URL

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

// 아이템 생성 요청 함수
const createNewItem = async (itemData) => {
  try {
    const response = await axios.post(
      url,
      { itemData },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        httpsAgent: agent,
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      'Error creating item:',
      error.response?.data || error.message
    );
    throw error;
  }
};

// 간단한 테스트 함수
const testCreateNewItem = async () => {
  const mockItemData = generateRandomItemData();

  try {
    const newItem = await createNewItem(mockItemData);
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
const runTests = async () => {
  for (let i = 0; i < 200; i++) {
    await testCreateNewItem();
  }
};

runTests();
