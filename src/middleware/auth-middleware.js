import jwt from 'jsonwebtoken';
import env from '../lib/env.js';
import ApiError from '../errors/api-error.js';
import logger from '../lib/logger.js'; // 로깅 시스템 추가

const { JWT_SECRET } = env;
export const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    logger.warn('Missing token');
    return next(new ApiError('Token is required', 401)); // 401 Unauthorized
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      logger.warn(`Invalid token: ${token}`);
      return next(new ApiError('Invalid token', 403)); // 403 Forbidden
    }

    req.user = user;
    next();
  });
};
