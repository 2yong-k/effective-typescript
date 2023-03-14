// 정상 작동하지만 잘못된 코드. 구조적 타이핑
{
  interface Vector2D {
    x: number;
    y: number;
  }

  interface Vector3D {
    x: number;
    y: number;
    z: number;
  }

  interface NamedVector {
    name: string;
    x: number;
    y: number;
  }

  function calculateLength(v: Vector2D) {
    return Math.sqrt(v.x * v.x + v.y * v.y);
  }

  function calculateLength2(v: Vector3D) {
    let length = 0;
    for (const axis of Object.keys(v)) {
      const coord = v[axis];
      //            ^?
      length += Math.abs(coord);
    }
    return length;
  }

  // 어떤 값이 들어갈지 모르기 때문에 모든 속성을 직접 더하는 것이 낫다.
  function calculateLength3(v: Vector3D) {
    return Math.abs(v.x) + Math.abs(v.y) + Math.abs(v.z);
  }

  // 타입 체커가 잡지 못함
  function normalize(v: Vector3D) {
    const length = calculateLength(v);
    return {
      x: v.x / length,
      y: v.y / length,
      z: v.z / length,
    };
  }

  // 정상 작동, 결과는 5
  const v: NamedVector = { x: 3, y: 4, name: "Zee" };
  calculateLength(v);

  // 정상 작동, NaN을 반환
  const vec3D = { x: 3, y: 4, z: 1, address: "123 Broadway" };
  calculateLength2(vec3D);
}

// 클래스와 관련된 코드. 잘못된 코드
{
    class C {
        foo: string;

        constructor(foo: string) {
            this.foo = foo;
        }
    }

    const c = new C('instance of C');
    // 구조적으로 문제가 없기 때문에 정상 작동
    const d: C = {foo: 'object literal'}
}

{
    interface DB {
        runQuery: (sql: string) => any[];
    }

    interface Author {
        first: string;
        last: string;
    }

    function getAuthors(database: DB): Author[] {
        const authorRows = database.runQuery(`SELECT FIRST, LAST FROM AUTHORS`);
        return authorRows.map(row => ({first: row[0], last: row[1]}));
    }
}