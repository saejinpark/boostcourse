# 이벤트 매니저와 워커

- [x] EventManager 싱글톤 인스턴스 구현
- [x] Subscriber 추가 함수 구현 (여러 조건 수용)
- [x] Subscriber 제거 함수 구현 (여러 조건 수용)
- [ ] postEvent 함수 구현
- [ ] Worker Thread 동작 분리
- [ ] 조건별 매칭한 subscriber 핸들러 동작
- [ ] 핸들러 내 completed flag 지원 여부
- [ ] 구독 조건들 출력 함수 구현
- [ ] 비동기 async방식 postEvent 동작 구현
- [ ] 지연 delay방식 postEvent 동작 구현
- [ ] Subscriber 핸들러 처리 Event Emitter 동작 구현

## 나만의체크포인트

- [x] `sharedInstance()`
  - [x] 싱글톤
- [x] `add(subscriber, eventName, sender, handler)`
  - [x] subscriber, sender 객체로 넘김
  - [x] handler 이벤트로 전달
- [x] `remove(subscriber)`
- [ ] `postEvent(name, sender, userData)`
  - [ ] 이벤트 이름 명시
  - [ ] Publisher 객체를 넘김
  - [ ] object로 유저데이터
- [ ] `stringify()`
- [ ] `main.js` 작성
- [ ] 실행결과 gist에 저장



## 학습메모

https://www.rinae.dev/posts/why-every-beginner-front-end-developer-should-know-publish-subscribe-pattern-kr

https://handhand.tistory.com/271