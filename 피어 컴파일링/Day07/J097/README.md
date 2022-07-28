## 테스트 방법

### 설치

```bash
npm install
```

### 실행

```bash
npm run start
```

### 사전 제작된 시나리오 테스트

```bash
Get-Content test.txt | npm run start # 윈도우
cat test.txt | npm run start # 리눅스
```

## 파일 구조

![image](https://user-images.githubusercontent.com/57206558/181135385-40007f87-4183-467c-aa13-c0f909c02bfc.png)


- [main.js](#file-main-js) : 사용자 애플리케이션
- [interface.mjs](#file-interface-mjs) : 사용자-보드 중간 클래스
  - class Interface
    - property
      - board : 인터페이스에 할당된 체스 보드
      - turn : 누구의 차례인지 관리
      - message : 추가로 출력해야 하는 알림을 저장
    - method
      - commnad(line) : 입력받은 문자열 명령어를 실행, 추가 출력 알림이 있으면 true 반환
      - notification() : 명령어 실행 후 생긴 알림을 문자열로 출력함
      - display() : 체스판과 누구의 차례인지 문자열로 출력함
- [validator.mjs](#file-validator-mjs) : 사용자의 입력이 유효한 값인지 검증, 맞으면 분리해서 넘겨줌
  - class Validator
    - method
      - input(line) : 명령어를 처리할 수 있는 정규식 형태인지 검증하고, 맞다면 캡쳐한 groups를 반환함.
- [formatter.mjs](#file-formatter-mjs) : 보드로부터 받은 데이터를 읽기 편한 형식으로 재구성
  - class Formatter
    - method
      - output() : 주어진 정보를 format에 맞는 형식의 문자열로 반환함.
        - YourTurn : 차례를 나타내는 형식
        - ChessBoard : 체스판을 나타내는 형식
        - AvailablePath : 기물의 가능한 경로를 표시하는 형식
        - ScoreBoard : 점수판을 표시하는 형식
- [board.mjs](#file-board-mjs) : 실질적인 보드 클래스
  - class Board
    - property
      - board : 체스판에 대한 8*8 정보. 각 셀은 기물의 레퍼런스가 보관됨
    - method
      - init() : 보드를 초기화함. 리셋 용도로도 사용 가능
      - pieceAt(rank, file) : 해당 좌표에 있는 기물을 반환함
      - setPiece(team, type, pos) : 기물을 생성함
      - initPiece(team, type, pos) : 추가적인 검증 하에 기물을 생성함
      - move(team, posFrom, posTo) : 기물을 이동함
      - countScore() : 점수를 반환함
      - countPiece() : 기물 갯수를 계산함
      - display() : board 에 대한 정보를 8*8 배열 형태로 primitive하게 반환함
      - showAvailPath(pos) : 특정 위치에 있는 기물의 실제 이동 가능한 모든 경로를 반환함
- [piece.mjs](#file-piece-mjs) : 기물 추상 클래스
  - class Piece
    - property
      - team : 기물 객체의 팀에 대한 정보. 수정 불가능
      - position : 기물 객체의 현재 좌표
      - moves : 기물 객체의 이동 가능한 방법에 대한 프로퍼티
      - static index : indexing을 위한 기물의 number
      - static score : scocring을 위한 기물의 점수
      - static maxnumber : 보드에 배치할 수 있는 기물의 최대 수
    - method
      - possiblePositions() : 보드 위의 기물과 상관없이 이동 가능한 경로 반환
      - move(board, checkValid) : 이동 가능한 경로 반환, checkValid로 실제로 Valid한 경로만 반환하도록 선택할 수 있음
      - toward(...) : 기물의 이동 방식에 대한 메서드. 룩, 비숍, 퀸같이 가능한 멀리 가는 기물들은 재귀로 구현됨
      - event() : 기물이 이동할 때마다 실행되는 이벤트
      - static checkCurrentNumber(Board, team) : 기물 갯수를 확인하여 추가 생성 가능한지 확인함
      - static checkSetPosition(team, position) : 기물 생성 위치가 유효한지 확인함
- [pawn.mjs](#file-pawn-mjs), [knight.mjs](#file-knight-mjs), [bishop.mjs](#file-bishop-mjs), [rook.mjs](#file-rook-mjs), [queen.mjs](#file-queen-mjs) : 각 기물별 클래스
  - class ~ extends Piece:
    - Piece로부터 상속된건 생략하고 추가로 정의한 항목만 기술함
    - method
      - init() : 기물의 이동 방식을 초기화함
      - toward(...) : 기물마다 유효한 이동 방식에 따라 재작성함
      - event() : 기물마다 유효한 이동 이벤트에 따라 재작성함(사실상 pawn 단독)
      - static checkSetPosition(team, position) : 기물마다 유효한 포지션에 따라 재작성함
- [position.mjs](#file-position-mjs) : Position 클래스
- 나머지 : 개인 학습 저장용 파일 (무시해도 됨)


## 체크리스트

학습 목표

- 작은 역할을 하는 클래스부터 조금씩 더 복잡한 클래스를 만들면서 객체지향 설계와 객체지향 프로그래밍 패러다임을 연습하는 것이 목표다.

- 각 역할을 담당하는 클래스를 별도 파일로 구현할 수 있다.

- 더 작은 단위나 반복되는 코드가 있다면 일반화해서 별도 클래스로 구현해야 한다.

학습 체크리스트

- [x] class 클래스 는 어떤 의미가 있는가?
- [x] object 객체 는 어떤 의미가 있는가?
- [x] instance 인스턴스 는 어떤 의미가 있는가?
- [x] property 프로퍼티 와 method 메소드 란?
- [x] encapsulation 캡슐화란?
- [x] inheritance 상속이란?
- [x] polymorphism 다형성이란?
- [x] JS에서 객체 표현은 어떻게 하는가 직접 테스트해보기
  - [x] object literal
  - [x] ES classes pattern
  - [x] constructor pattern
  - [x] prototype pattern
  - [x] Object.create
- [x] object literal vs class
- [x] ES6 module vs CommonJS module

개발 체크리스트

프로그램 형식
- [x] Board 클래스 구현
- [x] Pawn, Bishop, Rook, Queen, Knight 클래스는 별도 파일로 관리
- [x] 프로그램 구현은 입력>검증>처리/계산>형식>출력 단계
  - [x] 각 단계는 담당 객체 or 모듈로 분리되어야 함

프로그램 동작
- [x] 프로그램 시작시 King을 제외한 체스말 초기화
- [x] 프로그램 동작 동안 반복해서 입력 받음
- [x] 움직이려는 말이 있는 위치와 이동하려는 위치를 차례로 입력받음
  - [x] 형식 불일치 시 다시 입력받음
- [x] 말을 잡은 경우 점수판 출력
- [x] 입력값이 ?로 시작 시 이동 가능한 모든 수 출력
  - [x] 진행 불가능한 구역은 띄우면 안됨
- [x] 흑과 백이 번갈아서 입력해야 하며 입력할 때마다 체스판, 체스말 현황을 출력해야 함.

프로그램 요구사항

체스판
- [x] Board는 8x8
- [x] 점수의 기준은 현재 있는 말 (폰 1, 비숍,나이트 3, 룩 5, 퀸 9)
- [x] Board는 모든 말의 위치를 간접적으로 알 수 있어야 함
- [x] Board의 display 함수는 1줄부터 8줄까지 가로줄 전체를 리턴
- [x] Board가 display한 데이터 구조를 바탕으로 출력 형식을 담당하는 객체(or 모듈)에서 문자열 배열 바꾸고 체스판을 출력하도록 전달 (출력 방법은 사이트 참조)
- [x] setPiece(type, position)
  - [x] initPiece 와 비슷하나 적절한 생성 위치, 위치의 다른 말, 말 개수 제한이 없음
- [x] 특정 위치에 특정 말을 생성하는 initPiece(type, position) 함수 구현
  - [x] 1-2 rank는 흑색, 7-8 rank는 백색
  - [x] 체스말 초기 위치가 아니면 생성하지 않는다
  - [x] 위치에 말 있으면 생성 X
  - [x] 종류별 최대 개수보다 많이 생성 X
    - [x] 폰 8개, 나이트비숍룩 2개, 퀸 1개
  - [x] 생성 X -> throw exception
- [x] 특정 말을 옮길 때는 Board의 move(from, to) 함수를 사용한다
  - [x] 같은 색상 말이 있으면 이동 불가
  - [x] 이동 가능시 true, 불가 false 리턴
  - [x] 다른 색상 말이 있으면 제거하고 이동
  - [x] 제거 시 흑과 백 점수 출력 (callback 처럼 해볼까?)

체스말 공통
- [x] 체스말의 위치값을 Position 타입으로 갖는다
  - [x] **Position 값을 다루기 위한 데이터 구조 별도로 만들것**
  - [x] Position은 file A-H, rank 1-8 까지 입력 가능
  - [x] file, rank값은 enum으로 선언 (JS에는 enum 없으니 알아서 할것)
- [x] 체스말은 흑, 백 둘 중 하나
  - [x] 상태값으로 지정한다면 생성할 때 결정하고 추후에 변경할 수 없어야 함
  - [x] 타입으로 구분한다면 다형성으로 동작하도록 함
- [x] 체스말은 현재 위치 Position을 기준으로 이동할 수 있는 모든 위치를 리턴하는 possiblePositions() 함수를 제공
  - [x] 다른 말 여부는 판단하지 않음

Pawn 요구사항
- [x] 생성 위치는 흑색 2-rank 또는 백색 7-rank 만 가능
- [x] 백색은 더 작은 rank로 움직일 수 있고 흑색은 더 큰 rank로 움직일 수 있음
- [x] 체스 게임과 달리 처음에도 1칸만 움직일 수 있고, 다른 말을 잡을 때도 대각 없이 직선으로만 움직인다고 가정
- [x] 상대편 rank에 도착하면 queen으로 변신

Knight 요구사항
- [x] 생성 위치는 흑색 B-1, G-1, 백색 B-8, G-8
- [x] 전진1칸+대각선 1칸으로만 움직일 수 있음
- [x] 전진하는 칸이 막혀있으면 움직일 수 없음

Bishop 요구사항
- [x] 생성 위치는 흑색 C-1, F-1, 백색 C-8, F-8
- [x] 대각선으로만 움직일 수 있음

Rook 요구사항
- [x] 생성 위치는 흑색 A-1, H-1, 백색 A-8, H-8
- [x] 좌우, 위아래 방향으로 움직일 수 있음

Queen 요구사항
- [x] 생성 위치는 흑색 E-1, 백색 E-8
- [x] 대각선, 좌우, 위아래 방향으로 움직일 수 있음



## 학습메모

- [x] 프로퍼티를 어떻게 불변으로 만들 수 있는가?
  Object.defineProperty