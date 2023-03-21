declare function cacheLast<T extends Function>(fn: T): T;
declare function shallowEqual(a: any, b: any): boolean;
declare function shallowObjectEqual<T extends object>(a: T, b: T): boolean;

// 매개변수로 두 개의 배열 비교
{
  function cacheLast<T extends Function>(fn: T): T {
    let lastArgs: any[] | null = null;
    let lastResult: any;

    // 타입스크립트에서 반환문 함수와 원본 함수의 관련을 알지 못하기 때문에 오류.
    return function (...args: any[]) {
      if (!lastArgs || !shallowEqual(lastArgs, args)) {
        lastResult = fn(...args);
        lastArgs = args;
      }
      return lastResult;
    };
  }

  function cacheLast2<T extends Function>(fn: T): T {
    let lastArgs: any[] | null = null;
    let lastResult: any;

    // as unknown as T 타입 단언문을 추가함으로써 오류 제거
    return function (...args: any[]) {
      if (!lastArgs || !shallowEqual(lastArgs, args)) {
        lastResult = fn(...args);
        lastArgs = args;
      }
      return lastResult;
    } as unknown as T;
  }
}

// 매개변수로 객체
{
    function shallowObjectEqual<T extends object>(a: T, b:T): boolean {
        for (const [k, aVal] of Object.entries(a)) {
            if (!(k in b) || aVal !== b[k]) {
                return false;
            }
        }
        return Object.keys(a).length === Object.keys(b).length;
    }

    function shallowObjectEqual1<T extends object>(a: T, b: T): boolean {
      for (const [k, aVal] of Object.entries(a)) {
        if (!(k in b) || aVal !== (b as any)[k]) {
          return false;
        }
      }
      return Object.keys(a).length === Object.keys(b).length;
    }
}
