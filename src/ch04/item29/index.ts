// 일부 값은 건드리지 않으면서 동시에 다른 값을 설정하도록 모두 선택적으로 만듦
{
    declare function setCamera(camera: CameraOptions): void;
    declare function viewportForBounds(bounds: LngLatBounds): CameraOptions;

  interface CameraOptions {
    center?: LngLat;
    zoom?: number;
    bearing?: number;
    pitch?: number;
  }

  type LngLat =
    | { lng: number; lat: number }
    | { lon: number; lat: number }
    | [number, number];

  type LngLatBounds =
    | { northeast: LngLat; southwest: LngLat }
    | [LngLat, LngLat]
    | [number, number, number, number];

  // 오류 발생: lat, lng 속성이 없고 zoom 속성만 존재하기 때문
  function focusOnFeature(f: Feature) {
    const bounds = calculateBoundingBox(f);
    const camera = viewportForBounds(bounds);
    setCamera(camera);
    const {
      center: { lat, lng },
      zoom,
    } = camera;
    //     ^?
    zoom;
    //^?
    window.location.search = `?v=@${lat},${lng}z${zoom}`;
  }
}

// 느슨한 형태로 선언
{
    declare function setCamera(camera: CameraOptions): void;
    declare function viewportForBounds(bounds: LngLatBounds): CameraOptions;

  interface LngLat {
    lng: number;
    lat: number;
  }

  type LngLatLike = LngLat | { lon: number; lat: number } | [number, number];

  interface Camera {
    center: LngLat;
    zoom: number;
    bearing: number;
    pitch: number;
  }

  // 조건 완화
  interface CameraOptions extends Omit<Partial<Camera>, 'center' {
    center?: LngLatLike;
  }

  type LngLatBounds = {northeast: LngLatLike, southwest: LngLatLike} | [LngLatLike, LngLatLike] | [number, number, number, number];

  function focusOnFeature(f: Feature) {
    const bounds = calculateBoundingBox(f);
    const camera = viewportForBounds(bounds);
    setCamera(camera);
    const {center: {lat, lng}, zoom} = camera;
    //                                     ^?
    zoom;
    //^?
    window.location.search = `?v=@${lat},${lng}z${zoom}`;
  }
}
