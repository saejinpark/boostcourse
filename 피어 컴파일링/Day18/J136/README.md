# CSV기반 데이터베이스

```shell
실행방법
$ node main.js
```



- [x] CREATE TABLE 구현 및 출력
- [x] CSV 파일 생성 및 저장
- [x] INSERT INTO 구현 및 출력
- [x] DELETE FROM 구현 및 출력
- [x] UPDATE 구현 및 출력
- [x] SELECT FROM 구현 및 출력
- [x] DROP TABLE 구현 및 출력
- [x] REPORT TABLE 구현 및 출력
- [x] EXPORT 구현 및 출력
- [x] IMPORT 구현 및 출력
- [x] 정상 동작을 구현한 구문에 대해서 실패에 대한 예외 처리 지원여부

## 나만의체크포인트

- [x] CREATE TABLE
  - [x] 테이블 이름과 동일한 CSV 파일 생성
  - [x] Numeric, String 지원
  - [x] 컬럼 1~9개
  - [x] Numeric 타입 id 컬럼
  - [x] 띄어쓰기 지원 x
  - [x] id는 컬럼이름 사용 x
  - [x] not null 이 기본
  - [x] 이미 있는 파일 생성 불가 > 오류 메세지 반환
- [x] INSERT INTO
  - [x] not null 이 기본
  - [x] 컬럼 갯수 일치 x > 오류 메세지 반환
  - [x] id값 INSERT 시 +1
  - [x] 문자열은 `''`가 있어야 함
  - [x] 성공시 레코드 전체 값 출력
- [x] DELETE FROM
  - [x] 컬럼 중 1개만 조건으로 사용가능
  - [x] 조건에 맞는 레코드 x >  오류 메세지 반환
  - [x] 성공 시 삭제한 레코드 출력
- [x] UPDATE
  - [x] 컬럼 중 1개만 조건으로 사용가능
  - [x] 조건에 맞는 레코드 x > 오류 메세지 반환
  - [x] 성공 시 변경한 레코드 출력
- [x] SELECT FROM
  - [x] 컬럼 중 1개만 조건으로 사용가능
  - [x] `=`으로 값 검색
  - [x] 레코드 갯수 표시
  - [x] 조건에 맞는 모든 레코드 출력
- [x] DROP TABLE
  - [x] 테이블 이름으로 CSV파일 삭제



## 학습메모

fs

https://any-ting.tistory.com/21