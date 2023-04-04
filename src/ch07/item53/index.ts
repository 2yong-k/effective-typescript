// 열거형
// 문제점1: 숫자 열거형에 미리 정의해놓은 숫자 외의 다른 숫자가 할당되면 매우 위험.
// 문제점2: 상수 열거형은 보통의 열거형과 달리 런타임에 완전히 제거된다. ex) Flavor.CHOCOLATE -> 0
// 문제점3: preserveConstEums 플래그 설정 시, 상수 열거형은 보통 열거형과 같이 런타임 코드에 정보 유지

import { StyledInterface } from "styled-components";

// 문제점4: 문자열 열거형은 런타임의 타입 안전성과 투명성을 제공한다.
{
    enum Flavor {
        VANILLA = 'vanilla',
        CHOCOLATE = 'chocolate',
        STRAWBERRY = 'strawberry',
    }
    
    let flavor = Flavor.CHOCOLATE;
    //  ^?
    Flavor;
    Flavor[0];

    function scoop(flavor: Flavor) {}
    scoop('vanilla');
    scoop(Flavor.VANILLA);
}

// 열거형 대신 리터럴 타입의 유니온을 사용
{
    type Flavor = 'vanilla' | 'chocolate' | 'strawberry';

    let flavor: Flavor = 'chocolate';
    flavor = 'mint chip';
}

// 매개변수 속성
// 문제점1: 타입스크립트 컴파일은 타입 제거가 이루어지므로 코드가 줄어들지만, 매개변수 속성은 코드가 늘어나는 문법
// 문제점2: 매개변수 속성이 런타임에는 실제로 사용되지만, 타입스크립트 관점에서는 사용되지 않는 것처럼 보인다.
// 문제점3: 매개변수 속성과 일반 속성을 섞어서 사용하면 클래스의 설계가 혼란스러워진다.
{
    // normal
    class Person {
        name: string;
        constructor(name: string) {
            this.name = name;
        }
    }

    // ts with 매개변수 속성(public name) 사용
    class PersonTS {
        constructor(public name: string) {}
    }

    // 문제점들에 대한 예시. 
    class PersonWithProblem {
        first: string;
        last : string;
        constructor(public name: string) {
            [this.first, this.last] = name.split(' ');
        }
    }
}

// 네임스페이스와 트리플 슬래시 임포트
{
    namespace foo {
        function bar() {}
    }

    foo.bar();
}

// 데코레이터
// 사용시 tsconfig.json에 experimentalDecorators 속성을 설정해야 함.
{
    class Greeter {
        greeting: string;
        constructor(message: string) {
            this.greeting = message;
        }
        @logged
        greet() {
            return "Hello, " + this.greeting;
        }
    }

    function logged(target: any, name: string, descriptor: PropertyDescriptor) {
        const fn = target[name];
        descriptor.value = function() {
            console.log(`Calling ${name}`);
            return fn.apply(this, arguments);
        };
    }

    console.log(new Greeter('Dave').greet());
}