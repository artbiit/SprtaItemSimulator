import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import { SERVER_PORT } from './lib/env.js';
import logger from './lib/logger.js';
import allRoutes from './routes/routes.js';
import ApiError from './errors/api-error.js';

const app = express();
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

const errorHandler = (error) => {
  let message = error.message || 'Internal Server Error';
  let statusCode = error.statusCode || 500;

  return { message, statusCode };
};

const routeHandler = (action, requiredParams) => async (req, res) => {
  let success = true;
  let statusCode = 200;
  let message = null;
  let result = {};
  try {
    // 필수 파라미터 검증
    const missingParams = requiredParams.filter((param) => !req.body[param]);
    if (missingParams.length > 0) {
      throw new ApiError(
        `Missing required parameters: ${missingParams.join(', ')}`,
        422
      );
    }

    // 서비스 호출 및 결과 반환
    result = await action(req.body);
  } catch (error) {
    success = false;
    const errorInfo = errorHandler(error);
    message = errorInfo.message;
    statusCode = errorInfo.statusCode;
  } finally {
    res.status(statusCode).json({ success, message, ...result });
  }
};

//모든 라우팅 등록
allRoutes.forEach((api) => {
  const { method, url, action, middleware, requiredParams } = api;
  app[method](url, ...middleware, routeHandler(action, requiredParams));
});

// 에러 처리 미들웨어
app.use((error, req, res, next) => {
  const { message, statusCode } = errorHandler(error);
  res.status(statusCode).json({ success: false, message });
});

app.listen(SERVER_PORT, () => {
  logger.info(`Server running on port ${SERVER_PORT}`);
});
