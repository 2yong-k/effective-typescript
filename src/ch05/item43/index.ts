window.monkey = "Tamarin";
document.monkey = "Howler";
const el = document.getElementById("colobus");
el.home = "tree";

// any 단언문 사용. but, any를 사용함으로써 타입 안전성을 상실하고, 언어 서비스를 사용할 수 없게 된다는 것.
(document as any).monkey = "Tamarin"; // 정상
(document as any).monky = "Tamarin"; // 정상, 오타
(document as any).monkey = /Tamarin/; // 정상, 잘못된 타입

// 최선의 해결책: document 또는 DOM으로부터 데이터를 분리하는 것.
// 데이터를 분리할 수 없는 경우. 차선책 2가지 존재.

// 차선책 1: interface의 특수 기능 중 하나인 보강을 사용하는 것.
export {};
declare global {
  interface Document {
    monkey: string;
  }
}
document.monkey = "Tamarin";

// 차선책 2: 더 구체적인 타입 단언문 사용
interface MonkeyDocument extends Document {
    monkey: string;
}
(document as MonkeyDocument).monkey = "Macaque";