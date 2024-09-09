import ApiError from '../errors/api-error.js';

// 유저 권한 검증 미들웨어 (JWT 검증은 이미 auth-middleware에서 처리됨)
export const checkUserRole = (requiredRole) => (req, res, next) => {
  // auth-middleware에서 req.user에 추가된 유저 정보 사용
  const user = req.user;

  if (!user) {
    return next(new ApiError('User information is missing', 401)); // 유저 정보가 없는 경우
  }

  // 유저의 권한이 requiredRole과 일치하는지 확인
  if (user.role !== requiredRole) {
    return next(new ApiError('You do not have the required permissions', 403)); // 권한이 없을 때
  }

  next(); // 권한 검증 통과 시 다음 미들웨어로 진행
};
