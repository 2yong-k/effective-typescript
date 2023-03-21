function somethingDangerous() {}

let val: any = null;
val;
//^? 1111111111
try {
  somethingDangerous();
  val = 12;
  val;
  //^? 2222222222
} catch (e) {
  console.warn("!!");
}
val;
//^? 3333333333

export default {};

/*
    Quiz13. 다음 4, 9, 14번째줄 중에 val의 타입이 number인 부분을 찾아주세요.
    1. 1번
    2. 2번
    3. 3번
    4. 없다.
*/

/*
    Answer. 4 : 맨처음에 any로 선언했으므로 모든 곳이 any가 된다.
*/
