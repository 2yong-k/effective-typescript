function A_getLength(array: any) {
    return array.length;
}

function B_getLength(array: any[]) {
    return array.length;
}

export default {};

/*
    Quiz09. A_getLength보다 B_getLength가 더 좋은 함수인 이유를 고르시오.
    1. 함수 내의 array.length 타입이 체크된다.
    2. 함수의 반환 타입이 any 대신 number로 추론된다.
    3. 함수가 호출될 때 매개변수가 배열인지 체크된다.
    4. 1,2,3번 모두 맞는 이유이다.
*/

/*
    Answer. 4 : 매개변수로 any[]를 사용하기 때문에. A_getLength에서 잡지 못하는 오류를 잡을 수 있다.
                ex) A_getLength(/123/) -> 오류 없이 undefined 반환
*/
