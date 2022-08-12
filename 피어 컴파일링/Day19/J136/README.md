# 챌린지 채팅서버

> 에코 서버 관련

- [x] TCP 에코 서버 bind

- [x] 클라이언트 접속 후 정보 출력
- [x] 클라이언트에서 보낸 데이터 재전송

> 챌린지 서버 관련

- [x] checkin 요청 구현
  - [x] 캠프 아이디 범위 확인 + 응답
  - [x] 그룹 할당 후 그룹 번호 전달
- [x] checkout 요청 구현
  - [x] 그룹 내 다른 캠퍼에게 퇴장 안내
  - [ ] TCP 연결 종료시 checkout 처리
- [x] mission 요청 구현
  - [x] day 확인후 키워드 전송
- [ ] peersession 요청 구현
  - [ ] 그룹내 브로드캐스트 시작
- [ ] complete 요청 구현
  - [ ] 그룹내 브로드캐스트 종료
- [ ] message
  - [ ] 피어세션 진행중에 그룹내 브로드캐스트
  - [ ] 그 외에는 무시
- [ ] direct 요청 구현
  - [ ] 특정 캠퍼에게 전송

> 챌린지 클라이언트 관련

- [x] 캠프아이디 입력 후 checkin 요청 campId 전송
  - [x] 활동 시각 저장
- [x] checkout 전송후 연결 해제
  - [x] 체크인부터 체크아웃까지 활동 시간 출력
- [ ] peersession 요청 maxCount 전송
- [ ] complete 요청 전송
- [ ] message 요청 text 전송
- [ ] direct 요청 campId, text 전송

## 나만의체크포인트

- [x] 서버구현
- [ ] reuse를 위한 소켓 옵션
- [x] client IP, Port 번호 출력
- [x] 서버에서 받은 문자열 다시 전송
- [x] telnet 명령으로 결과확인

<img width="1162" alt="미션1 결과" src="https://user-images.githubusercontent.com/81965433/184117084-9727d5cf-ddc4-4bf9-8ebd-7d0cf88ccfc6.png">

## 학습메모

node.js net socket

https://nodejs.org/api/net.html#class-netsocket

https://mylko72.gitbooks.io/node-js/content/chapter8/chapter8_2.html

https://r4bb1t.tistory.com/16