## 피어 컴파일 추천 방식

1. npm i로 의존성 설치
2. npm test로 짜놓은 테스트들 테스트 가능
3. npm start 나 node app.js로 실행 가능

# 나만의 체크포인트

- [x] 요청 보낸 후 html 가져오는 것 구현
- [x] 파서를 이용하여 주소 찾기 구현<img width="100%" alt="스크린샷 2022-08-04 오후 2 04 29" src="https://user-images.githubusercontent.com/83356118/182767090-e23d865d-284e-49f5-a695-7a0ce3d18a59.png">
- [x] 받아온 데이터 도메인 출력 구현
- [x] 받아온 데이터 스킴 출력 구현
- [x] 받아온 데이터 종류 출력 구현
- [x] 받아온 데이터 경로 출력 구현<img width="100%" alt="스크린샷 2022-08-04 오후 2 46 25" src="https://user-images.githubusercontent.com/83356118/182772054-ad5b71a9-957e-41c4-a18e-ba58600f1dd9.png">
- [x] 받아온 데이터 용량 출력 구현
- [x] 받아온 데이터 대기 시간 출력 구현
- [x] 받아온 데이터 다운로드 시간 출력 구현<img width="100%" alt="스크린샷 2022-08-04 오후 3 29 34" src="https://user-images.githubusercontent.com/83356118/182778504-4c432317-06dc-4a90-8581-37adeaca3d87.png">
- [x] 메인 url 관련 데이터 데이터들 출력 구현<img width="898" alt="스크린샷 2022-08-04 오후 5 36 08" src="https://user-images.githubusercontent.com/83356118/182802580-ae84fb23-f94d-4d9f-8324-384d3d56d430.png">
- [x] 전송 용량 누적 방식 구현![스크린샷 2022-08-04 오후 6 30 07](https://user-images.githubusercontent.com/83356118/182814023-e8b8b178-97e5-4155-80b8-2ec63170a484.png)
- [x] 동기적 입력 구현
- [x] 캐시 처리 구현<img width="100%" alt="스크린샷 2022-08-04 오후 5 42 34" src="https://user-images.githubusercontent.com/83356118/182803972-defe2abe-ff12-48fc-b8a5-e06978adde60.png">
- [x] 용량 변환 테스트 코드<img width="100%" alt="스크린샷 2022-08-04 오후 8 40 55" src="https://user-images.githubusercontent.com/83356118/182838407-fe87d79e-8241-49e1-9e35-3a473c1bd65b.png">
- [x] 캐싱 됐을 때와 안 됐을 때 다운로드 속도 비교
      됐을 떄:<img width="100%" alt="스크린샷 2022-08-04 오후 10 16 07" src="https://user-images.githubusercontent.com/83356118/182856202-e508bf28-3c05-48e6-af4c-581d89b690b5.png">
      안 됐을 때:<img width="100%" alt="스크린샷 2022-08-04 오후 10 14 16" src="https://user-images.githubusercontent.com/83356118/182855799-e156b253-1576-49bb-b458-03bcc7a03d95.png">

# 학습메모

1. b단위로 들어오는 데이터를 어떻게 바꿀까 고민하다가 stackoverflow에 1123개의 추천을 받은 답변이 있길래 이름 응용해보았다.

### 참고사항 및 출처

1. 바이트로 들어오는 데이터를 보기 쉽게 바꾸기
   https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript
