// 기본적인 레이어 인터페이스
{
  interface Layer {
    // 레이아웃 스타일
    layout: FillLayout | LineLayout | PointLayout;
    // 선 스타일
    paint: FillPaint | LinePaint | PointPaint;
  }
}

{
  // 오류를 발생하는 조합이 생길 수 있기 때문에 인터페이스를 나눠서 작성
  interface FillLayer {
    type: 'fill';
    layout: FillLayout;
    paint: FillPaint;
  }
  interface LineLayer {
    type: 'line';
    layout: LineLayout;
    paint: LinePaint;
  }
  interface PointLayer {
    type: 'paint';
    layout: PointLayout;
    paint: PointPaint;
  }
  type Layer = FillLayer | LineLayer | PointLayer;

  function drawLayer(layer: Layer) {
    if (layer.type === 'fill') {
        const {paint} = layer;
        //              ^?
        const {layout} = layer;
        //               ^?
    } else if (layer.type === 'line') {
        const {paint} = layer;
        //              ^?
        const {layout} = layer;
        //                  ^?
    } else {
        const {paint} = layer;
        //                  ^?
        const {layout} = layer;
        //                  ^?
    }
  }
}

// 예제1
{
    interface Person {
        name: string;
        birth?: {
            place: string;
            date: Date;
        }
    }

    const alanT: Person = {
        name: 'Alan Turing',
        birth: {
            place: 'London'
            // date 속성은 필수 작성
        }
    }

    function eulogize(p: Person) {
        console.log(p.name);
        const {birth} = p;
        if (birth) {
            console.log(`was born on ${birth.date} in ${birth.place}`);
        }
    }
}

// 예제2: 타입의 구조를 손 댈 수 없는 상황
{
    interface Name {
        name: string;
    }

    interface PersonWithBirth extends Name {
        placeOfBirth: string;
        dateOfBirth: Date;
    }

    type Person = Name | PersonWithBirth;

    function eulogize(p: Person) {
        if ('placeOfBirth' in p) {
            const {dateOfBirth} = p;
            //                    ^?
        }
    }
}
