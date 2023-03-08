{
  // null체크
  const el = document.getElementById("foo");
  //    ^?
  if (!el) {
    // ^?
    throw new Error("Unable to find #foo");
  }
  el;
  //^?
  el.innerHTML = "Party Time";

  // instanceof예시
  function contains(text: string, search: string | RegExp) {
    if (search instanceof RegExp) {
      search;
      //^?
      return !!search.exec(text);
    }
    search;
    //^?
    return text.includes(search);
  }

  // 속성 체크
  interface A {
    a: number;
  }
  interface B {
    b: number;
  }
  function pickAB(ab: A | B) {
    if ("a" in ab) {
      ab;
      //^?
    } else {
      ab;
      //^?
    }
    ab;
    //^?
  }

  // 내장함수 활용
  function containsArray(text: string, terms: string | string[]) {
    const termList = Array.isArray(terms) ? terms : [terms];
    //     ^?
  }

  // typeof 활용
  {
    const el = document.getElementById("foo");
    if (typeof el === "object") {
      //null은 "object"로되기에 제외되지 않는다.
      el;
      //^?
    }
  }

  // 기본형 오류
  function foo(x?: null | string | number) {
    if (!x) {
      // 빈 문자열''과 0은 모두 false로 읽히기 때문에 타입이 좁혀지지 않는다.
      x;
      //^?
    }
  }

  // 명시적 태그 붙이기
  interface UploadEvent {
    type: "upload";
    filename: string;
    contents: string;
  }

  interface DownloadEvent {
    type: "download";
    filename: string;
  }

  type AppEvent = UploadEvent | DownloadEvent;

  function handleEvent(e: AppEvent) {
    switch (e.type) {
      case "download":
        e;
      //^?
      case "upload":
        e;
      //^?
    }
  }

  // 식별을 위한 커스텀 함수, 사용자 정의 타입 가드
  function isInputElement(el: HTMLElement): el is HTMLInputElement {
    return "value" in el;
  }

  function getElementContent(el: HTMLElement) {
    if (isInputElement(el)) {
      el;
      //^?
      return el.value;
    }
    el;
    //^?
    return el.textContent;
  }

  // 사용자 정의 타입 가드
  const jackson5 = ["Jackie", "Tito", "Jermaine", "Marlon", "Michael"];
        //^?
  const members = ["Janet", "Michael"]
    .map((who) =>
      //    ^?
      jackson5.find((n) => n === who)
    );

  const membersWithFilter = ["Janet", "Michael"]
        //^?
    .map((who) => jackson5.find((n) => n === who))
    .filter((who) => who !== undefined); //

  function isDefined<T>(x: T | undefined): x is T {
    return x !== undefined;
  }

  const membersWithIsDefined = ["Janet", "Michael"]
    //  ^?
    .map((who) =>
      //    ^?
      jackson5.find((n) => n === who)
    )
    .filter(isDefined);
}
