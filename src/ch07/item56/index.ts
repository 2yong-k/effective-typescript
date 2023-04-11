// 단순 이름만 private일 시 접근 가능.
{
  class Foo {
    _private = "secret123";
  }

  const f = new Foo();
  f._private;
}

// private으로 선언 시 접근 불가.
// public, protected, private 접근 제어자는 키워드 이기 때문에 컴파일 이후에는 제거.
{
    // TS code
  class Diary {
    private secret = "cheated on my English test";
  }
  const diary = new Diary();
  diary.secret;

  // == JS code
  class DiaryJS {
    constructor() {
      this.secret = "cheated on my English test";
    }
  }
  const diaryJS = new DiaryJS();
  (diary as any).secret;
}

// 클로저 기법 사용
// 주의 사항: passwordHash 외부에서 접근 불가.=> 생성자 내부에 정의해야함
declare function hash(text: string): number;
{
    class PasswordChecker {
        checkPassword: (password: string) => boolean;
        constructor(passwordHash: number) {
            this.checkPassword = (password: string) => {
                return hash(password) === passwordHash;
            }
        }
    }

    const checker = new PasswordChecker(hash('s3cret'));
    checker.checkPassword('s3cret');
}

// 클로저 기법과 다르게 클래스 매서드나 동일한 클래스의 개별 인스턴스끼리는 접근이 가능.
// 비공개 필드를 지원하지 않는 자바스크립트 버전으로 컴파일 시, WeapMap을 사용한 구현으로 대체
{
    class PasswordChecker {
        #passwordHash: number;

        constructor(passwordHash: number) {
            this.#passwordHash = passwordHash;
        }

        checkPassword(password: string) {
            return hash(password) === this.#passwordHash;
        }
    }

    const checker = new PasswordChecker(hash('s3cret'));
    checker.checkPassword('secret'); // false
    checker.checkPassword('s3cret'); // true
}