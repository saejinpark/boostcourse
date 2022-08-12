# 나만의 체크포인트
## TCP 에코 서버
- [x] telnet으로 접속 가능한 서버 만들기
- [x] 입력을 받으면 받은 메시지를 재전송 후 연결 종료
## 챌린지 서버 만들기
- [x] `checkin` 구현(ID, 그룹 배정)
- [x] `checkout` 구현(그룹 내에 broadcast)
- [x] `mission` 구현
- [x] `peersession` 구현(maxCount 개수만큼 그룹 내 broadcast)
- [x] `complete` 구현 (피어세션 종료)
- [x] `message` 구현(피어세션 중 broadcast 명령어);
- [x] `direct` 구현(campID에게 text 전송)

# 학습메모
TCP : 3Way handshake, 서버-클라이언트 간에 연결 상태를 검증  
UDP : 연결 확인 없이 바로 데이터 전송; 비연결형; 소켓이 아닌 IP 기반으로 통신  
HTTP : Request - Response 구조, 요청이 있어야 응답  

## ServerEvents
- `close` : 서버가 닫힘  
- `connection` : 새 연결이 발생
- `listening` : `server.listen()`이 실행
- `drop` : 최대 연결 가능 수를 넘겨 접속이 끊김
## SocketEvents
- `close` : 연결이 닫힘
- `connect` : 연결이 발생
- `data` : 데이터가 수신됨
- `drain` : 쓰기 버퍼가 비워짐
- `end` : 소켓의 교신 대상이 연결을 종료함
- `lookup` : 호스트를 찾고 - 연결하기 직전
- `ready` : 송수신 준비 완료
- `timeout` : connection timeout

# Refs.
[리눅스 서버의 TCP 네트워크 성능을 결정짓는 커널 파라미터 이야기 - 3편 : NHN Cloud Meetup](https://meetup.toast.com/posts/55)  

[#3 TCP/IP 송수신 과정](https://valueelectronic.tistory.com/102)  

[TIME_WAIT 상태란 무엇인가](https://docs.likejazz.com/time-wait/)  

[CLOSE_WAIT 문제 해결](https://docs.likejazz.com/close-wait/)  

[tcp_tw_reuse와 tcp_tw_recycle](https://brunch.co.kr/@alden/3)  

[[TCP/UDP] TCP와 UDP의 특징과 차이](https://mangkyu.tistory.com/15)  

[tcp/ip와 http의 차이](https://blog.naver.com/PostView.nhn?blogId=k220j&logNo=220694238797)  

[http와 tcp/ip 정리](https://dreamdeveloper403.tistory.com/61)  

[HTTP 통신과 TCP 통신의 차이와 이해](https://moondongjun.tistory.com/34)  