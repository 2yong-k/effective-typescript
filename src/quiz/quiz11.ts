function shallowObjectEqual1<T extends string>(a: T, b: T): boolean {
  for (const [k, aVal] of Object.entries(a)) {
    if (!(k in b) || aVal !== (b as string)[k]) {
      //                     ~~~~~~
      // error message:
      // 'string' 형식의 식을 '{}' 인덱스 형식에 사용할 수 없으므로 요소에 암시적으로 'any' 형식이 있습니다.
      // '{}' 형식에서 'string' 형식의 매개 변수가 포함된 인덱스 시그니처를 찾을 수 없습니다.
      return false;
    }
  }
  return Object.keys(a).length === Object.keys(b).length;
}

export default {};

/*
    Quiz11. 아래 코드의 3번째 줄 b[k]에서 오류가 발생합니다. 알맞게 고쳐주세요.
    1. (b as string)[k] -> object 때문
    2. (b as unknown)[k]
    3. (b as any)[k]
    4. (b as object)[k]
*/

/*
    Answer. 3 : 실제 오류가 아니지만 타입스크립트 문맥 활용 능력 부족으로
    (b as any)[k]로 고쳐야 한다.
*/
