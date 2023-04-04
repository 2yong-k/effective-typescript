/*
    (1분)quiz03. 다음 코드에서 10번째줄 v의 타입을 고르시오.
	1. string | number
	2. any
	3. string
	4. number
-> 답2
*/

interface ABC {
    a: string;
    b: string;
    c: string;
}

function foo(abc: ABC) {
    for (const [k, v] of Object.entries(abc)) {
        k;
        v;
    //  ^?
    }
}