# 아이템45. devDependencies에 typescript와 @types 추가하기

1. npm(node package manager)은 세 가지 종류의 의존성을 구분해서 관리
    - dependencies: 현재 프로젝트를 실행하는 데 필수적인 라이브러리들이 포함. 전이 의존성.
    - devDependencies: 현재 프로젝트를 개발하고 테스트하는 데 사용되지만, 런타임에는 필요 없는 라이브러리들이 포함. 이 곳에 포함된 라이브러리들은 새로 프로젝트를 설치할 때 제외.
    - peerDependencies: 런타임에 필요하지만, 의존성을 직접 관리하지 않는 라이브러리들이 포함. ex) 플러그인, 리액트 버전 등등

2. 타입스크립트 프로젝트에서 공통적으로 고려해야 할 의존성
    - 타입스크립트 자체 의존성을 고려. 팀원들 모두가 항상 동일한 버전을 설치한다는 보장이 없음. 프로젝트를 셋업할 때 별동의 단계가 추가
    -> devDependencies로 넣는 것이 좋다!
    - 타입 의존성(@types)을 고려. 사용하려는 라이브러리에 타입 선언이 포함되어 있지 않더라도, DefinitelyTyped에서 타입 정보를 얻을 수 있다. 원본 라이브러리 자체가 dependencies에 있더라도 @types 의존성은 devDependencies에 있어야 한다.
    -> ex) npm install react / npm install --save-dev @types/react

3. 타입스크립트를 시스템 레벨로 설치하면 안 된다. 타입스크립트를 프로젝트의 devDependencies에 포함시키고 팀원 모두가 동일한 버전을 사용하도록 해야 한다.

4. @types 의존성은 dependencies가 아니라 devDependencies에 포함시켜야 한다. 런타임에 @types가 필요한 경우라면 별도의 작업이 필요할 수 있다.