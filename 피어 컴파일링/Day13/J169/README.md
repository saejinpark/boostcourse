# 나만의 체크 포인트

### Tx 체크 포인트

- [x] from 주소, to 주소, title 제목, 첨부 파일 이름 입력받기
- [x] 정해진 형태에 맞게 출력(From, To, Title, 첨부 파일 내용) 첨부 파일 내용은 파일 크기 정도만 출력해도 괜찮음)

    <img width="600" alt="application Layer 입출력" src="https://user-images.githubusercontent.com/43336212/182613352-c4139287-2654-4d3e-8e65-5556d10a458f.png">

    <br>
    
- [x] BASE64 인코딩 구현

    <img width="600" alt="Base64 인코딩" src="https://user-images.githubusercontent.com/43336212/182612365-f0ccd1cb-e038-4e33-a603-7b590c8717f1.png">
    
    참고자료
    <img width="800" alt="Base64 인코딩 예시" src="https://user-images.githubusercontent.com/43336212/182611070-fad8b0b5-7b1d-458b-8fdc-0cc0959277ac.png">

    <br>

- [x] 첨부 파일 내용만 인코딩하기

    <img width="600" alt="presentation Layer 입출력" src="https://user-images.githubusercontent.com/43336212/182615124-3b6a2cf2-6885-4ac6-97bb-34d8215e545d.png">

    <br>

- [x] UUID 생성
- [x] Title 밑에 Session-Id 추가

    <img width="600" alt="Session Layer 입출력" src="https://user-images.githubusercontent.com/43336212/182644092-c768a754-5173-4d08-b191-0ca20818596a.png">

    <br>

- [ ] TCP 3-way Handshake 구현
- [ ] Data 100 단위로 분리
- [ ] Data 세그먼트에 TCP 헤더 추가
- [ ] IP 헤더 추가(네트워크 계층)
- [ ] MAC 헤더 추가(데이터 링크 계층)
- [ ] 완성된 프레임을 HEX 16진수 문자열로 변환

### Rx 체크 포인트

- [ ] 전달받은 16진수 프레임을 원래 형태로 변환(MAC은 16진수, 나머지는 문자열)
- [ ] MAC 헤더 검증 구현(Destination MAC)
- [ ] IP 헤더 검증 구현(Destination IP)
- [ ] TCP 계층 동작 구현
    1. SYN 에는 SYN+ACK 전송
    2. DATA를 받으면 ACK 전송
    
- [ ] TCP 계층에서 마지막 DATA까지 받아 합쳐서 전달
- [ ] Session-Id 출력
- [ ] 첨부 파일 부분 BASE64 디코딩 후 파일 저장
- [ ] 최종 형태 출력

### Computer 체크 포인트
- 자신의 port와 AddressTable index를 받음.
- Tx, Rx를 가짐.
- 


전송 응용 계층 메일 입력 구현
전송 표현 계층 BASE64 인코딩 구현
전송 세션 계층 UUID 추가 구현
전송 계층 3-way 핸드쉐이크 (SYN, ACK, DATA) 구현
전송 계층 세그멘트 나누기 처리 구현
네트워크 계층 헤더 포함 구현
데이터링크 계층 헤더 포함 구현
물리계층 문자열-16진수-문자열 변환 구현
수신 데이터링크 계층 헤더 제거, MAC 주소 비교 구현
수신 네트워크 계층 헤더 제거, IP 주소 비교 구현
수신 전송 계층 3-way 핸드쉐이크 (SYN+ACK, DATA+ACK) 구현
수신 전송 계층 세그멘트 합치기 처리 구현
수신 UUID 출력 세션 계층 구현
수신 표현 계층 BASE64 디코딩 구현
수신 응용 계층 메일 출력, 파일 저장 구현


# 학습 메모

BASE64 인코딩
- string buffer를 unit16array에 넣을 수 있음(미션에서는 unit8array 사용) https://stackoverflow.com/questions/43769047/node-fs-readfilesync-returns-a-uint8-array-instead-of-raw-buffer-array
- 2진수 <-> 10진수 변환 toString(2) / parseInt(str, 2) https://minhanpark.github.io/today-i-learned/binary-change/

UUID Version 4 모듈 https://inpa.tistory.com/entry/NODE-%F0%9F%93%9A-UUID-%EB%AA%A8%EB%93%88