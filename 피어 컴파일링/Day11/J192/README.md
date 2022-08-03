# I. 나만의 체크포인트

## 1. 실행 방법

### 설치

`npm -D install jest`로 Jest를 설치한다.

`package.json` 파일 중 아래 처럼 내용을 수정한다.

```json
{
    "scripts": {
        "test": "jest"
    }
}
```

### 실행

`npm test`로 테스트한다.

`path-parser.test.js` 파일 하나만 테스트하고 싶다면 `npm test -- path-parser.test`로 테스트한다.

## 2. 설계

다음 두 가지 클래스를 만든다.

- `Path`: 문제의 요구사항을 반영한 클래스이다. `root`, `base`, `name` 등의 필드를 갖고 있다.

- `PathParser`: 문자열을 입력 받아 배열로 파싱 결과를 리턴한다.

    - 이때 결과 객체를 `PathParseResult` 클래스로 리턴한다.

## 3. TODO

- [x] `PathParser` 클래스를 구현한다.

    - Unix, Windows 스타일 둘 다 지원한다.

    - 한글, 공백 문자를 지원한다.

    - 사용할 수 없는 문자를 쓰는 등, 유효하지 않은 경로는 예외를 던진다.

    - 구현에 정규 표현식을 사용한다.

    - 여러개의 경로에 대해 배열을 리턴한다. (하나의 경로라도 배열로 리턴하여 구현)

    - 유닛 테스트에 Jest를 사용한다.

    - **Note**: 가상머신 리눅스에서 확인해본 아래 결과와 동일하게 구현한다.

        - 리눅스에서는 파일 이름에 백슬래시를 포함할 수 있다.

            ![linux-backslash-ex](https://user-images.githubusercontent.com/89635107/182166627-4036f9ab-e38c-4167-bd8e-d49263c41d37.png)

        - 리눅스에서는 상위 폴더로 필요 이상만큼 접근해도 루트 폴더이다.

            ![linux-go-up-ex](https://user-images.githubusercontent.com/89635107/182166634-10602a36-63a6-4a0d-b29c-924df04b132e.png)
    
    - **Note**: 윈도우에서 확인해본 아래 결과와 동일하게 구현한다.

        - 윈도우에서도 상위 폴더로 필요 이상 접근해도 루트 드라이버로 이동한다.

            ![windows-go-up-ex](https://user-images.githubusercontent.com/89635107/182168089-426f9d78-9cc4-476f-8316-61a23c9ee58d.png)

    - 구현 및 테스트 결과를 캡쳐한다.

        ```javascript
        const winPathFormat = /^([a-zA-Z]:)?\\([^\\;]+\\)*([^\\;]+)$/;
        const unixPathFormat = /^(\/[^\/:]+)+$/;
        ```

    위 코드로 경로를 인식하는 정규표현식을 만들었다. (`:`이나 `;`으로 구분된 각각의 경로에 대해 사용)

    ![jest-path-parser-ok](https://user-images.githubusercontent.com/89635107/182140823-f358020e-3deb-4ec0-9056-73a097aaae16.png)

    성공 케이스와 예외 발생 케이스에 대해 Jest로 유닛 테스트를 하였다.

- [x] `Path` 클래스를 구현한다.

    - 유닛 테스트에 Jest를 사용하고, 구현 시 테스트 결과를 캡쳐한다.

    - 요구사항의 필드를 구현한다. (`root`, `base`, `name` 등)

        ![jest-path-ok](https://user-images.githubusercontent.com/89635107/182168533-097898d2-8936-43f3-943f-e98096de5ebe.png)

    성공 케이스와 예외 케이스 모두 테스트하였다.

    - 요구사항인 `appendComponents()`, `deleteLastComponents()`, `relative()` 메소드를 구현한다.

        ![jest-methods-ok](https://user-images.githubusercontent.com/89635107/182182478-9fad071b-8332-4031-9e30-ee558519f3b9.png)

    성공 케이스와 예외 케이스 모두 테스트하였다.

# 2. 학습 메모

## Windows 디렉토리 이름 규칙

https://docs.microsoft.com/en-us/windows/win32/fileio/naming-a-file#naming-conventions

## Jest에서 예외 매처를 사용할 때

Note: the function that throws an exception needs to be invoked within a wrapping function otherwise the toThrow assertion will fail.

https://jestjs.io/docs/using-matchers#exceptions

## Jest에서 반복 테스트를 진행할때

`test.each()` 사용하자.

https://jestjs.io/docs/api#testeachtablename-fn-timeout