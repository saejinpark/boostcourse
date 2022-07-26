# 기능 요구사항

-   **첫번째**
    -   HTML5 같은 XML 데이터를 분석해서 요소별로 분리하는 Parser를 구현해야 한다.
    -   아래 예제만 처리하는 파서를 만드는 게 아니라, XML 데이터를 모두 처리할 수 있어야 한다.
-   **두번째**
    -   다음과 같이 element를 찾는 기능을 구현해야 한다.
        -   태그 속성을 비교해서 찾는 `elementByAttribute()`
        -   경로 형태로 지정해서 찾는 `findXPath()`
        -   태그 이름으로 찾는 `elementsByTag()`

# 프로그래밍 요구사항

-   **첫번째**
    -   기존에 구현된 XML 분석을 도와주는 xmldom 나 유사한 라이브러리와 node 모듈을 사용할 수 없으며, 이와 유사한 파싱을 처리해주는 외부 라이브러리를 모두 사용할 수 없다.
    -   정규표현식은 token을 추출하고 분석하기 위한 용도로 사용할 수 있다. (선택사항이라 사용하지 않아도 된다.)
    -   문자열 분석을 위해서 단계별로 역할을 나눠서 처리한다.
    -   tokenizer, lexer, parser 를 처리하는 메서드를 각각 만든다.
    -   함수가 길어지거나 너무 많은 역할을 하지않도록 하위 함수로 나눈다.
    -   태그 중첩을 처리하기 위해서 Stack 동작을 직접 구현해야 한다.
    -   만약 태그가 제대로 닫히지 않으면 stringify() 결과는 "올바른 XML 형식이 아닙니다."를 리턴한다.
-   **두번째**
    1. elementByAttribute 요구사항
       태그의 속성과 값을 비교해서 해당 요소를 찾는 함수를 구현한다.
        > dom.elementByAttribute("lang", value: "ko");  
        > dom.elementByAttribute("id", value: "foo");
    2. elementByTag 요구사항
       태그로 모든 해당 요소를 찾아 배열로 리턴하는 함수를 구현한다.
        > dom.elementsByTag("P");  
        > dom.elementsByTag("IMG");
    3. XPath 요구사항
       경로가 너무 깊어지면 찾기 어렵기 때문에 XPath 라는 형식으로 원하는 요소를 지정할 수 있다.
       예를 들어 XPath가 `/HTML/BODY/P[1]` 라면 HTML 태그 아래 BODY 태그 아래 첫번째 P 태그 요소를 의미한다.
       출력 예제처럼 P 요소가 여러 개일 때 XPath가 `/HTML/BODY/P` 형태로 인덱스가 주어지지 않으면 항상 첫 번째 요소를 의미한다.
    -   단, 태그 대소문자는 구분하지 않아도 된다. HTML 이나 html 은 동일하게 처리한다.

# 나만의 체크포인트

## 첫번째 기능 체크포인트

-   [x] HTML5 같은 XML 데이터를 분석해서 요소별로 분리하는 Parser를 구현.
-   [x] XML 데이터를 모두 처리할 수 있어야 함.

## 첫번째 프로그래밍 체크포인트

-   [x] 외부 라이브러리를 사용하지 않았다.
-   [x] 정규표현식을 token을 추출하고 분석하기 위한 용도로 사용했다.
-   [x] 문자열 분석을 위해 단계별로 역할을 나눠서 처리했다.
-   [x] tokenizer, lexer, parser 를 처리하는 메서드를 각각 만들었다.
-   [x] 함수가 길어지거나 너무 많은 역할을 하지않도록 하위 함수로 나누었다.
-   [x] 태그 중첩을 처리하기 위해서 Stack 동작을 직접 구현했다.
-   [x] 만약 태그가 제대로 닫히지 않으면 stringify() 결과는 "올바른 XML 형식이 아닙니다."를 리턴한다.

## 두번째 기능 체크포인트

-   [x] elementByAttribute() 구현
-   [x] findXPath() 구현
-   [x] elementsByTag() 구현

## 두번째 프로그래밍 체크포인트

-   [x] 태그의 속성과 값을 비교해서 해당 요소를 찾는 함수를 구현했다.
-   [x] 태그로 모든 해당 요소를 찾아 배열로 리턴하는 함수를 구현했다.
-   [x] XPath 라는 형식으로 원하는 요소를 지정할 수 있다.

# Official 체크포인트

-   [x] 다음 항목에 대해 학습하고 스스로 해결했는지 점검하세요.
-   [x] tokenizer 함수 구현 : 문자열 분리
-   [x] lexer 함수 구현 : 토큰 분석
-   [x] parser 함수 구현 : 분석 결과 생성
-   [x] HTML 샘플 페이지 에 포함된 HTML 분석 처리 가능
-   [x] findXPath() 구현
-   [x] 샘플 HTML에서 XPath로 /html/body/p[2]/span 처리
-   [x] 리소스 XML에서 XPath로 /vector/group[2]/path 처리
-   [x] elementByAttribute() 구현
-   [x] elementsByTag() 구현

# 학습메모
>mdn web docs / 정규표현식 : https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Regular_Expressions
>정규식 테스트 사이트 : https://regexr.com/

정규식을 하루종일 연습했다. 문자열 처리에 이제는 자신감이 생긴거 같다.