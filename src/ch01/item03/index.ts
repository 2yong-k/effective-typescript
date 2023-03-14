// 오류가 있을 때 컴파일 하지 않으려면
// tsconfig.json에서 noEmitOnError를 설정

//
{
  interface Square {
    width: number;
  }
  interface Rectangle extends Square {
    height: number;
  }
  type Shape = Square | Rectangle;

  function calculateArea(shape: Shape) {
    if (shape instanceof Rectangle) {
      //               ~~~~~~~~~ 타입이기 때문에 형식만 참조
      return shape.width * shape.height;
      //                         ~~~~~~ Shape에는 height가 없음
    } else {
      return shape.width * shape.width;
    }
  }

  // shape 타입을 보정해주는 코드
  function calculateArea2(shape: Shape) {
    if ("height" in shape) {
      shape;
      //^?
      return shape.width * shape.height;
    } else {
      shape;
      //^?
      return shape.width * shape.width;
    }
  }
}

// 인터페이스. 태그된 유니온 타입. 타입 정보를 손쉽게 유지
// 타입으로만 사용 가능
{
  interface Square {
    kind: "square";
    width: number;
  }
  interface Rectangle {
    kind: "rectangle";
    height: number;
    width: number;
  }
  // 타입으로 참조
  type Shape = Square | Rectangle;
  //     ^?

  function calculateArea(shape: Shape) {
    if (shape.kind === "rectangle") {
      shape;
      //^?
      return shape.width * shape.height;
    } else {
      shape;
      //^?
      return shape.width * shape.width;
    }
  }
}

// 클래스로 만들기
// 타입과 값 모두 사용 가능
{
  class Square {
    constructor(public width: number) {}
  }

  class Rectangle extends Square {
    constructor(public width: number, public height: number) {
      super(width);
    }
  }

  type Shape = Square | Rectangle;

  function calculateArea(shape: Shape) {
    // 값으로 참조
    if (shape instanceof Rectangle) {
      shape;
      //^?
      return shape.width * shape.height;
    } else {
      shape;
      //^?
      return shape.width * shape.width;
    }
  }
}

{
  function asNumber(val: number | string): number {
    return val as number;
    // as number는 타입 단언문으로 런타임 동작에 아무런 영향이 없으므로 잘못된 코드
  }

  function asNumber2(val: number | string): number {
    return typeof val === "string" ? Number(val) : val;
  }
}

// TS에서는 default를 실행하는 방법 존재.
{
  function setLightSwitch(value: boolean) {
    switch (value) {
      case true:
        turnLightOn();
        break;
      case false:
        turnLightOff();
        break;
      default:
        console.log("Error");
    }
  }

  interface LightApiResponse {
    lightSwitchValue: boolean;
  }

  // lightSwitchValue가 문자열이 되어 setLightSwitch에 전달될 수 있다.
  async function setLight() {
    const response = await fetch("/light");
    const result: LightApiResponse = await response.json();
    setLightSwitch(result.lightSwitchValue);
  }
}

// 타입으로는 함수 중복(함수 오버로딩) 불가. JS로 변환 시 구현체만 남기때문에
{
    function add(a: number, b: number) {return a+b;}
    function add(a: string, b: string) {return a+b;}
}

// 타입은 런타임 성능에 영향을 주지 않음. JS로 변환 시점에 타입 연산자는 제거되기 때문.
// 단, 빌드타입 오버헤드가 존재.