# 나만의 체크포인트

- [x] OSI 7계층에서 메일이 발신되면 7계층부터 1계층까지 어떻게 흘러가는 지 정리한다.(1시 20분까지)
- [x] 계층하나마다 큰 함수 하나를 가질 수 있는 구조를 만든다.
- [x] 발신 응용 계층에서 표현계층으로 데이터를 보내는 부분을 구현한다.<img width="100%" alt="스크린샷 2022-08-03 오후 2 26 13" src="https://user-images.githubusercontent.com/83356118/182530726-f997c728-0151-41cd-9e86-84a1ad41d5a5.png">
- [x] 표현계층에서 가공한 데이터에 세션계층에서 세션ID를 붙인다.<img width="100%" alt="스크린샷 2022-08-03 오후 2 54 05" src="https://user-images.githubusercontent.com/83356118/182534273-de6dcffd-787c-4a8a-b232-a6125ef990c3.png">
- [x] 전송계층에서 필요한 부분들을 분할하여 구현한다.
- [x] tcp 계층의 역할 정리(3시 20분까지)
- [x] three way handshake 구현
- [x] data 분할전송 구현
- [x] 네트워크 계층에서 필요한 부분들을 분할하여 구현한다.![스크린샷 2022-08-03 오후 6 26 12](https://user-images.githubusercontent.com/83356118/182574200-272f25a9-6282-4140-aec8-32f24ed6f918.png)
- [x] 데이터 링크 계층 동작 구현<img width="100%" alt="스크린샷 2022-08-03 오후 7 28 08" src="https://user-images.githubusercontent.com/83356118/182586693-dbe72048-c3bf-4b68-96db-1a84f50dd7a8.png">
- [x] 물리 링크 계층 동작 구현(리턴 값이 16진수 hex)
- [x] threewayhandshake가 물리 링크까지 내려오는 것 구현(구조 변경)
      <img width="100%" alt="스크린샷 2022-08-03 오후 9 42 15" src="https://user-images.githubusercontent.com/83356118/182610413-d84c6fab-f517-47fc-b5a9-befdb39fdcdd.png">
- [x] Rx 1->2 구현
- [x] Rx 2->3 구현
- [x] Rx 3->4 구현
- [x] Tx와 Rx의 4계층 이해 및 리팩터링![스크린샷 2022-08-04 오전 7 14 48](https://user-images.githubusercontent.com/83356118/182721759-f9c1ac68-be16-44f2-a109-5a7603673b0b.png)

# 학습메모

1. 메일 발신 과정 (OSI 7계층)
   송신자는 7계층(어플)에서 메일을 작성한다.
   -> 6계층(데이터변환)에서는 전송에 적합한 형태로 메일내용을 변환한다.
   -> 5계층(연결 준비 with 세션)에서는 연결을 하고 통신이 끊어지지 않도록 한다.
   -> 4계층(전달)에서는 내용을 전달한다.
   -> 3계층(경로찾기)에서는 4계층에서 패킷을 전달받아 목적지의 논리적 주소를 찾는다.
   -> 2계층(논리 -> 물리)에서는 수신컴퓨터의 물리주소로 연결한다.
   -> 1계층(물리적 구조 정의)에서는 물리적 요소들을 일치시킨다.
2. 구조
   사용자가 표현계층에서 받은 정보들을 class에서 프로퍼티로 가지고 있지만 절차적인 느낌을 주기 위해 하나의 계층마다 값들을 변경한다.
3. tcp 계층
   TCP: 연결지향, 신뢰 가능, 속도 조절,
   - 3way handshake 송신자 syn -> 수신자 syn+ack -> 송신자 ack
   - 잘 받아지는 지를 보고 보내는 양을 결정
     서버가 소켓을 읽는 것은 receive 쓰는 것은 send
     받는 것은 작게 쪼개는 과정이 있다.
4. js 객체에서 value들만 모아서 배열로 리턴하는 메서드를 지원함

```
const object1 = {
  a: 'somestring',
  b: 42,
  c: false
};

console.log(Object.values(object1));
// expected output: Array ["somestring", 42, false]
```

### 정리 출처

tcp 계층
https://www.youtube.com/watch?v=K9L9YZhEjC0

Object.values
https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/values
