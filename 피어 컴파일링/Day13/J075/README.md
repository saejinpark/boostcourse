# 결과
## 구동 방법
- main.js > sim 타입을 TX or RX 로 변경
## 사진 첨부
### 체크포인트 확인
- [X] 전송 응용 계층 메일 입력 구현
    - <img width="591" alt="스크린샷 2022-08-04 오전 8 48 34" src="https://user-images.githubusercontent.com/26318372/182735578-e82a578e-3220-49ba-92d2-f7fcb6aa77e4.png">
- [X] 전송 표현 계층 BASE64 인코딩 구현
    - <img width="586" alt="스크린샷 2022-08-04 오전 8 48 51" src="https://user-images.githubusercontent.com/26318372/182735583-666fa078-1cd2-4c69-9aba-2a56f86cf32c.png">
- [X] 전송 세션 계층 UUID 추가 구현
    - <img width="558" alt="스크린샷 2022-08-04 오전 8 49 04" src="https://user-images.githubusercontent.com/26318372/182735586-c97b2900-a116-488b-98b2-d2adca87736a.png">
- [X] 전송 계층 3-way 핸드쉐이크 (SYN, ACK, DATA) 구현
    - <img width="984" alt="스크린샷 2022-08-04 오전 8 49 31" src="https://user-images.githubusercontent.com/26318372/182735591-c7fe6004-e7ad-4caa-8c6d-7b9095be34a1.png">
    - 중간 생략
    - <img width="984" alt="스크린샷 2022-08-04 오전 8 50 13" src="https://user-images.githubusercontent.com/26318372/182735596-335e01a5-1247-48d9-b580-460a376701c1.png">
- [X] 전송 계층 세그멘트 나누기 처리 구현
    - <img width="979" alt="스크린샷 2022-08-04 오전 8 55 32" src="https://user-images.githubusercontent.com/26318372/182735598-baabca22-c7be-414b-9a65-7ad348b791df.png">
- [X] 네트워크 계층 헤더 포함 구현
    - <img width="984" alt="스크린샷 2022-08-04 오전 8 58 39" src="https://user-images.githubusercontent.com/26318372/182735602-030e6e2c-4019-412f-a7f3-6cf79dc1b39f.png">
- [X] 데이터링크 계층 헤더 포함 구현
    - <img width="964" alt="스크린샷 2022-08-04 오전 8 58 50" src="https://user-images.githubusercontent.com/26318372/182735603-81b3dcdd-ee7f-4175-b675-e77434d53f75.png">
- [X] 물리계층 문자열-16진수-문자열 변환 구현
    - <img width="981" alt="스크린샷 2022-08-04 오전 8 59 01" src="https://user-images.githubusercontent.com/26318372/182735605-463cf2dd-77b7-4626-995e-618b5f7ac39b.png">
- [X] 수신 데이터링크 계층 헤더 제거, MAC 주소 비교 구현
    - <img width="915" alt="스크린샷 2022-08-04 오전 9 00 01" src="https://user-images.githubusercontent.com/26318372/182735608-7f8ced2f-4fb1-4d09-b515-a4be38a42657.png">
- [X] 수신 네트워크 계층 헤더 제거, IP 주소 비교 구현
    - <img width="581" alt="스크린샷 2022-08-04 오전 9 00 21" src="https://user-images.githubusercontent.com/26318372/182735611-024d62dc-bd2d-46cb-93d7-ecbc84e1c911.png">
- [X] 수신 전송 계층 3-way 핸드쉐이크 (SYN+ACK, DATA+ACK) 구현
    - <img width="970" alt="스크린샷 2022-08-04 오전 9 00 36" src="https://user-images.githubusercontent.com/26318372/182735614-cb0cf058-3ec7-432a-bf9c-baef2bf55f89.png">
    - 중간 생략
    - <img width="987" alt="스크린샷 2022-08-04 오전 9 01 00" src="https://user-images.githubusercontent.com/26318372/182735619-21e03cae-a7a0-40a0-956d-b59935769b73.png">
- [X] 수신 전송 계층 세그멘트 합치기 처리 구현
    - 나눠져서 받은걸 합쳐서 세션계층으로 전달되는 것을 확인 가능
    - <img width="979" alt="스크린샷 2022-08-04 오전 9 01 54" src="https://user-images.githubusercontent.com/26318372/182735625-400a1daf-d1be-44ba-9848-263e06c5d2a7.png">
- [X] 수신 UUID 출력 세션 계층 구현
    - <img width="987" alt="스크린샷 2022-08-04 오전 9 02 25" src="https://user-images.githubusercontent.com/26318372/182735628-36117d35-d85d-41cc-be6a-62aefb0c5eec.png">
- [X] 수신 표현 계층 BASE64 디코딩 구현
    - <img width="988" alt="스크린샷 2022-08-04 오전 9 02 35" src="https://user-images.githubusercontent.com/26318372/182735629-f870a9f4-dded-48ce-8a2e-390ef3752315.png">
- [X] 수신 응용 계층 메일 출력, 파일 저장 구현
    - <img width="519" alt="스크린샷 2022-08-04 오전 9 02 51" src="https://user-images.githubusercontent.com/26318372/182735630-edfb5dd1-5d0b-4fc3-81f2-4e58f12801e0.png">
    - <img width="367" alt="스크린샷 2022-08-04 오전 9 03 34" src="https://user-images.githubusercontent.com/26318372/182735632-cd5f6f4b-174b-4c8a-a12b-b04c609ddaf4.png">
# 나만의 체크포인트
- [X] 미션 1. 전송 계층 구현
    - [X] 응용 계층 (Application Layer) 구현
    - [X] 표현 계층 (Presentation Layer) 구현
    - [X] 세션 계층 (Session Layer) 구현
    - [X] 전송 계층 (Transport Layer) 구현
    - [X] 네트워크 계층 (Network Layer) 구현
    - [X] 데이터링크 계층 (Data Link Layer) 구현
    - [X] 물리 계층 (Physical Layer) 구현
- [X] 미션 2. 전송 계층 구현
    - [X] 응용 계층 (Application Layer) 구현
    - [X] 표현 계층 (Presentation Layer) 구현
    - [X] 세션 계층 (Session Layer) 구현
    - [X] 전송 계층 (Transport Layer) 구현
    - [X] 네트워크 계층 (Network Layer) 구현
    - [X] 데이터링크 계층 (Data Link Layer) 구현
    - [X] 물리 계층 (Physical Layer) 구현

# 학습 메모
## 구현 과정
- 응용 계층 (Application Layer) 구현
    - 동기적으로 입력받기 위해 readline-sync 모듈을 사용하였다. 
    - 처음에는 메일이 dic 형식을 가지도록 구현하였는데, 찾아보니까 하나의 큰 텍스트 블록으로 \\r\\n이 붙여서 구성된다고 한다. 문제 예시에서도 이렇게 구현하고 있는 것 같아 고쳐보려고 한다. 
    - 참고 자료) https://ko.eyewated.com/smtp-%EC%9D%B8%EC%82%AC%EC%9D%B4%EB%93%9C-%EC%95%84%EC%9B%83/
- 표현 계층 (Presentation Layer) 구현
    - base64를 구현했는데, 예시와 자꾸 다른 값이 나오길래 확인해봤더니 예시가 잘못된 것이었다.
- 세션 계층 (Session Layer) 구현
    - 임의의 uuid를 생성하기 위해 uuid 모듈을 사용하였다. 

## 학습 키워드
- OSI 7계층
- 응용 계층
- 표현 계층
- 세션 계층
- UUID Vesion4
- 전송 계층
- 3way handshake
- 네트워크 계층
- 데이터 링크 계층
- 물리 계층

## 참고 자료
- OSI 7계층
    - http://wiki.hash.kr/index.php/OSI_7_%EA%B3%84%EC%B8%B5
- js base64
    - https://zzznara2.tistory.com/143
    - https://ohgyun.com/432
- UUID Vesion4
    - https://www.npmjs.com/package/uuid
- TCP header
    - https://velog.io/@averycode/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-TCPUDP%EC%99%80-3-Way-Handshake4-Way-Handshake
- 아스키 문자열을 16진수로 변환
    - https://www.delftstack.com/ko/howto/javascript/ascii-to-hex-using-javascript/
- 16진수를 다시 아스키로 변환
    - https://www.w3resource.com/javascript-exercises/javascript-string-exercise-28.php
- mac 주소 찾는 정규식
    - https://link2me.tistory.com/2032
