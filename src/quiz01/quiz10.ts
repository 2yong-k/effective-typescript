const A = (array: any[]) => array.length;

const B = (array: any) => array.length;

const C = (...args: any) => args.length;

const D = (...args: any[]) => args.length;

export default {}

/*
    Quiz10. A, B, C, D중 반환 타입이 any인 것을 두 가지 고르시오.
    1. A
    2. B
    3. C
    4. D
*/

/*
    Answer. 2, 3 : 1, 4번은 number를 반환, 2, 3번은 any를 반환
*/
