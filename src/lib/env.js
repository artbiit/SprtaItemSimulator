import dotenv from 'dotenv';

dotenv.config();

const requiredEnv = {
  DB: [
    'HOST',
    'PORT',
    'USER',
    'PASSWORD',
    'NAME',
    'CONNECTION_LIMIT',
    'TIMEOUT',
  ],
  JWT: [
    'SECRET',
    'EXPIRES_IN',
    'ALGORITHM',
    'ISSUER',
    'AUDIENCE',
    'REFRESH_SECRET',
    'REFRESH_EXPIRES_IN',
  ],
  SERVER: ['PORT'],
  SECURITY: ['PEPPER'],
};

// 환경 변수 검사 및 내보내기
const config = {};

Object.keys(requiredEnv).forEach((key) => {
  requiredEnv[key].forEach((envVar) => {
    const fullEnvVar = `${key}_${envVar}`;
    if (!process.env[fullEnvVar]) {
      throw new Error(`Missing required environment variable: ${fullEnvVar}`);
    }
    if (!config[key]) {
      config[key] = {};
    }
    config[key][envVar] = process.env[fullEnvVar];
  });
});

// flattenedConfig 객체로 모든 환경 변수를 평탄화
const flattenedConfig = Object.entries(config).reduce(
  (acc, [namespace, values]) => {
    Object.entries(values).forEach(([key, value]) => {
      acc[`${namespace}_${key}`] = value;
    });
    return acc;
  },
  {}
);

// 모든 값을 한 번에 내보내기
export default flattenedConfig;
