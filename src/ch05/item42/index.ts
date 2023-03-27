import { Geometry } from "geojson";

function parseYAML(yaml: string): any {}
function safeParseYAML(yaml: string): unknown {
  return parseYAML(yaml);
}
// 제너릭 타입은 타입스크립트에서 좋지 않은 스타일.
// 기능적으로는 동일하지만, unknown을 반환하고 직접 단언문을 사용하거나 원하는 대로 타입을 좁히도록 강제하는 것이 좋다.
function safeParseYAML2<T>(yaml: string): T {
  return parseYAML(yaml);
}

interface Book {
  name: string;
  author: string;
}

const book: Book = parseYAML(`
    name: Wuthering Heights
    author: Emily Bronte
`);
// alert(book.title);
// book('read');

const safeBook = safeParseYAML(`
    name: The Tenant of Wildfelll Hall
    author: Anne Bronte
`);
alert(book.title);
//          ^?
book("read");
//^?

interface Feature {
  id?: string | number;
  geometry: Geometry;
  properties: unknown;
}

function processValue(val: unknown) {
  if (val instanceof Date) {
    val;
    //^?
  }
}

function isBook(val: unknown): val is Book {
  return (
    typeof val === "object" && val !== null && "name" in val && "author" in val
  );
}

function processValue2(val: unknown) {
  if (isBook(val)) {
    val;
    //^?
  }
}

declare const foo: Foo;
let barAny = foo as any as Bar;
let barLink = foo as unknown as Bar;    // unknown 형태가 더 안전
