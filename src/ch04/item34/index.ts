// 추상적인 number
{
  interface Point {
    type: "Point";
    coordinates: number[];
  }
  interface LineString {
    type: "LineString";
    coordinates: number[][];
  }
  interface Polygon {
    type: "Polygon";
    coordinates: number[][][];
  }
  type Geometry = Point | LineString | Polygon;
}

// 타입을 좁힐 시 다른 정보가 있는 곳은 오류 발생할 수 있음.
// ex) 위치정보에서 위도, 경도로 좁혔지만, 고도 등이 있을 수 있음.
{
  type GeoPosition = [number, number];
  interface Point {
    type: "Point";
    coordinates: GeoPosition;
  }
}

// 코드를 정밀하게 만들려는 시도가 더 부정확해질 수 있음.
{
  interface MathCall {
    0: "+" | "-" | "/" | "*" | ">" | "<";
    1: Expression4;
    2: Expression4;
    length: 3;
  }

  interface CaseCall {
    0: "case";
    1: Expression4;
    2: Expression4;
    3: Expression4;
    length: 4 | 6 | 8 | 10 | 12 | 14 | 16;
  }

  interface RGBCall {
    0: "rgb";
    1: Expression4;
    2: Expression4;
    3: Expression4;
    lenght: 4;
  }

  type FnName = "+" | "-" | "*" | "/" | ">" | "<" | "case" | "rgb";
  type CallExpression1 = [FnName, ...any[]];
  type CallExpression2 = MathCall | CaseCall | RGBCall;
  type Expression1 = any;
  type Expression2 = number | string | any[];
  type Expression3 = number | string | CallExpression1;
  type Expression4 = number | string | CallExpression2;

  const tests: Expression2[] = [
    10,
    "red",
    true,
    //^ 불가
    ["+", 10, 5],
    ["case", [">", 20, 10], "red", "blue", "green"],
    ["**", 2, 31],
    ["rgb", 255, 128, 64],
    ["rgb", 255, 0, 127, 0],
  ];

  const tests2: Expression3[] = [
    10,
    "red",
    true,
    //^ 불가
    ["+", 10, 5],
    ["case", [">", 20, 10], "red", "blue", "green"],
    ["**", 2, 31],
    //^ 불가
    ["rgb", 255, 128, 64],
    ["rgb", 255, 0, 127, 0],
  ];

  const test3: Expression4[] = [
    10,
    "red",
    true,
    //^ 불가
    ["+", 10, 5],
    ["case", [">", 20, 10], "red", "blue", "green"],
    //^ 불가
    ["**", 2, 31],
    //^ 불가
    ["rgb", 255, 128, 64],
    //^ 불가
    ["rgb", 255, 0, 127, 0],
    //^ 불가
  ];
}
