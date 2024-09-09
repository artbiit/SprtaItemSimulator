import jwt from 'jsonwebtoken';
import env from '../lib/env.js';
import logger from '../lib/logger.js'; // 로깅 시스템 추가
const { JWT_SECRET } = env;

export const tokenVerify = (req, res, next) => {
  let token = req.headers['authorization'];
  token = token && token.split(' ')[1];

  if (token) {
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        logger.warn(`Invalid token: ${token}`);
        return; // 인증이 필요 없는 경우 여기서 에러를 반환하지 않음
      }
      req.user = user;
    });
  }
  next();
};
