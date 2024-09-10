import ApiError from '../errors/api-error.js';

const rolePermissions = {
  ADMIN: ['ADMIN'],
  USER: ['USER', 'ADMIN'],
};

/**
 * 토큰 인증과 권한 인증이 같이 필요한 경우 사용하는 미들웨업니다. 따라서 auth-middleware에서 토큰 인증이 완료된 경우만 동작합니다.
 */
export const checkUserRole = (roleRequired) => (req, res, next) => {
  const user = req.user;
  // SUSPENDED 상태면 차단
  if (user?.role === 'SUSPENDED') {
    return next(new ApiError('Your account is suspended', 403)); // SUSPENDED인 경우
  }

  if (roleRequired) {
    if (!user) {
      return next(new ApiError('User information is missing', 401)); // 유저 정보가 없는 경우
    }

    // 권한이 요구된 역할과 일치하는지 확인
    const allowedRoles = rolePermissions[roleRequired] || [];
    if (!allowedRoles.includes(user.role)) {
      return next(
        new ApiError(
          `You do not have the required ${roleRequired} permissions`,
          403
        )
      );
    }
  }
  return next(); // 권한 검증 통과 시 다음 미들웨어로 진행
};
