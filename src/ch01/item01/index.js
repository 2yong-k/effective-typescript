function greet(who: string) {
    // 타입스크립트에서만 가능한 코드
  console.log("Hello", who);
}

{
  let city = "new york city";
  console.log(city.toUppercase());
  //                ~~~~~~~~~~~ js에서는 오류를 찾지 못함
}

{
    const states = [
        {name: 'Albama', capital: 'Montgomery'},
        {name: 'Alaska', capital: 'Juneau'},
        {name: 'Arizona', capital: 'Phoenix'},
        // ...
    ]

    for (const state of states) {
        console.log(state.capitol);
        //          ~~~~~~~~~~~~~ undefined로 오류를 잡지 못함
    }
}

{
  interface State {
    name: string;
    capital: string;
  }

  const states: State[] = [
    { name: "Albama", capital: "Montgomery" },
    { name: "Alaska", capitol: "Juneau" },
    //                ~~~~~~~~~~~~~~~~ 오류를 잡지 못함
    { name: "Arizona", capital: "Phoenix" },
  ];

  for (const state of states) {
    console.log(state.capital);
  }
}