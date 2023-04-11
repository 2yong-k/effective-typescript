{
 // CommonJS
 // a.js
 const b = require('./b')   ;
 console.log(b.name);

 // b.js
 const name = 'Module B';
 module.exports = {name};
}

{
    // ECMAScript module
    // a.ts
    import * as b from './b';
    console.log(b.name);

    // b.ts
    export const name = 'Module B';
}

// 프로토타입 기반 객체
{
    function Person(first, last) {
        this.first = first;
        this.last = last;
    }

    Person.prototype.getName = function () {
        return this.first + ' ' + this.last;
    }

    const marie = new Person('Marie', 'Curie');
    const personNmae = marie.getName();
}

// 클래스 기반 객체
{
    class Person {
        first: string;
        last: string;

        constructor(first: string, last: string) {
            this.first = first;
            this.last = last;
        }

        getName() {
            return this.first + ' ' + this.last;
        }
    }

    const marie = new Person('Marie', 'Curie');
    const personName = marie.getName();
}

// 스코프 문제가 존재하는 코드
{
    // 함수 중첩
    function foo() {
        bar();
        function bar() {
            console.log('hello');
        }
    }

    // 함수 표현식으로 사용
    function foo2() {
        const bar = () => {
            console.log('hello');
        }
        bar();
    }
}

// for 루프문 대신 for-of 또는 배열 메서드 사용
{
    // 일반 for 루프문
    for (var i=0; i<array.length; i++) {
        const el = array[i];
        // ...
    }

    // for-of 문
    for (const el of array) {
        // ...
    }

    // for-of문에서 인덱스 변수 사용하려면 forEach 메서드
    array.forEach((el, i) => {
        // ...
    })

    // for-in문은 사용하지 않는 것이 좋다.
}

// 함수 표현식 대신 화살표 함수 사용
{
    class Foo {
        method() {
            console.log(this);
            [1, 2].forEach(function(i) {
                console.log(this);
            })
        }
    }
    const f = new Foo();
    f.method();
    // strict 모드에서 Foo, undefined, undefined 출력
    // non-strict 모드에서 Foo, window, window (!)를 출력

    class Foo2 {
        method() {
            console.log(this);
            [1, 2].forEach(i => {
                console.log(this)
            })
        }
    }
    const f = new Foo2();
    f.method();
    // 항상 Foo2, Foo2, Foo2 출력
}

// 단축 객체 표현과 구조 분해 할당 사용
{
    const x = 1, y = 2, z = 3;
    const pt = {
        x: x,
        y: y,
        z: z
    };

    // 변수와 객체 속성의 이름이 같다면, 간단하게 작성 가능
    const x2 = 1, y2 = 2, z2 = 3;
    const pt2 = {x2, y2, z2};

    ['A', 'B', 'C'].map((char, idx) => ({char, idx}));

    const obj = {
        onClickLong: function(e) {
            //...
        },
        onClickCompact(e) {
            //...
        }
    }

    // 객체 구조 분해 사용
    // 11111 - 기본
    const props = obj.props;
    const a = porps.a;
    const b = props.b;

    // 22222 - 객체 구조 분해
    const {propps} = obj;
    const {a, b} = props;

    // 33333 - 극단적 객체 구조 분해, props는 변수 아님.
    const {props: {a, b}} = obj;

    // 44444 - 객체 구조 분해 후 기본 값 지정
    let {a} = obj.props;
    if (a === undefined) a = 'default';

    // 55555 - 객체 구조 분해 내에서 기본값 지정
    const {a = 'default'} = obj.props;

    // ex) 배열에서 구조 분해 문법 사용
    const point = [1, 2, 3];
    const [x, y, z] = point;
    const [, a, b] = point; // 첫 요소 무시

    // ex) 함수 매개변수에 구조 분해 문법 사용
    const point = [
        [1, 2, 3],
        [4, 5, 6],
    ]
    point.forEach(([x, y, z]) => console.log(x+y+z));
    // 6, 15 출력
}

// 함수 매개변수 기본값 사용
{
    function log2(a, b) {
        console.log(a, b);
    }
    log2();
    // undefined, undefined 출력

    // 옛날 자바스크립트는 함수 내부에 기본값 직접 할당.
    function parseNum(str, base) {
        base = base || 10;
        return parseInt(str, base);
    }

    // 모던 자바스크립트는 매개변수에 기본값 할당
    function parseNum2(str, base=10) {
        return parseInt(str, base);
    }
}

// 프로미스나 콜백 대신 async / awiat 사용
{
    function getJSON(url: string) {
        return fetch(url).then(response => response.json());
    }
    function getJSONCallback(url: string, cb: (result: unknown) => void) {
        // ...
    }

    async function getJSON(url: string) {
        const response = await fetch(url);
        return response.json();
    }
}

// 연관 배열에 객체 대신 Map과 Set 사용
{
    function countWords(text: string) {
        const counts: {[word: stinrg]: number} = {};
        for (const word of text.split(/[\s,.]+/)) {
            const[word] = 1 + (counts[word] || 0);
        }
        return counts;
    }

    console.log(countWords('Objects have a constructor'));
    // {
    //     Objects: 1,
    //     have: 1,
    //     a: 1,
    //     constructir: "1function Object() { [native code] }"
    // }

    function countWordsMap(text: string) {
        const counts = new Map<string, number>();
        for (const word of text.split(/[\s,.]+/)) {
            consts.set(word, 1 + (counts.get(word) || 0));
        }
        return counts;
    }
}

// TS에 use strict 넣지 않기
{
    'use strict';
    function foo() {
        x = 10; // strict 모드에서는 오류, non-strict 모드에서는 전역 선언
    }
}