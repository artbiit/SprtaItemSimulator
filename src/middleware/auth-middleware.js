import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.js';
import ApiError from '../errors/api-error.js';

export const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return next(new ApiError('Token is required', 403)); // 403 Forbidden
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return next(new ApiError('Invalid token', 403)); // 403 Forbidden
    }

    req.user = user;
    next(); // 토큰이 유효하면 다음 미들웨어 또는 컨트롤러로 진행
  });
};
