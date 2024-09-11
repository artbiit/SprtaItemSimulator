# 최초로 실행하는 미들웨어에서 next()를 두번 호출해야 결과를 반환하던 문제
- [최초로 실행하는 미들웨어에서 next()를 두번 호출해야 결과를 반환하던 문제](#최초로-실행하는-미들웨어에서-next를-두번-호출해야-결과를-반환하던-문제)
  - [문제](#문제)
  - [원인](#원인)
      - [테스트했던 미들웨어들](#테스트했던-미들웨어들)
        - [token-middleware.js](#token-middlewarejs)
        - [auth-middleware.js](#auth-middlewarejs)
        - [onwership-middleware.js](#onwership-middlewarejs)
        - [role-middleware.js (문제원인)](#role-middlewarejs-문제원인)
      - [라우팅 설정과 문제 되었던 미들웨어 설정](#라우팅-설정과-문제-되었던-미들웨어-설정)
        - [라우팅 설정](#라우팅-설정)
        - [미들웨어 설정](#미들웨어-설정)
  - [해결 방법](#해결-방법)



## 문제
token-middleware.js에서 next()를 반드시 두번 호출해야 값을 반환합니다.
next()를 한번만 호출할 경우 내부 프레임워크 단계에서 갑자기 흐름이 끊겨서 클라이언트가 무기한 대기 상태에 빠집니다.

## 원인
role-middleware.js 에서 파라미터를 통상적인 미들웨어와 다르게 해서 발생했습니다.

#### 테스트했던 미들웨어들

##### token-middleware.js

모든 API가 최초로 반드시 한번은 호출하는 미들웨어로 인증 토큰이 있을 경우 유저 정보를 불러옵니다.

```javascript
const { JWT_SECRET } = env;
import { findUserById } from '../repositories/user-repository.js'; // 유저 정보를 DB에서 가져오는 함수
import ApiError from '../errors/api-error.js';

/** 토큰이 있다면 유저 정보를 불러옵니다. 토큰 유무를 가리지 않고 반드시 첫번째로 불러옵니다. */
export const tokenVerify = async (req, res, next) => {
  console.log('tokenVerify - start');
  let token = req.headers['authorization'];
  token = token && token.split(' ')[1];

  if (token) {
    try {
      // 토큰 검증
      const user = jwt.verify(token, JWT_SECRET);

      // DB에서 유저 정보 불러오기
      const userFromDB = await findUserById(user.userId);
      if (!userFromDB) {
        throw new ApiError('User not found', 401);
      }

      // req.user에 유저 정보 설정
      req.user = {
        userId: user.userId,
        username: user.username,
        role: userFromDB.role,
        usernameFromDB: userFromDB.username,
      };
    } catch (error) {
      logger.warn(`Token verification or user fetch error: ${error.message}`);
      // 인증이 필요 없는 경우 여기서 에러를 반환하지 않고 다음으로 넘어감
    }
  }
  console.log('tokenVerify - end');
  //next(); - 당시에 이렇게 두번 호출해야 값을 반환했음
  next();
};

```

##### auth-middleware.js

route 설정에서 authRequired 플래그가 있으면 인증이 되어있는지 검사하는 미들웨어
순서상 token-middleware.js 후에 불러오게 됩니다.

```javascript
import ApiError from '../errors/api-error.js';

export const authenticateToken = (req, res, next) => {
  console.log('authenticateToken - start');
  if (!req.user) {
    return next(new ApiError('Token is required or invalid', 401));
  }
  console.log('authenticateToken - end');
  return next();
};

```

##### onwership-middleware.js
인증한 계정과 적용하려는 대상 계정이 동일한 계정인지 검사하는 미들웨어
route 설정에서 ownershipRequired 플래그가 있으면 검사합니다.
순서상 auth-middleware.js 후에 불러오게 됩니다.

```javascript
import ApiError from '../errors/api-error.js';

// JWT와 DB 정보를 이용한 소유권 확인 미들웨어
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

```

##### role-middleware.js (문제원인)
인증한 유저의 경우 SUSPENDED 상태인지 검사하고 그 외의 경우 roleRequired에 부합하는 계정인지 검사하는 미들웨어입니다.
반드시 모든 미들웨어를 처리한 후 마지막에 처리하도록 했습니다.

```javascript
import ApiError from '../errors/api-error.js';

const rolePermissions = {
  ADMIN: ['ADMIN'],
  USER: ['USER', 'ADMIN'],
};

/**
 * 토큰 인증과 권한 인증이 같이 필요한 경우 사용하는 미들웨업니다. 따라서 auth-middleware에서 토큰 인증이 완료된 경우만 동작합니다.
 */
export const checkUserRole = (roleRequired) => (req, res, next) => {
  console.log('CheckUserRole : ', roleRequired);
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

```

#### 라우팅 설정과 문제 되었던 미들웨어 설정

##### 라우팅 설정



```javascript
  {
    method: 'post',
    url: '/items',
    action: createNewItem,
    authRequired: true, // 관리자만 접근 가능
    roleRequired: 'ADMIN',
  },
```

##### 미들웨어 설정
다음 구간이 문제가 되었습니다.
> route.middleware.push(checkUserRole);
```javascript
import userRoutes from './user-routes.js'; // 유저 라우트
import Utils from '../lib/utils.js';
import { authenticateToken } from '../middleware/auth-middleware.js';
import { verifyOwnership } from '../middleware/ownership-middleware.js';
import { checkUserRole } from '../middleware/role-middleware.js';
import { tokenVerify } from '../middleware/token-middleware.js';
import characterRoutes from './character-route.js';
import itemManagementRoutes from './item-management-routes.js';

const allRoutes = [
  ...userRoutes,
  ...characterRoutes,
  ...itemManagementRoutes,
  // 다른 라우트 추가 가능
];

// 파라미터 및 미들웨어 자동 설정
allRoutes.forEach((route) => {
  route.requiredParams = Utils.getFunctionParams(route.action);

  route.middleware = [tokenVerify];

  if (route.authRequired) {
    route.middleware.push(authenticateToken);
  }

  if (route.ownershipRequired) {
    route.middleware.push(verifyOwnership);
  }
  
  route.middleware.push(checkUserRole);
});

export default allRoutes;

```


## 해결 방법
다음 절차를 따라 원인을 소거해갔습니다.

1. 미들웨어 실행과 끝 단계에서 로그를 남겨 정상적으로 처리되고 있는지 출력합니다.
2. app의 라우팅 과정에서 등록된 미들웨어들을 출력해 정상적으로 등록되었는지 검사합니다.
3. 디버깅 툴을 이용해 브레이크 포인트를 설정하며 흐름을 살펴봅니다.

결과적으로 routes.js에서 미들웨어를 설정하는 부분을 수정했습니다.

```javascript
  //route.middleware.push(checkUserRole); -
  route.middleware.push(checkUserRole(route.roleRequired));
```

checkUserRole를 살펴보면 다음과 같은 구조입니다.

```javascript
export const checkUserRole = (roleRequired) => (req, res, next) => {}
```

즉 이 함수의 파라미터는 roleRequired이고 (req, res, next) => {}를 return합니다. 다르게 표현하면 다음과 같습니다.

```javascript
export const checkUserRole = (roleRequired) => {return (req, res, next) => {};}
```
