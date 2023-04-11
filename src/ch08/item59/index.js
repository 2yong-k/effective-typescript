// @ts-check 지시자 사용법
{
    // @ts-check
    const person = {first: 'Grace', last: 'Hopper'};
    2 * person.first // string으로 추론되어 타입 불일치 오류
}

// 선언되지 않은 전역 변수
{
    // @ts-check
    console.log(user.firstName);

    // @ts-check
    /// <reference path"./types.d.ts" />
    console.log(user.firstName);
}

// types.d.ts
{
    interface UserData {
        firstName: string;
        lastName: string;
    }
    declare let user: UserData;
}

// @types/jquery 사용
{
    // @ts-check
    $('#graph').style({'width': '100px', 'height': '100px'});

    // @ts-check
    // + @types/jquery 사용
    $('#graph').css({'width': '100px', 'height': '100px'});
}

// DOM 문제 - JSDoc 사용
{   
    // @ts-check
    const ageEl = document.getElementById('age');
    ageEl.value = '12';

    // @ts-check
    const ageEl2 = /** @type {HTMLInputElement} */ (document.getElementById('age'));
    ageEl2.value = '12'; // 정상
}

// 부정확한 JSDoc
{
    // @ts-check
    /**
     * 엘리먼트의 크기(픽셀 단위)를 가져 옵니다.
     * @param {Node} el 해당 엘리먼트
     * @return {{w: number, h: number}} 크기
     */
    function getSize(el) {
        const bounds = el.getBoundingClientRect(); // DOM 타입 불이치
        return {width: bounds.width, height: bounds.height}; // JSDoc return 타입 불일치
    }
}
