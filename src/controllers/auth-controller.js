import {
  generateAccessToken,
  generateRefreshToken,
} from '../services/authService.js';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../lib/env.js';

let refreshTokens = []; // Refresh Token을 저장할 배열. 실제로는 DB나 Redis를 사용

// 로그인 엔드포인트
export const login = (req, res) => {
  const user = { id: 1, email: 'user@example.com' }; // 실제로는 DB에서 유저 정보를 가져옴

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  refreshTokens.push(refreshToken); // 실제로는 DB나 Redis에 저장

  res.json({
    accessToken,
    refreshToken,
  });
};

// Refresh Token을 사용해 Access Token을 갱신하는 엔드포인트
export const refreshToken = (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(401).json({ message: 'Refresh Token is required' });
  }

  if (!refreshTokens.includes(token)) {
    return res.status(403).json({ message: 'Invalid Refresh Token' });
  }

  jwt.verify(token, JWT_REFRESH_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid Refresh Token' });
    }

    const newAccessToken = generateAccessToken(user);
    res.json({ accessToken: newAccessToken });
  });
};
