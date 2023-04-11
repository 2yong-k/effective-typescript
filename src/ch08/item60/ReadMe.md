# 아이템60. allowJs로 타입스크립트와 자바스크립트 같이 사용하기

1. allowJs 컴파일러 옵션을 통해 타입스크립트와 자바스크립트가 서로 임포트할 수 있게 해준다.
    - npm install --save-dev tsify
    - $ browserify NAME.ts -p [ tsify --allowJs ] > bundle.js

2. 점진적 마이그레이션을 위해 자바스크립트와 타입스크립트를 동시에 사용할 수 있게 allowJs 컴파일러 옵션을 사용하자.

3. 대규모 마이그레이션 작업을 시작하기 전에, 테스트와 빌드 체인에 타입스크립트를 적용해야 한다.