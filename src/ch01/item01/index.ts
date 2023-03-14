function greet(who: string) {
    console.log('Hello', who);
}

// 오타에 대해서 오류를 잡음
{
    let city = 'new york city';
    console.log(city.toUppercase());
    //               ~~~~~~~~~~~~~ ts에서는 오류를 찾음
}

// 오타에 대해서 오류를 잡음
{
  const states = [
    { name: "Albama", capital: "Montgomery" },
    { name: "Alaska", capital: "Juneau" },
    { name: "Arizona", capital: "Phoenix" },
    // ...
  ];

  for (const state of states) {
    console.log(state.capitol);
    //          ~~~~~~~~~~~~~ 의도된 코드가 아닌 것을 오류로 잡음
  }
}

// 의도를 알고 정해진 interface에서 벗어날 시 오류로 잡음
{
    interface State {
        name: string;
        capital: string;
    }

    const states: State[] = [
      { name: "Albama", capital: "Montgomery" },
      { name: "Alaska", capitol: "Juneau" },
      //                ~~~~~~~~~~~~~~~~~ 오타에 대한 오류
      { name: "Arizona", capital: "Phoenix" },
    ];

    for (const state of states) {
        console.log(state.capital);
    }
}

{   
    const x = 2 + '3';
    //    ^?
    const y = '2' + 3;
    //    ^?

    const a = null + 7;
    //    ^?
    const b = [] + 12;
    //    ^?
    alert('Hello', "TypeScript");
    //              ~~~~~~~~~~~ 인수 개수 오류

    const names = ['Alice', 'Bob'];
    console.log(names[2].toUpperCase());
    // 값이 없기 때문에 런타임 오류 발생
}