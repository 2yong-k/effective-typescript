{
    // DO NOT
    function getLengthBad(array: any) {
        return array.length;
    }

    // DO!
    function getLength(array: any[]) {
        return array.length;
    }

    getLengthBad(/123/); // 오류 없음. undefined
    getLength(/123/); // 오류
}

// 매개변수가 객체이지만 값을 알 수 없다면
{
    function hasTwelveLetterKey(o: {[key: string]: any}) {
        for (const key in o) {
            if (key.length === 12) {
                return true;
            }
        }
        return false; 
    }

    function hasTwelveLetterKey1(o: object) {
        for (const key in o) {
            if (key.length === 12) {
                console.log(key, o[key]);
                //                ^?
                return true;
            }
        }
        return false;
    }
}

// 타입에 최소한으로 구체화할 수 있는 방법
{
    type Fn0 = () => any;   // 매개변수 없이 호출
    type Fn1 = (arg: any) => any;   // 매개변수 1개
    type FnN = (...args: any[]) => any; // 모든 개수의 매개변수

    const numArgsBad = (...args: any) => args.length;
    const numArgsGood = (...args: any[]) => args.length;
}