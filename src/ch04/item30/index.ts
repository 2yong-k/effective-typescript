{
  /**
   * 전경색(foreground) 문자열을 반환합니다.
   * 0개 또는 1개의 매개변수를 받습니다.
   * 매개변수가 없을 때는 표준 전경색을 반환합니다.
   * 매개변수가 있을 때는 특정 페이지의 전경색을 반환합니다.
   */
  /** 주석과 코드가 다른 문제
   * 1. 함수가 string 형태의 색깔을 반환한다고 적혀있지만 실제로는 {r, g, b} 객체를 반환
   * 2. 주석에는 함수가 0개 혹은 1개의 매개변수를 받는다고 설명하고 있지만, 타입 시그니처만 보아도 명확
   * 3. 불필요하게 장황. 함수 선언과 구현체보다 주석이 길다.
   */
  function getForegroundColor(page?: string) {
    return page === "login" ? { r: 127, g: 127, b: 127 } : { r: 0, g: 0, b: 0 };
  }
}

{
    // 주석보다 간결하게 코드로 표현하는 것이 나은 방법
    // 함수: 애플리케이션 또는 특정 페이지의 전경색을 가져오기
    // 특정 매개 변수 설명하고 싶을 때는 JSDoc의 @param 구문 사용
    function getForegroundColor(page?: string): Color {
        // ...
    }

    // 잘못된 주석의 예 : "nums를 변경하지 않습니다." => readonly 사용
    function sort(nums: number[]) {
        // ...
    }

    // readonly 사용
    function sortImp(nums: readonly number[]) {
        // ...
    }
}