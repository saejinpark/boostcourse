# 나만의 체크포인트
## 이벤트 매니저
- [x] `class eventManager` 싱글톤으로 선언
- [x] `add(subscriber, eventName, sender, handler)` - subscriber 추가
- [x] `remove(subscriber)` - subscriber 및 해당 subscriber가 대기중인 모든 eventlistener 삭제
- [x] `postEvent()` - 이벤트를 발행하여 구독하는 구독자에게 전달
- [x] 구독자에게 전달하는 부분을 구독 핸들러로 구현
- [x] `postEvent()` - 이벤트를 발행하여 구독 핸들러에 전달하도록 변경
- [x] `stringify()` - 이벤트 리스너가 등록된 현황 문자열로 표시  
  
![m1_result](https://user-images.githubusercontent.com/46566891/183483639-ae3111a7-b1b5-4f15-9136-6e8af5c557d2.png)  
출력 예시의 subscriberA ~ subscriberD를 구현하고 예시처럼 다음과 같은 순서대로 post를 실행했습니다.  
```
albumModel post "ModelDataChanged"
albumView post "ViewUpdated"
albumController post "DidShakeMotion"
dummy post "AllDataChanged"
remove subscriberD & dummy post "AllDataChanged"
```
출력이 동기방식으로 되어 있어 순서가 복잡하지만 출력 예시와 같은 결과를 볼 수 있습니다..  
## 비동기 이벤트 매니저
- [ ] `add()` 메소드에 sync, async, delay 세 가지 리스너를 추가할 수 있도록 변경
- [x] `postEvent()` 메소드에 async, delay 지원하도록 추가   
  
![m2_result](https://user-images.githubusercontent.com/46566891/183483672-1028f0b1-2820-46e5-b297-00e30508620f.png)  

미션 1의 예시에서 아래와 같이 비동기/딜레이 옵션을 추가했습니다.  
```
m.postEvent("ModelDataChanged", p1, {"data" : "abc"}, 1000); // 딜레이 1초
m.postEvent("ViewUpdated", p2, {"view" : "xxx"}, 1); // 비동기
m.postEvent("DidShakeMotion", p3, {"from" : "blue"}, 0); // 동기
m.postEvent("AllDataChanged", undefined, {"type" : "delay"}, 500); // 딜레이 0.5초
m.postEvent("AllDataChanged", undefined, {"type" : "async"}, 1); // 비동기
```
# 루카스 체크포인트
- [x] EventManager 싱글톤 인스턴스 구현
- [ ] Subscriber 추가 함수 구현 (여러 조건 수용)
- [x] Subscriber 제거 함수 구현 (여러 조건 수용)
- [x] postEvent 함수 구현
- [x] Worker Thread 동작 분리
- [ ] 조건별 매칭한 subscriber 핸들러 동작
- [ ] 핸들러 내 completed flag 지원 여부
- [ ] 구독 조건들 출력 함수 구현
- [x] 비동기 async방식 postEvent 동작 구현
- [x] 지연 delay방식 postEvent 동작 구현
- [ ] Subscriber 핸들러 처리 Event Emitter 동작 구현
# 학습 메모
## Emitter
마치 DNS처럼 이벤트가 발생했을 때 실행해야 하는 리스너 함수들의 목록을 가지고 관리함
## 동기/비동기
async / await / promise가 비동기  
다른 함수의 연산을 기다리지 않고 각자 할 일 하는게 동기  
(헷갈림)  
# Refs.
[[js] Function의 toString 이용하기 - Bsidesoft co.](https://www.bsidesoft.com/857)  

[웹 워커를 통해 이미지 색상 수집기 성능 개선하기](https://fe-developers.kakaoent.com/2022/220324-web-worker-image/)  

[Worker threads | Node.js v18.7.0 Documentation](https://nodejs.org/api/worker_threads.html)  

[Promise 작업 시간 초과하면 실패로 간주하기 (feat. setTimeout, Promise.race)](https://elvanov.com/2676)  

[[JavaScript] 디자인패턴 #Singleton](https://velog.io/@y1andyu/JavaScript-%EB%94%94%EC%9E%90%EC%9D%B8%ED%8C%A8%ED%84%B4-Singleton)  

[Observer pattern vs Pub-Sub pattern | 📝 TIL(Today I Learned)](https://til.younho9.dev/docs/cs/design-pattern/observer-pattern-vs-pub-sub-pattern/)