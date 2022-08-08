## 나만의 체크리스트

- [x] 7계층 출력 구현
- [x] 6계층에서 파일의 크기값을 BASE64로 인코딩하고, 출력 구현
- [x] 5계층에서 UUID를 생성해서 Session-Id 항목을 추가하고, 출력구현
- [x] 4계층에서 SYN 보내고, 출력구현
- [x] 4계층에서 받은 data에 IP추가하고, 출력 구현
- [x] 2계층에서 해당하는 mac주소 추가하고, 출력 구현
- [x] 1계층에서 받은 data들을 hex 16진수 바이트로 바꾸고, 출력구현
- [x] 수신 1계층에서 , 받은 data들을 다시 문자열로 바꾸고, 출력구현
- [x] 수신 2계층에서 , 받은 data들에서 수신 mac주소 체크 후 출력구현, 헤더파일 떼고 3계층으로 올림,
- [x] 수신 3계층에서 , ip 체크 후 출력 구현, 이후 4계층으로 올림
- [x] 수신 4계층에서 DATA전송 구현
- [x] 수신 4계층에서 완전히 받은 data를 5계층으로 전달
- [x] 수신 5계층에서 session id 확인하고, 표현 6계층으로 전달
- [x] 수신 6계층에서 디코딩 복원 후 파일생성하고, 파일 내용 같은지 확인
- [x] 최종적으로 7계층, from to title제목과 첨부파일 이름 출력

## 체크포인트

- [x] 전송 응용 계층 메일 입력 구현

- [x] 전송 표현 계층 BASE64 인코딩 구현
![base64인코딩구현](https://user-images.githubusercontent.com/61281128/182659444-14c517fd-bdcc-4d77-a93e-877383ff54f5.PNG)

- [x] 전송 세션 계층 UUID 추가 구현

- [x] 전송 계층 3-way 핸드쉐이크 (SYN, ACK, DATA) 구현
![syn](https://user-images.githubusercontent.com/61281128/182659606-23c9f827-754e-4e1c-afef-7e5ef1b9aaf0.PNG)

![3way](https://user-images.githubusercontent.com/61281128/182659602-d0350076-c6d5-44e0-8f3c-223f9defbd19.PNG)


- [x] 전송 계층 세그멘트 나누기 처리 구현
![100세그먼트](https://user-images.githubusercontent.com/61281128/182658659-97f62abe-70b3-4589-be48-d1efe760cda4.PNG)
![나머지](https://user-images.githubusercontent.com/61281128/182658665-f3612143-ca83-4cfe-8d0f-bc48b907d5e9.PNG)

- [x] 네트워크 계층 헤더 포함 구현

- [x] 데이터링크 계층 헤더 포함 구현

- [x] 물리계층 문자열-16진수-문자열 변환 구현

- [x] 수신 데이터링크 계층 헤더 제거, MAC 주소 비교 구현

- [x] 수신 네트워크 계층 헤더 제거, IP 주소 비교 구현

- [x] 수신 전송 계층 3-way 핸드쉐이크 (SYN+ACK, DATA+ACK) 구현 -> 송신과 동시에 주고받도록 같이 구현

- [x] 수신 전송 계층 세그멘트 합치기 처리 구현

- [x] 수신 UUID 출력 세션 계층 구현

- [x] 수신 표현 계층 BASE64 디코딩 구현

- [x] 수신 응용 계층 메일 출력, 파일 저장 구현
![결과물](https://user-images.githubusercontent.com/61281128/182660062-77b558c3-0768-4c11-af6b-31da62f91883.PNG)
![어태치](https://user-images.githubusercontent.com/61281128/182660067-3cd4de13-52cb-443d-9ac5-d08a5f56725d.PNG)
