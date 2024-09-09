import { findUserById } from '../repositories/user-repository.js'; // 유저 정보를 DB에서 가져오는 함수
import ApiError from '../errors/api-error.js';

// JWT와 DB 정보를 이용한 소유권 확인 미들웨어
export const verifyOwnership = async (req, res, next) => {
  // DB에서 유저 정보 가져오기
  try {
    const userIdFromToken = req.body.userId; // JWT에서 추출한 userId
    const usernameFromToken = req.body.username; // JWT에서 추출한 username

    const userFromDb = await findUserById(userIdFromToken);

    if (!userFromDb) {
      return next(new ApiError('User not found', 404));
    }

    // JWT의 username과 DB의 username이 일치하는지 확인
    if (userFromDb.username !== usernameFromToken) {
      return next(new ApiError('Unauthorized access - username mismatch', 403));
    }

    next(); // 모든 검증 통과 시 다음 미들웨어로 진행
  } catch (error) {
    return next(new ApiError('Database error', 500));
  }
};
