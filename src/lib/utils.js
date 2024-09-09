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
}
export default Utils;
