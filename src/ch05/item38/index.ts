{
  interface Foo {
    foo: string;
  }

  interface Bar {
    bar: string;
  }

  function expressionReturningFoo(): Foo;
  function processBar(b: Bar) {}

  // Foo 형식의 인수는 Bar 형식의 매개변수에 할당될 수 없다.
  function f() {
    const x = expressionReturningFoo();
    processBar(x);
    //         ^?
  }

  // x의 타입이 any로 남아있기 때문에 권장하지 않음
  function f1() {
    const x: any = expressionReturningFoo();
    processBar(x);
  }

  // x의 타입이 Foo로 남아있기 때문에 권장
  // any의 사용범위를 좁게 제한
  function f2() {
    const x = expressionReturningFoo();
    processBar(x as any);
  }

  // @ts-ignore를 사용하면 오류가 제거되지만 근본적인 원인을 해결하지 않았기 때문에 바람직하지 않음
  function f3() {
    const x = expressionReturningFoo();
    // @ts-ignore
    processBar(x);
  }
}

// as any를 이용하여 최소한의 범위에서만 사용
{
    const config: Config = {
        a: 1,
        b: 2,
        c: {
            key: value as any
        }
    }
}