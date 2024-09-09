import ApiError from '../errors/api-error.js';
import logger from '../lib/logger.js'; // 로깅 시스템 추가

export const authenticateToken = (req, res, next) => {
  if (!req.user) {
    logger.warn('Missing or invalid token');
    return next(new ApiError('Token is required or invalid', 401)); // 401 Unauthorized
  }

  next(); // 유효한 토큰이 있을 경우 다음으로 진행
};
