import ApiError from '../errors/api-error.js';

// JWT와 DB 정보를 이용한 소유권 확인 미들웨어
export const verifyOwnership = async (req, res, next) => {
  // DB에서 유저 정보 가져오기
  try {
    const usernameFromToken = req.user.username; // JWT에서 추출한 username
    const userFromDb = req.user.usernameFromDB;

    if (!userFromDb) {
      return next(new ApiError('User not found', 404));
    }

    // JWT의 username과 DB의 username이 일치하는지 확인
    if (userFromDb !== usernameFromToken) {
      return next(new ApiError('Unauthorized access - username mismatch', 403));
    }
  } catch (error) {
    return next(new ApiError('Database error', 500));
  }
  return next();
};
