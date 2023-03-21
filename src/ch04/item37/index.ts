// 타이핑 관점에서는 문제가 없지만 수학적으로 문제
{
  interface Vector2D {
    x: number;
    y: number;
  }

  function calculateNorm(p: Vector2D) {
    return Math.sqrt(p.x * p.x + p.y * p.y);
  }

  calculateNorm({ x: 3, y: 4 });
  const vec3D = { x: 3, y: 4, z: 1 };
  calculateNorm(vec3D);
}

// 상표를 붙여 표기하면 문제 해결
{
    interface Vector2D {
        _brand: '2d';
        x: number;
        y: number;
    }

    function vec2D(x: number, y: number): Vector2D {
        return {x, y, _brand: '2d'};
    }

    function calculateNorm(p: Vector2D) {
        return Math.sqrt(p.x * p.x + p.y * p.y);
    }

    calculateNorm({ x: 3, y: 4 });
    const vec3D = { x: 3, y: 4, z: 1 };
    calculateNorm(vec3D);
}

{
    type AbsolutePath = string & {_brand: 'abs'};
    function listAbsolutePath(path: AbsolutePath) {}
    function isAbsolutePath(path: string): path is AbsolutePath {
        return path.startsWith('/');
    }
    function f(path: string) {
        if (isAbsolutePath(path)) {
            listAbsolutePath(path);
        }
        listAbsolutePath(path);
    }
}

// 이진 검색, 이미 정렬된 상태를 가정하기 때문에 정렬이 안되었을 시 문제 발생
{
    function binarySearch<T>(xs: T[], x: T): boolean {
        let low = 0, high = xs.length - 1;
        while(high >= low) {
            const mid= low + Math.floor((high - low) / 2);
            const v = xs[mid];
            if (v === x) return true;
            [low, high] = x > v ? [mid + 1, high] : [low, mid - 1];
        }
        return false;
    }
}

// 상표 기법을 사용하여 이진 검색
{
    type SortedList<T> = T[] & {_brand: 'sorted'};

    function isSorted<T>(xs: T[]): xs is SortedList<T> {
        for (let i = 1; i<xs.length; i++) {
            if (xs[i] < xs[i-1]) {
                return false;
            }
        }
        return true;
    }

    function binarySearch<T>(xs: T[], x: T): boolean {
      let low = 0,
        high = xs.length - 1;
      while (high >= low) {
        const mid = low + Math.floor((high - low) / 2);
        const v = xs[mid];
        if (v === x) return true;
        [low, high] = x > v ? [mid + 1, high] : [low, mid - 1];
      }
      return false;
    }
}