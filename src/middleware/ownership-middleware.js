import ApiError from '../errors/api-error.js';

// 본인 계정에 대한 요청인지 검증하는 미들웨어
export const verifyOwnership = async (req, res, next) => {
  const userIdFromToken = req.user.userId; // JWT에서 추출한 userId
  const { userId } = req.params || req.body; // 요청 파라미터나 바디에서 받은 userId

  if (userIdFromToken !== parseInt(userId)) {
    // 토큰에서 가져온 userId와 요청에서 받은 userId가 다르면 에러 처리
    return next(
      new ApiError('You do not have permission to access this resource', 403)
    ); // 403 Forbidden
  }

  next(); // 검증 통과 시 다음 미들웨어로 진행
};
