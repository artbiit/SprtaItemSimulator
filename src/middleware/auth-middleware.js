import ApiError from '../errors/api-error.js';

/** 인증된 요청인지 검사합니다. 선행에 token-middleware.js에서 인증된 요청일경우 req.user를 생성하기에 이것으로 검사합니다. */
export const authenticateToken = (req, res, next) => {
  if (!req.user) {
    return next(new ApiError('Token is required or invalid', 401));
  }
  return next();
};
