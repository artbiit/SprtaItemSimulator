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
  ], // Refresh 관련 추가
};

// 환경 변수 검사 및 내보내기
const config = {};

Object.keys(requiredEnv).forEach((key) => {
  requiredEnv[key].forEach((envVar) => {
    const fullEnvVar = `${key}_${envVar}`;
    if (!process.env[fullEnvVar]) {
      throw new Error(`Missing required environment variable: ${fullEnvVar}`);
    }
    config[envVar] = process.env[fullEnvVar];
  });
});

export const {
  SECRET: JWT_SECRET,
  EXPIRES_IN: JWT_EXPIRES_IN,
  ALGORITHM: JWT_ALGORITHM,
  ISSUER: JWT_ISSUER,
  AUDIENCE: JWT_AUDIENCE,
  REFRESH_SECRET: JWT_REFRESH_SECRET,
  REFRESH_EXPIRES_IN: JWT_REFRESH_EXPIRES_IN,
} = config;
