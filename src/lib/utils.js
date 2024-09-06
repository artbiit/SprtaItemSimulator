import NoInstance from '../design-patterns/no-instance';

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

    // 파라미터 목록에서 불필요한 공백 제거
    return paramMatch[1].split(',').map((param) => param.trim());
  };
}
export default Utils;
