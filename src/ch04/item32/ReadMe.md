# 아이템32. 유니온의 인터페이스보다는 인터페이스의 유니온을 사용하기

1. 유니온 타입의 속성을 여러 개 가지는 인터페이스에서는 속성 간의 관계가 분명하지 않기 때문에 실수가 자주 발생하므로 주의해야 한다.

2. 유니온의 인터페이스보다 인터페이스의 유니온이 더 정확하고 타입스크립트가 이해하기도 좋습니다.

3. 타입스크립트가 제어 흐름을 분석할 수 있도록 태그를 넣는 것을 고려해야 한다. 태그된 유니온은 타입스크립트와 매우 잘 맞기 때문에 자주 볼 수 있는 패턴.