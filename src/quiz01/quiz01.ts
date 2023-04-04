import { Feature, Geometry } from "geojson";

interface BoundingBox {
  lat: [number, number];
  lng: [number, number];
}
declare let f: Feature;
function helper(coordinates: any[]) {}
const { geometry } = f;


const geometryHelper = (g: Geometry) => {
  if (geometry.type === "GeometryCollection") {
    geometry.geometries.forEach(geometryHelper)
  } else {
    helper(geometry.coordinates);
  }
};


if (geometry) {
    geometryHelper(geometry);
}

export default {};

/*
    Quiz01. 다음 코드는 geometry.coordinates의 모든 타입을 지원할 수 있다.
    1. O
    2. X
*/

/*
    Answer. O : GeometryCollection 타입의 조건을 분기해서 헬퍼 함수를 호출
*/