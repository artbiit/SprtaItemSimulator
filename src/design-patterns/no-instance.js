/**
 *  인스턴스를 생성하지 못하도록 합니다.
 */
class NoInstance {
  constructor() {
    if (new.target === NoInstance) {
      throw new Error('Cannot instantiate abstract class NoInstance.');
    }
    throw new Error('Cannot instantiate static class.');
  }
}

export default NoInstance;
