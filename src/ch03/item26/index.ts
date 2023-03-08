{
  // 문자열 리터럴 타입
  {
    type Language = "JavaScript" | "TypeScript" | "Python";
    function setLanguage(language: Language) {}

    // 인라인 형태: 정상
    setLanguage("JavaScript");

    // 참조 형태: string으로 추론하여 Language 타입으로 할당 불가
    let language = "JavaScript";
    setLanguage(language);
    //          ^?

    // 해결법 1: 타입 선언 시 가능한 값 제한
    let language2: Language = "JavaScript";
    setLanguage(language2);
    //          ^?

    // 해결법 2: 상수로 선언 시 Language 타입으로 추론 가능. 단 재할당해야 하는 경우 해결법 1으로
    const language3 = "JavaScript";
    setLanguage(language3);
    //          ^?
  }

  // 튜플 타입
  {
    function panTo(where: [number, number]) {}

    // 인라인 형태: 정상
    panTo([10, 20]);

    // 매개변수 타입과 다른 것으로 추론
    const loc = [10, 20];
    panTo(loc);
    //      ^?

    // 해결법 1: 타입 선언 시 가능한 값 제한
    const loc2: [number, number] = [10, 20];
    panTo(loc2);
    //      ^?

    // 해결법 2: 주의! 상수 문맥을 제공 as const 사용. readonly를 추가
    // 시그니처를 수정할 수 없을 경우 해결법 1
    function panTo2(where: readonly [number, number]) {}
    const loc3 = [10, 20] as const;
    panTo2(loc3);
    //      ^?

    // 해결법 2의 오류
    const loc4 = [10, 20, 30] as const;
    panTo2(loc4);
    //      ^?
  }

  // 객체에서 상수 뽑기
  {
    type Language = "JavaScript" | "TypeScript" | "Python";
    interface GovernedLanguage {
        language: Language;
        organization: string;
    }

    function complain(language: GovernedLanguage) {}

    // 정상 동작
    complain({language: 'TypeScript', organization: 'Microsoft'});

    // string으로 추론하여 비정상 동작 => 타입 선언 혹은 상수 단언으로 해결
    const ts = { language: "TypeScript", organization: "Microsoft" };
    complain(ts);
    //       ^?
  }

  // 콜백 사용 시 주의점
  {
    function callWithRandomNumbers(fn: (n1: number, n2: number) => void) {
      fn(Math.random(), Math.random());
    }

    // 정상 동작
    callWithRandomNumbers((a, b) => {
      a;
      //  ^?
      b;
      //  ^?
      console.log(a + b);
    });

    // 비정상 동작: any로 추론하기에 타입 구문을 추가해 줘야함
    const fn = (a, b) => {
      //      ^?
      console.log(a + b);
    };
    callWithRandomNumbers(fn);
    //                    ^?

    // 정상 동작
    const fn2 = (a:number, b:number) => {
      console.log(a + b);
    };
    callWithRandomNumbers(fn2);
    //                    ^?
  }
}
