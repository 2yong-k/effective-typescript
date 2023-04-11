// 선언되지 않은 클래스 멤버는 quick fix 기능으로 간단히 해결
{
  class Greeting {
    // GreetingTS
    // greeting: string;
    // name: any;

    constructor(name) {
      this.greeting = "Hello";
      this.name = name;
    }
    greet() {
      return this.greeting + " " + this.name;
    }
  }
}

// 타입이 바뀌는 값
{
    const state = {};
    state.name = 'New York';
    state.capital = 'Albany'

    // 한 번에 객체 생성 시 오류 해결
    const stateTS = {
        name: 'New York',
        capital: 'Albany',
    };

    // 한꺼번에 생성하기 곤란한 경우. 타입 단언문 사용
    interface State {
        name: string;
        capital: string;
    }
    const stateTSTS = {} as State;
    stateTSTS.name = 'New York';
    stateTSTS.capital = 'Albany';
}