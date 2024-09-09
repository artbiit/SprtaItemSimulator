import NoInstance from '../design-patterns/no-instance.js';
import env from './env.js';

const { SECURITY_PEPPER } = env;
class Utils extends NoInstance {
  /**
   *  해당 함수의 파라미터 목록을 반환합니다.
   */
  static getFunctionParams = (fn) => {
    const fnStr = fn.toString();
    const paramMatch = fnStr.match(/\(([^)]*)\)/);

    if (!paramMatch) {
      return [];
    }

    // 중괄호 및 불필요한 공백 제거
    return paramMatch[1]
      .replace(/[{}]/g, '') // 중괄호 제거
      .split(',') // 콤마로 나누기
      .map((param) => param.trim()); // 공백 제거
  };

  /** 비번에 후추를 칩니다. */
  static getPepperedPassword = (password) => {
    return `${password}${SECURITY_PEPPER}`;
  };

  /** 유저 id 규칙에 해당하는지 검사합니다. */
  static testUsername = (username) => /^[a-zA-Z0-9]{5,}$/.test(username);

  /** 유저 비번 규칙에 해당하는지 검사합니다. */
  static testPassword = (password) =>
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{6,}$/.test(
      password
    );

  /** 유저 닉네임 규칙에 해당하는지 검사합니다. */
  static testNickname = (nickname) =>
    /^(?=.*[가-힣])([가-힣a-zA-Z0-9]{1,16})$|^[a-zA-Z0-9]{1,32}$/.test(
      nickname
    );
}
export default Utils;
