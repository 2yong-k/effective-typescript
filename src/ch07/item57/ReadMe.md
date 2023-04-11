# 아이템57. 소스맵을 사용하여 타입스크립트 디버깅하기

1. 타입스크립트 코드 -> 타입스크립트 컴파일러 + minifier(압축기) + preprocessor(전처리기) -> 자바스크립트 코드 -> 디버거 런타임에 동작(but, 변환된 코드는 복잡해 디버깅 하기 어려움) -> 소스맵(source map)을 이용해 변환된 코드의 위치와 심벌들로 매핑

2. 소스맵
    - 타입스크립트와 함께 번들러나 압축기를 사용하고 있다면, 번들러나 압축기가 각자의 소스맵을 생성하게 된다. 이상적인 디버깅 환경이 되려면 생성된 자바스크립트가 아닌 원본 타입스크립트 소스로 매핑되도록 해야 한다. 번들러가 기본적으로 타입스크립트를 지원한다면 별도 설정 없이 잘 동작해야 한다. 그렇지 않다면 번들러가 소스맵을 인식할 수 있도록 추가적인 설정이 필요.
    - 상용 환경에 소스맵이 유출되고 있는지 확인해야 한다. 디버거를 열지 않는 이상은 소스맵이 로드되지 않으므로, 실제 사용자에게 성능 저하는 발생하지 않는다. 그러나 소스맵에 원본 코드의 인라인 복사본이 포함되어 있다면 공개해서는 안 될 내용이 들어 있을 수 있다. 저질 주석이나 내부 버그 추적을 위한 URL을 공개할 필요는 없다.
    - NodeJS 프로그램의 디버깅에도 소스맵을 사용할 수 있다. 편집기가 자동 인식하거나 NodeJS 프로세스를 브라우저 디버거와 연결하면 된다.
    - 타입 체커가 코드 실행 전에 많은 오류를 잡을 수 있지만, 디버거를 대체할 수 없으므로 소스맵을 사용하여 제대로 된 타입스크립트 디버깅 환경을 구축해야 한다.

3. 원본 코드가 아닌 변환된 자바스크립트 코드를 디버깅하지 말자. 소스맵을 사용해서 런타임에 타입스크립트 코드를 디버깅하자.

4. 소스맵이 최종적으로 변환된 코드에 완전히 매핑되었는지 확인하자

5. 소스맵에 원본 코드가 그대로 포함되도록 설정되어 있을 수 있다. 공개되지 않도록 설정을 확인하자.