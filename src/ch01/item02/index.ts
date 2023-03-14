// noImplicitAny란 변수들이 미리 정의된 타입을 가져야 하는지 여부를 제어. true로 설정하는 것이 좋다.
// noImplicitAny: 변수의 타입을 정해주지 않았을 경우
{
  function add(a, b) {
    return a + b;
  }
  add(10, null);
}

// noImplicitAny: 변수의 타입을 정해주었을 경우
{
    function add(a: number, b: number) {
        return a + b;
    }
}

// strictNullChecks란 null과 undefined가 모든 타입에서 허용되는지 확인하는 설정.
// true로 설정하는 것이 좋지만 코드 작성이 어렵다.
// noImplicitAny를 먼저 true로 설정 후 설정해야 한다.
{
    const x: number = null; // 오류
    const y: number | null = null;
}

// strict 설정 시 대부분의 오류를 잡아낸다.
{
    // tsconfig.json
  "compilerOptions": {
    "strict": true
  }
}