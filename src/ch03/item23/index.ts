declare let hasMiddle: boolean;
declare let hasDates: boolean;
{
  // 존재하지 않는 속성 비정상
  {
    const pt = {};
    pt.x = 3;
    // ^?
    pt.y = 4;
    // ^?
  }

  // 인터페이스만 정의 비정상
  {
    interface Point {
      x: number;
      y: number;
    }
    const pt: Point = {};
    //    ^?
    pt.x = 3;
    pt.y = 4;
  }

  // 인터페이스와 객체 정의 정상
  {
    interface Point {
      x: number;
      y: number;
    }
    const pt = {
      x: 3,
      y: 4,
    };
  }

  // 타입 단언문 "as" 사용 정상
  {
    interface Point {
      x: number;
      y: number;
    }
    const pt = {} as Point;
    pt.x = 3;
    pt.y = 4;
  }

  // 선언 시 객체를 한꺼번에 만드는게 좋다.
  {
    interface Point {
      x: number;
      y: number;
    }
    const pt: Point = {
      x: 3,
      y: 4,
    };
  }

  // 작은 객체로 큰 객체 만들 경우
  {
    const pt = {
      x: 3,
      y: 4,
    };
    const id = {
      name: "Pythagoras",
    };
    const namedPoint = {};
    Object.assign(namedPoint, pt, id);
    namedPoint.name;
    //          ^?

    // spread를 사용하여 만들면 정상
    const namedPoint2 = { ...pt, ...id };
    namedPoint2.name;
    //          ^?
  }

  // 안전한 방식으로 조건부 속성 추가
  {
    //declare let hasMiddle: boolean; 최상단
    const firstLast = {first: 'Harry', last: 'Truman'};
    const president = {...firstLast, ...(hasMiddle ? {middle: 'S'} : {})};
    //      ^?
  }

  // 전개 연산자를 이용하여 여러 속성 추가
  {
    //declare let hasDates: boolean; 최상단
    const nameTitle = {name: 'Khufu', title: 'Pharaoh'};
    const pharaoh = {
        // ^?
        ...nameTitle,
        ...(hasDates ? {start: -2589, end: -2566} : {})
    };
    pharaoh.start;
    //        ^?
  }
}
