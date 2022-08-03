# I. 나만의 체크포인트

## 1. 실행 방법

이 리포 폴더 안에 다른 폴더를 만들어 테스트 한다.

예를 들어, `foo` 폴더를 테스트하기 위해, 안에 `foo` 디렉토리를 먼저 만들고, `node mit init foo`로 초기화한다.

이후 아래 커맨드를 참고하여 안에 파일을 추가하거나 수정하며 커밋한다. (삭제를 커밋하는 경우는 구현하지 않았다.)

### 커맨드

실행은 다음과 같이 한다.

- `node mit init <directory>`: mit 리포 초기화

- `node mit commit <directory>`: 커밋

- `node mit log <directory>`: 로그

- `node mit restore <hash>`: `<hash>`로 되돌리기

- `node mit` 또는 `node mit --help`: 위와 같은 도움말 출력

## 2. 설계

- 먼저, Mit 구현 클래스를 만든다.

- 요구 사항에 필요한 메소드를 구현한다. (`init()`, `commit()`, `log()` `restore()`)

- 콘솔 명령을 지원하기 위해 콘솔 입출력을 위한 클래스를 별도로 만든다.

- 삭제를 커밋하는 경우는 고려하지 않았다.

## 3. 아쉬운 점

한 클래스 안에 너무 많은 메소드를 넣었다.

커밋이나 되돌리기를 할때 다른 저수준의 기능이 많이 필요했는데,

이러한 메소드를 처음 설계 때부터 묶어서 다른 클래스에 만들어 구분을 시키는 것이 더 나았을 것 같다.

## 3. 소스 저장 오브젝트

- [x] Git의 내부 동작 원리를 공부해본다.

    - Day 01 이후 Git에 대해 정리해둔게 있으니 이것을 참고하고, 다른 
    자료도 찾아본다.

- [x] 파일 입출력 시 압축 처리를 알아서 하는 클래스 `FilIO`를 만든다.

    - `read()`: 읽을 때 압축을 푼 문자열을 리턴한다.

    - `write()`: 문자열을 받고 압축하여 파일에 쓴다.

- [x] `Mit` 클래스를 만든다. `init()` 메소드를 만든다. (결과를 캡쳐한다.)

    아래처럼 성공적으로 리포가 생성되었다.

    ![init-ok-1](https://user-images.githubusercontent.com/89635107/182332172-a1489b9b-805b-42d0-bf78-d851024aaf69.png)

    ![init-ok-2](https://user-images.githubusercontent.com/89635107/182332176-e62f1d81-be03-4a04-bf70-acfd1903b7b4.png)

- [x] 위와 같이 `commit()` 메소드를 만든다.

- [x] 위와 같이 `log()` 메소드를 만든다.

    아래는 초기화부터 커밋, 로그까지의 구현 결과이다.

    ![commit-log-ok](https://user-images.githubusercontent.com/89635107/182406417-870051b7-45ca-4335-bbac-3ee96cd59c11.png)

- [x] 위와 같이 `restore()` 메소드를 만든다.

    아래는 파일 내용을 `foo`로 커밋하고, `bar`로 커밋했다가, 되돌아가서 내용이 `foo`임을 확인하는 테스트이다.

    ![restore-ok](https://user-images.githubusercontent.com/89635107/182432810-72df0f9a-c7bf-434e-911d-71f687aa3364.png)

- [x] 콘솔 입출력을 지원하는 모듈을 만든다.

# II. 학습 메모

## git의 압축 알고리즘

zlib의 deflate 방식을 사용

https://git-scm.com/book/en/v2/Git-Internals-Git-Objects

## 예전에 정리했던 것

1일차에 깃의 내부 동작을 정리했었는데 많이 도움이 되었다.

https://wcho-boostcamp-notes.notion.site/Git-add-commit-Day-01-d2de06b157954efe9c9cc7c6b3b0bd7b

## 해시값 얻기

`crypto` 모듈을 이용하자.

```
const hash = crypto.createHash('sha256').update(input).digest('hex');
```

https://stackoverflow.com/a/27970509