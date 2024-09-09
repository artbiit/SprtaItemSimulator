import userRoutes from './user-routes.js'; // 유저 라우트
import Utils from '../lib/utils.js';
import { authenticateToken } from '../middleware/auth-middleware.js';
import { verifyOwnership } from '../middleware/ownership-middleware.js';
import { checkUserRole } from '../middleware/role-middleware.js';

const allRoutes = [
  ...userRoutes,
  // 다른 라우트 추가 가능
];

// 파라미터 및 미들웨어 자동 설정
allRoutes.forEach((route) => {
  route.requiredParams = Utils.getFunctionParams(route.action);

  if (!route.middleware) {
    route.middleware = [];
  }

  if (route.authRequired) {
    route.middleware.unshift(authenticateToken);
  }

  if (route.ownershipRequired) {
    route.middleware.push(verifyOwnership);
  }

  if (route.roleRequired) {
    route.middleware.push(checkUserRole);
  }
});

export default allRoutes;
