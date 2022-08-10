# 나만의 체크포인트
## 메뉴 주문 이벤트
- [x] 전체적으로 사용할 eventHandler 만들기
- [x] `POS` : 메뉴 주문을 받아 주문 대기큐에 추가
- [x] 대기 큐에 들어있는 이벤트를 꺼내 처리하는 이벤트 루퍼를 별도 객체로 구현
- [x] `Manager` : 주기적으로 주문 대기큐에서 이벤트를 확인하고 주문을 요리사에게 작업 이벤트로 전달
- [x] `Chef` : 이벤트 큐를 받아 메뉴를 만든다
- [x] `Dashboard` : 메뉴 제작 현황 출력
## 배달 시뮬레이션
- [x] 요리사 한 번에 2개 메뉴까지 만들 수 있게 변경
- [x] 한 번에 여러 주문이 가능하게 변경, 한번에 들어온 주문 그룹핑
- [x] 요리사를 여러 명 선언할 수 있게 변경
- [x] 요리사가 3명 이상일 경우 전담하는 요리를 설정
- [x] 배달기사 추가
- [x] 매니저가 배달기사도 관리

## 구조 설계도
![image](https://user-images.githubusercontent.com/46566891/183686532-9b60d143-bfe2-4bf7-bdda-4fc2b83426e6.png)  
클래스간의 연결은 위 그림과 같이 되어있으며 모든 클래스가 Emitter 클래스를 참조하여 Event를 emit하고 handler를 추가한다.  
발생할 수 있는 Event 종류는 아래와 같다.
![image](https://user-images.githubusercontent.com/46566891/183686610-b9c209d0-a414-4e80-90d6-5f2bb96643da.png)  
  
# 피어 컴파일링을 위한 설명  
`global.js` 파일에서 menu, 프로그램 상 1초의 실제시간(ms), `Chef`와 `Delivery`의 수를 정할 수 있습니다.  
`node main.js`로 실행 가능하며, 별도의 패키지 인스톨 요구하지 않습니다.  
`Dashboard` 클래스가 새 입력, 요리의 완성, 배달의 시작과 완료 등에 현황판을 출력하도록 이벤트 핸들러가 선언되어 있습니다.  
별도의 자동 종료는 지원하지 않습니다 ㅠㅠ  


# 학습 메모
## 설계
대기 큐를 처리하는 이벤트 루퍼가 매니저 아닌가?  
POS -> Queue에 추가 = Publisher  
Manager -> Queue를 구독  
  
Manager -> Chef에게 할 일 추가 = Publisher  
  
Dashboard -> Queue와 Chef를 구독  
  
이런 관점에서 POS - Queue - Manager가 Pub - Sub 구조를 이루고 있고  
Queue와 Chef는 Pub-Sub 구조의 Emitter(broker) 역할을 하고  
Dashboard는 이 두 Emitter의 모든 이벤트를 구독함  
  
chef는 여러명일 수 있으니 Chef array를 관리하는 handler를 따로 만들어야 함  
  
쓰레드를 사용하지 않으니 핸들러 마구 사용해도 OK  
