declare function shallowEqual(a: any, b: any): boolean;

function cacheLast<T extends Function>(fn: T): T {
  let lastArgs: any[] | null = null;
  let lastResult: any;

  return function (...args: any[]) {
    if (!lastArgs || !shallowEqual(lastArgs, args)) {
      lastResult = fn(...args);
      lastArgs = args;
    }
    return lastResult;
  } as unknown as T;
}

export default {};

/*
    Quiz12. 아래 코드에서 cacheLast 함수를 호출하는 쪽에서 any가 사용되었는지 알 수 있다.
    1. O
    2. X
*/

/*
    Answer. X : 호출되는 쪽에서는 any가 사용되어졌는지 알 수 없다.
*/
