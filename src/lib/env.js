import dotenv from 'dotenv';

dotenv.config();

const requiredEnv = {
    DB:['HOST', 'PORT', 'USER', 'PASSWORD', 'NAME', 'CONNECTION_LIMIT', 'TIMEOUT'],
    JWT:['SECRET', 'EXPIRES_IN', 'ALGORITHM', 'ISSUER', 'AUDIENCE']
}

// requiredEnv를 순회하면서 설정이 있는지 검사합니다.
// requiredEnv.DB[0] 일 경우 'DB_HOST' 로 검사하게 됩니다.
Object.keys(requiredEnv).forEach((key) => {
    requiredEnv[key].forEach((envVar) => {
      const fullEnvVar = `${key}_${envVar}`;
      if (!process.env[fullEnvVar]) {
        throw new Error(`Missing required environment variable: ${fullEnvVar}`);
      }
    });
  });

