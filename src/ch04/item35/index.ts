import { Feature } from "geojson";

{
  function calculateBoundingBox(f: Feature): BoundingBox | null {
    let box: BoundingBox | null = null;

    const helper = (coords: any[]) => {
      //...
    };

    const { geometry } = f;

    // geometry에는 coordinates 속성이 있지만, GeometryCollection에는 속성이 없다.
    if (geometry) {
      helper(geometry.coordinates);
      //                ^?
    }

    // type을 한번 걸러줌으로써 정상 작동
    if (geometry) {
      if (geometry.type === 'GeometryCollection') {
        throw new Error('GeometryCollections are not supproted');
      }
      helper(geometry.coordinates);
    }

    // 해당 타입을 차단하기보다는 모든 타입을 지원하는 것이 좋은 방향
    const geometryHelper = (g: Geometry) => {
      if (geometry.type === 'GeometryCollection') {
        geometry.geometries.forEach(geometryHelper);
      } else {
        helper(geometry.coordinates);
      }
    }
    if (geometry) {
      geometryHelper(geometry);
    }

    return box;
  }
}
