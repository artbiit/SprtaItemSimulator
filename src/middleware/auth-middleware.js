import ApiError from '../errors/api-error.js';

export const authenticateToken = (req, res, next) => {
  if (!req.user) {
    return next(new ApiError('Token is required or invalid', 401));
  }

  return next();
};
