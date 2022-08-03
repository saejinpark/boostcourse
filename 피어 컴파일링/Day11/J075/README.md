# 체크포인트
## 기능(Path 라이브러리 만들기)
- [X] Unix path 분석
- [X] 윈도우 path 분석
- [X] path에 포함될 수 없는 특수문자가 포함된 경우나 필수적인 항목 없으면 throw 처리

## 기능(Path 단위테스트)
- [X] appendComponent() 구현
- [X] deleteLastComponent() 구현
- [X] relative() 구현
- [X] 단위테스트

## 결과
#### 테스트 결과 -> npm test
- <img width="495" alt="스크린샷 2022-08-02 오전 7 51 07" src="https://user-images.githubusercontent.com/26318372/182258624-563199dc-2421-495e-9676-d43b688aa711.png">

#### 동작 결과 -> node main.js
- UNIX
- <img width="544" alt="스크린샷 2022-08-02 오전 7 51 20" src="https://user-images.githubusercontent.com/26318372/182258635-b5e48270-0b75-473a-af3a-a4757bea8950.png">
- Window
- <img width="535" alt="스크린샷 2022-08-02 오전 7 57 31" src="https://user-images.githubusercontent.com/26318372/182259236-4a541372-5cb4-4b98-b57a-0295d40e163f.png">

- Path 인식, 패턴 분류하는 정규 표현식 만들기 -> 완료(O)
- Unix 스타일 경로 문자열로 Path 분석 후 객체 생성 -> 완료(O)
- Windows 스타일 경로 문자열로 Path 분석 후 객체 생성 -> 완료(O)
- 복수 Path 요소 지원 생성자 구현 -> 완료(O) constructor에 조건 추가
- Path 생성 안되는 경우 예외처리 -> 완료(O) - checkError로 구현
- Path 생성 안되는 경우 예외에 대한 테스트 함수 -> 완료(O)
- Path 부속 필수 요소 접근 : root, base, name, ext, lastDirectory, components -> 완료(O)
- absoluteString 읽기 전용으로 구현 -> 완료(O) - getter로 구현
- Path Components 에 경로 추가 메서드 구현 -> 완료(O)
- Path Components 에 마지막 경로 제거 메서드 구현 -> 완료(O)
- 두 개 Path 상대 경로 비교 relative() 기능 구현 -> 완료(O)
- 다양한 경우의 수를 테스트하는 단위 테스트 함수 10개 이상 구현 -> 완료(O)

# 학습 메모

## 구현 과정
- 테스트 라이브러리 선택
    - Mocha와 Jest에 대해 알아보니 Mocha는 다른 라이브러리 설치를 해야하고 높은 러닝 커브를 가진 반면에, Jest는 단순하고 문서화가 잘 되어있다고 해서 Jest를 사용하기로 결정하였다.
    - Jest가 최근에 많이 쓰이는 추세라고 한다. 
- 테스트 라이브러리 설치
    - Jest 라이브러리를 개발 의존성으로 설치
        - $ npm i -D jest
    - test 스크립트 수정
        - package.json 파일을 열고 test 스크립트를 jest로 수정
        - npm test라고 입력하면 jest 커맨드를 실행할 수 있다.
    - test.js 에서 es6 모듈이 안불러와진다.
        - 해결 완료) https://study-ihl.tistory.com/191
    - test.js 에서 throw error 처리 완료
        - https://stackoverflow.com/questions/46042613/how-to-test-the-type-of-a-thrown-exception-in-jest
    - jest 에서 함수 테스트 완료
        - https://www.daleseo.com/jest-basic/
    

## 메모
- 유닉스 디렉토리 계층 구조
    - 구분자: 디렉토리 분리 문자 / forward slash, Path 요소 구분 : colon
    - ~(홈디렉토리)
        - 현재 사용자 계정의 홈디렉토리
    - .(현재 디렉토리)
        - 현재 사용 중인 디렉터리를 작업 디렉터리(Working directory)
    - /(루트 디렉토리)
        - root 계정의 홈디렉토리로 최상위 디렉토리를 의미, 파일 구분에도 사용
    - 주의사항
        - 파일과 디렉토리 이름에는 알파벳, 숫자, 하이픈(-), 밑줄(_), 점(.)만을 사용한다.
        - 파일과 디렉토리 이름에 공백, *ㅓ, &, |, ", ', 가운데 점, ~, #, $, (, ), \, ;, <, >는 쓰지 않는다.
        - 파일과 디렉토리 이름에 사용하는 알파벳은 대소문자를 구분한다.
        - 파일과 디렉토리 이름이 (.)점으로 시작하면 숨김파일(hidden file)이다.
- 윈도우 디렉토리 계층 구조
    - \\\\
        - 파일 구분에 사용
    - 주의 사항
        - 대소문자 구분 X
        - 다음 문자 빼고 모두 허용
            - <(보다 작음)
            - >(보다 큼)
            - : (콜론)
            - "(큰따옴표)
            - /(슬래시)
            - \(백슬래시)
            - | (세로 막대 또는 파이프)
            - ? (물음표)
            - *(별표)
- 테스트 라이브러리가 왜 필요할까?
    - 실제동작 확인을 위해서 시간이 오래 걸린다.
    - 어떤 테스트가 필요한지, 무엇을 진행했는지 일일히 확인이 필요하다.
    - 재사용이 불가능
    - 사이드이펙트 파악 힘듦
- Assertion이란?
    - 특정 요구사항에 대한 적합성을 위한 조건
    - 필요시 한 요구사항에 대해서 여러개 존재할 수 있음
- Mocha
    - 테스트 러너를 포함한 테스트 프레임워크
    - Assertion, Mocking, Stubbing 등의 라이브러리를 포함하지 않으므로 작동하기 위해서 다른 라이브러리의 설치 및 설정 작업이 필요
    - 비교적 높은 러닝 커브, 유연성 제공
    - Assertion ⇒ Chai, Mocking ⇒ Sinon 라이브러리를 사용하는 게 대표적
- Jest
    - Facebook에 의해 개발된 테스트 프레임워크
    - 잘되어있는 문서화
    - preconfiguration 필요하지 않음 (추가적인 의존성 필요하지 않음)
    - 쉬운 러닝 커브
    - customization 어려울 수 있음

## 학습 키워드
- 왜 윈도우에서만 백슬래시를 경로에 사용할까? - https://onlywis.tistory.com/26
- 유닉스 및 윈도우 디렉토리
- js에서 정규표현식
- 테스트 라이브러리
- 테스트 라이브러리가 왜 필요할까?


## 참고 자료
- 유닉스 디렉토리
    - https://mi-nya.tistory.com/17
    - https://jihooyim1.gitbooks.io/unixbasic/content/contents/03.html
    - http://www.mit.edu/~6.005/fa09/resources/avoid-dependent-code.html
- 윈도우 디렉토리
    - https://docs.microsoft.com/ko-kr/dotnet/standard/io/file-path-formats
    - https://www.howtogeek.com/137096/6-ways-the-linux-file-system-is-different-from-the-windows-file-system/
    - https://docs.microsoft.com/ko-kr/windows/win32/fileio/naming-a-file
- 자바스크립트에서 정규표현식 사용하기
    - https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Regular_Expressions
- js 배열 맨끝요소 접근
    - https://codechacha.com/ko/javascript-get-last-element-in-array/
- js 구분자도 문자열에 포함하기
    - https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/split#regexp%EB%A5%BC_%EC%82%AC%EC%9A%A9%ED%95%B4_%EA%B5%AC%EB%B6%84%EC%9E%90%EB%8F%84_%EA%B2%B0%EA%B3%BC%EC%97%90_%ED%8F%AC%ED%95%A8%ED%95%98%EA%B8%B0
- js 테스트 라이브러리
    - https://velog.io/@binimini/Mocha-vs-Jest-JS-Test-Framework
- jest
    - https://www.daleseo.com/jest-basic/
- jest 에서 ES6 모듈 사용하기
    - https://study-ihl.tistory.com/191