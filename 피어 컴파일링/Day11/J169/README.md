# 실행 방법
```jsx
//라이브러리 설치
npm install

//단위테스트 실행
npm test
```

# 나만의 체크 포인트

- [x] Path 모듈 파일 생성
- [x] path 파싱 시 UNIX/Window 스타일 구분

    ```jsx
    //window는 파일 이름에 \/:*?"<> 가 불가능하므로
    //path에 /가 포함되어 있는 경우 UNIX Path이다.
    if((/\//).test(path)) return "UNIX!"
    ```

- [x] 생성자 구현 : Path 문자열을 매개변수로 받아 여러 개인 경우 분리해서 Path 배열 생성

    <img width="800" alt="path 배열 받기1" src="https://user-images.githubusercontent.com/43336212/182097068-fabb757a-783d-4b17-9718-ddf86c921064.png">

    <img width="550" alt="path 배열 받기2" src="https://user-images.githubusercontent.com/43336212/182097188-9231f470-ca3d-41e8-bdb0-f80a374fee5d.png">

- [x] components 요소 파싱

    ```jsx
    //UNIX 기준 - 대소문자 구분 o
    /(?:^\w*\/)|(?:[^\/]+)/g

    //Windows 기준 - 대소문자 구분 x
    /(?:^\w*\:*\\)|(?:[^\\|\/|:|\*|\?|"|<|>|\||]+)/gi

    ```

    <img width="800" alt="path.components UNIX" src="https://user-images.githubusercontent.com/43336212/182097385-bfb4f282-865f-4f06-b9b1-38c9e83b40cd.png">

    <img width="550" alt="path.components Windows" src="https://user-images.githubusercontent.com/43336212/182097480-9c5dcc4a-f88e-411d-b95e-a754a9b5824a.png">
    
- [x] components를 조합해 absoluteString 요소 생성

    ```jsx
    this.absoulteString = this.components.at(0)+this.components.slice(1).join(this.style.sep);
    ```

    <img width="800" alt="path.components Windows" src="https://user-images.githubusercontent.com/43336212/182100231-85a50e69-3186-4a74-9d77-eca6bfa45316.png">


- [x] root 요소 파싱
- [x] base 요소 파싱
- [x] name 요소 파싱
- [x] ext 요소 파싱
- [x] lastDirectory 요소 파싱

    <img width="600" alt="path요소 파싱" src="https://user-images.githubusercontent.com/43336212/182109396-c19494f9-4cdb-4889-9c0d-f5a9ec825cac.png">

- [x] 파싱 시 정규표현식 사용
- [x] throw 처리 
    
    ```
    *파일 이름에 포함 불가능한 문자
    윈도우  \ / : * ? " < > |
    유닉스 / (문자 _ - . 만 가능)

    *예약되어 있는 파일 이름
    윈도우
    CON, PRN, AUX, NUL
    COM1, COM2, COM3, COM4, COM5, COM6, COM7, COM8, COM9
    LPT1, LPT2, LPT3, LPT4, LPT5, LPT6, LPT7, LPT8, LPT9

    유닉스
    ., ..

    *확장자
    확장자는 영문의 경우 0자부터 3자까지 사용할 수 있으며 한글은 1자만 사용 가능합니다.

    *다른 규칙
    윈도우: 파일 이름은 공백이나 점으로 끝날 수 없음. (> 파일 이름은 공백과 점으로만 이루어질 수 없음.) (공백은 자동 trim)
    유닉스: 파일 이름은 hypen(-)으로 시작할 수 없음.

    ```

    ```jsx
    //Windows
    error: (/(?:[\\|\/|:|\*|\?|"|<|>|\||])|(?:^(CON|PRN|AUX|NUL|COM1|COM2|COM3|COM4|COM5|COM6|COM7|COM8|COM9|LPT1|LPT2|LPT3|LPT4|LPT5|LPT6|LPT7|LPT8|LPT9)$)|(?:\.$)/i)},

    //UNIX
    error: (/(?:^(\.{1,2})$)|(?:[^\w\-.])/)
    ```

    <img width="600" alt="Error throw" src="https://user-images.githubusercontent.com/43336212/182119136-bcd9e856-ad07-4ebe-820e-f40b99f11be3.png">

- [x] path.absoluteString은 읽기만 가능
- [x] appendConent() 구현
- [x] deleteLastComponent() 구현
- [x] relative() 구현
- [x] 단위 테스트 라이브러리 설치
- [x] 테스트 코드 작성
- [x] 단위 테스트 함수 10개 이상 구현(Path 생성 안되는 경우 예외에 대한 테스트 함수 포함)

# 학습 메모
중첩 객체 deep freeze https://ui.toast.com/weekly-pick/ko_20220420

리눅스 파일 이름 규칙 https://study.com/academy/lesson/file-names-commands-file-contents-in-linux.html