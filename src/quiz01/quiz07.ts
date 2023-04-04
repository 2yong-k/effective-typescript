interface Foo {
  foo: string;
}
interface Bar {
  bar: string;
}

declare function expressionReturningFoo(): Foo;
function processBar(b: Bar) {}

function f() {
  //...
}

export default {};

/*
    Quiz07. 다음 코드에서 함수 f를 정의할 때, 오류를 발생시키지 않으며 가장 권장하는 코드를 고르시오
    1. function f() {   // 근본적인 원인 해결 불가
        const x = expressionReturningFoo();
        // @ts-ignore
        processBar(x);
    }
    2. function f() {   // 권장
        const x = expressionReturningFoo();
        processBar(x as any);
    }
    3. function f() {   // x의 타입이 any로 남아있음
        const x: any = expressionReturningFoo();
        processBar(x);
    }
    4. function f() {   // x는 Foo형식이므로 Bar형식의 매개변수에 할당될 수 없음.
        const x = expressionReturningFoo();
        processBar(x);
    }
*/

/*
    Answer. 2 : any의 사용범위를 좁게 제한하면서 x의 타입이 Foo로 남아있는 2번이 가장 권장되는 코드이다.
*/
