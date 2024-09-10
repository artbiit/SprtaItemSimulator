import ApiError from '../errors/api-error.js';

/** 해당 인증된 요청이 인증된 정보와 db 정보가 같은지 검사합니다.*/
export const verifyOwnership = (req, res, next) => {
  console.log(verifyOwnership);
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
