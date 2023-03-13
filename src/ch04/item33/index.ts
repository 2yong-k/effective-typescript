// string 타입을 좁히지 않은 경우
{
  interface Album {
    artist: string;
    title: string;
    releaseDate: string; // YYYY-MM-DD
    recordingType: string; // "live" or "studio" ...
  }

  const kindOfBlue: Album = {
    artist: "Miles Davis",
    title: "Kind of Blue",
    releaseDate: "August 17th, 1959", // 날짜 형식이 다름
    recordingType: "Studio", // 시작이 대문자로 오타
  };

  function recordRelease(title: string, date: string) {
    // ...
  }

  // 매개변수 순서가 바뀌어도 오류 체크 불가.
  recordRelease(kindOfBlue.releaseDate, kindOfBlue.title);
}

// string 타입을 좁힌 경우
{
  // 이 녹음은 어떤 환경에서 이루어졌는지?
  type RecordingType = "studio" | "live";

  interface Album {
    artist: string;
    title: string;
    releaseDate: Date;
    recordingType: RecordingType;
  }

  const kindOfBlue: Album = {
    artist: "Miles Davis",
    title: "Kind if Blue",
    releaseDate: new Date("August 17th, 1959"),
    recordingType: "Studio",
    // ^?
  };

  // 매개 변수의 타입을 string 대신 RecordingType으로
  function getAlbumsOfType(recordingType: RecordingType): Album[] {
    // ...
  }

  // 제너릭 타입, 매개 변수 타입, 리턴 타입 도입
  function pluck<T, K extends keyof T>(records: T[], key: K): T[K][] {
    return records.map((r) => r[key]);
    //                        ^?
  }

  pluck(albums, "artist");
  pluck(albums, "title");
  pluck(albums, "releaseDate");
  pluck(albums, "recordingType");
}
