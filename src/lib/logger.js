import winston from 'winston';
import _ from 'winston-daily-rotate-file';

// 로그 형식 정의
const logFormat = winston.format.printf(({ timestamp, level, message }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

// 로그 파일을 매일 새로 생성하고, 5일간만 보관
const transport = new winston.transports.DailyRotateFile({
  filename: 'logs/application-%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
  maxFiles: '5d', // 5일간의 로그 파일만 유지
  zippedArchive: true, // 로그 파일 압축
});

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(winston.format.timestamp(), logFormat),
  transports: [transport, new winston.transports.Console()],
});

export default logger;
