import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.js';
import ApiError from '../errors/api-error.js';
import logger from '../utils/logger.js'; // 로깅 시스템 추가

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
