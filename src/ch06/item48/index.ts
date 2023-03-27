// 인사말을 생성합니다. 결과는 보기 좋게 꾸며집니다.
function greet(name: string, title: string) {
    return `Hello ${title} ${name}`;
}

// JSDoc 스타일의 주석으로 만드는 것이 사용자들을 위한 문서이다.
// 함수에 붙어 있는 JSDoc 스타일의 주석을 툴팁으로 표시해주기 때문
/** 인사말을 생성합니다. 결과는 보기 좋게 꾸며집니다. */
function greetJSDoc(name: string, title: string) {
    return `Hello ${title} ${name}`;
}

// JSDoc의 타입 정보 명시하는 규칙 스타일로 작성.
/**
 * 인사말을 생성합니다.
 * @param name 인사할 사람의 이름
 * @param title 그 사람의 칭호
 * @returns 사람이 보기 좋은 형태의 인사말
 */
function greetFullTSDoc(name: string, title: string) {
    return `Hello ${title} ${name}`;
}

// 타입의 정의에 TSDoc 사용
/** 특정 시간과 장소에서 수행된 측정 */
interface Measurement {
    /** 어디서 측정되었나? */
    position: Vector3D;
    /** 언제 측정되었나? epoch에서부터 초 단위로 */
    time: number;
    /** 측정된 운동량 */
    momentum: Vector3D;
}

// TSDoc 주석은 마크다운 형식으로 꾸며지므로 굵은 글씨, 기울임 글씨, 글머리 기호 목록을 사용 가능
/**
 * 이 _interface_는 **세 가지** 속성을 가집니다.
 * 1. x
 * 2. y
 * 3. z
 */
interface Vector3D {
    x: number;
    y: number;
    z: number;
}

// TSDoc에서는 JSDoc에서처럼 타입 정보를 명시하면 안된다. 타입 정보에 코드가 있기 때문