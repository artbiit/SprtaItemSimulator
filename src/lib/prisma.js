import { PrismaClient } from '@prisma/client';
import logger from './logger.js';
import env from './env.js';
import Utils from './utils.js';
import bcrypt from 'bcryptjs';

const { SERVER_ADMIN_ID, SERVER_ADMIN_PW } = env;
const prisma = new PrismaClient();

try {
  // 1. DB에서 admin 계정 존재 여부 확인
  const adminUser = await prisma.user.findUnique({
    where: { username: SERVER_ADMIN_ID },
  });

  // 2. admin 계정이 없으면 새로 생성
  if (!adminUser) {
    const hashedPassword = await bcrypt.hash(
      Utils.getPepperedPassword(SERVER_ADMIN_PW),
      10
    );
    await prisma.user.create({
      data: {
        username: SERVER_ADMIN_ID,
        nickname: SERVER_ADMIN_ID,
        password: hashedPassword,
        role: 'ADMIN', // 권한 설정
      },
    });
    logger.info('Admin account created successfully');
  }
} catch (error) {
  logger.error('Error checking or creating admin account:', error);
}

export { prisma };
