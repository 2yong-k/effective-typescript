/**
 * Quiz00. 타입스크립트의 공변성과 반공변성?
 */

/**
 * Answer. 
 * 공변성: A가 B의 서브타입이면, T<A>는 T<B>의 서브타입이다.
 * 반공변성: A가 B의 서브타입이면, T<B>는 T<A>의 서브타입이다.
 * 이변성: A가 B의 서브타입이면, T<A> -> T<B>도 가능하고, T<B> -> T<A>도 가능하다.
 * 불변성: A가 B의 서브타입이더라도, T<A> -> T<B>도 불가능하고, T<B> -> T<A>도 불가능하다.
 * 
 * 타입스크립트 타입들은 기본적으로 공변성을 따르지만, 매개변수는 반공변성.
 * tsconfig의 strictFunctionTypes 옵션이 true일 시, 매개변수는 반공변성. false일 시, 이변성.
 */

type Logger<T> = (param: T) => void;

let log: Logger<string | number> = (param) => {
  console.log(param);
};

let logNumber: Logger<number> = (param) => {
  console.log(param);
};

log = logNumber; // Error: string 타입을 처리할 수 없어서
logNumber = log; // OK

log = (param: string | number) => {
  logNumber = (param: number) => {
    console.log(param);
  };
};
