# 나만의 체크 포인트 🚩

- [x] 1) 호출 구조 설계 (TX, RX) - 3WH 신경써서 구현

- [x] 2) 입력 부분 구현 (readline)

- [x] 3) 전체적인 뼈대, 흐름 점검

- [x] 4) TX 6계층 BASE64 인코더 구현

- [x] 5) TX 5계층 UUID 생성 구현

- [x] 6) TX 4계층 100단위로 세그먼트 쪼개서 보내기 구현

- [x] 7) TX 4계층 3 way handshake 구현

...

# 체크 리스트 ✅

- [x] 전송 응용 계층 메일 입력 구현

- [x] 전송 표현 계층 BASE64 인코딩 구현

- [x] 전송 세션 계층 UUID 추가 구현

- [x] 전송 계층 3-way 핸드쉐이크 (SYN, ACK, DATA) 구현

- [x] 전송 계층 세그멘트 나누기 처리 구현

- [x] 네트워크 계층 헤더 포함 구현

- [x] 데이터링크 계층 헤더 포함 구현

- [x] 물리계층 문자열-16진수-문자열 변환 구현

- [x] 수신 데이터링크 계층 헤더 제거, MAC 주소 비교 구현

- [x] 수신 네트워크 계층 헤더 제거, IP 주소 비교 구현

- [x] 수신 전송 계층 3-way 핸드쉐이크 (SYN+ACK, DATA+ACK) 구현

- [x] 수신 전송 계층 세그멘트 합치기 처리 구현

- [x] 수신 UUID 출력 세션 계층 구현

- [x] 수신 표현 계층 BASE64 디코딩 구현

- [x] 수신 응용 계층 메일 출력, 파일 저장 구현
  
# 실행 방법 (피어 분들께 🙇)

`protocol.js`가 `TX.js`와 `RX.js`를 중간에서 매개하는 메인 파일입니다.

그 밖에 `constants.js`와 `utils.js` 파일이 있습니다.

코드가 너무 지저분해 읽기 힘드실것 같아 죄송합니다...!

몇개는 결과가 나오기는 하지만 출력이 너무나도 조잡한 상태라 알아보시기 힘드실것 같아 실행 결과 사진이라도 첨부합니다.

# 실행 결과 💻

사용자 입력 후 TX 전송 시작

![image](https://user-images.githubusercontent.com/79911816/182731979-9a726d3a-0a8e-4925-9ba1-31116b800036.png)

![image](https://user-images.githubusercontent.com/79911816/182731989-a4b4fa50-d6ec-4984-a6d7-39ef65d266d1.png)

RX가 비트화된 데이터 받아서 해석 후 응답 전송

![image](https://user-images.githubusercontent.com/79911816/182732005-8961ca7e-74c1-441f-bb45-d0f11b79d8af.png)

TX가 다시 패킷 받아서 응답 전송

![image](https://user-images.githubusercontent.com/79911816/182732027-8d2c7e32-61dd-4235-958d-f5217ffa2111.png)

RX가 마지막 ACK 응답 받음

![image](https://user-images.githubusercontent.com/79911816/182732065-41d454d2-ce01-4794-bd10-374c80d39857.png)

TX는 3 way handshake가 끝났음을 인지하고 DATA 전송 시작

![image](https://user-images.githubusercontent.com/79911816/182732160-3f7d5235-d053-4ac6-a548-52c4a16dbbfb.png)

RX가 이를 해석하여 받음

![image](https://user-images.githubusercontent.com/79911816/182732200-e294b217-d451-4a0b-9911-7f8f630d35f5.png)

### 주의사항!!

현재 segment 크기가 100이 넘어가면 전송에 오류 발생합니다 ㅠ
