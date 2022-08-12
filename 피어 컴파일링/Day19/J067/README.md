# 나만의 체크포인트
1. [x] 서버 바인딩
2. [x] client정보 콘솔 출력
## 챌린지 서버 관련
1. [x] checkin 요청 구현
    1. [x] 캠프 아이디 범위 확인 + 응답
    2. [x] 그룹 할당 후 그룹 번호 전달
2. [x] checkout 요청 구현
    1. [x] 그룹 내 다른 캠퍼에게 퇴장 안내
    2. [x] TCP 연결 종료시 checkout 처리
3. [x] mission 요청 구현
    1. [x] day 확인후 키워드 전송
4. [x] peersession 요청 구현
    1. [x] 그룹내 브로드캐스트 시작
5. [x] complete 요청 구현
   1. [x] 그룹내 브로드캐스트 종료
6. [x] message
   1. [x] 피어세션 진행중에 그룹내 브로드캐스트
   2. [x] 그 외에는 무시
7. [x] direct 요청 구현
    1. [x] 특정 캠퍼에게 전송

## 챌린지 클라이언트 관련

1. [x] 캠프아이디 입력 후 checkin 요청 campId 전송
    1. [x] 활동 시각 저장
2. [x] checkout 전송후 연결 해재
    1. [x] 체크인부터 체크아웃까지 활동 시간 출력
3. [x] peersession 요청 maxCount 전송
4. [x] complete 요청 전송
5. [x] message 요청 text 전송
6. [x] direct 요청 campId, text 전송

# 학습 메모
* [tcp socket](https://kkukkukku.dev/167)

    * `close` : 서버가 닫힌 후에 이벤트 발생
    * `connection` : 새로운 연결이 만들어지면 이벤트 발생
    * `error` : 에러 발생시 이벤트 발생, 'close'이벤트는 이 이벤트가 발생한 후 직접 호출
    * `listening` : server.listen() 함수 호출후 bind되었을 때 이벤트 발생
    * `end` : 클라이언트 소켓 세션이 끊어졌을 때(FIN Packet을 받았을 때) 이벤트 발생
    * `data` : 클라이언트 소켓으로부터 데이터를 수신받았을 때 이벤트 발생
    * `timeout` : 소켓 세션이 비활성화 되었을 때 시간 초과될 때 발생되는 이벤트

* [tcp socket 서버 구현](https://mylko72.gitbooks.io/node-js/content/chapter8/chapter8_3.html)
* [ms to time](https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=magnking&logNo=221164677877)



# 실행방법

1. `npm i`
2. `node server.js` - TCP서버 켜기
3. `node index.js` - 클라이언트 켜기

# 실행결과

## 미션1

<img width="469" alt="image" src="https://user-images.githubusercontent.com/63294532/184071078-d8c1bd84-0197-4a15-aa9f-51edd3c36574.png">

<img width="245" alt="image" src="https://user-images.githubusercontent.com/63294532/184071146-4083b7e5-8f21-41e7-bc8b-9283255596da.png">

## 미션2

* Checkin
  
    * 성공

        <img width="494" alt="image" src="https://user-images.githubusercontent.com/63294532/184182930-7b3413b3-20d4-4ae9-b6a9-e8de5c2fa56b.png">

    * 유효하지 않은 범위의 숫자일 경우

        <img width="494" alt="image" src="https://user-images.githubusercontent.com/63294532/184183276-04fc2d72-7d2a-43b4-ab89-453838340782.png">

* mission

    * 성공

        <img width="429" alt="image" src="https://user-images.githubusercontent.com/63294532/184183611-7a8af77b-8a23-46b3-a711-d71f0f3c8f2d.png">

    * 유효하지 않은 날짜일 경우

        <img width="429" alt="image" src="https://user-images.githubusercontent.com/63294532/184183705-8aa2d5e8-df3a-4bed-a5c0-538206de759c.png">

* peersession

    <img width="518" alt="image" src="https://user-images.githubusercontent.com/63294532/184185070-6204172c-269c-4d18-a4cd-06de96fa194b.png">
    
* message

    * 피어세션 진행 중(성공)

        <img width="500" alt="image" src="https://user-images.githubusercontent.com/63294532/184186526-10f4fbc0-ab4c-4b5c-9873-cfda86133ba8.png">

    * 피어세션 종료 후에는 무시(아무것도 안뜸)
    * 메세지 개수 초과할 경우

        <img width="504" alt="image" src="https://user-images.githubusercontent.com/63294532/184186947-92391b10-6d7b-4c31-b231-872ba4b5d5f7.png">

* complete

    * 호스트(피어세션을 신청한 캠퍼)가 종료를 요청할 경우(실패)

        <img width="474" alt="image" src="https://user-images.githubusercontent.com/63294532/184187518-3dff6cd5-669e-42fb-b16c-c18afb7ecf96.png">

    * 호스트가 종료할 경우(성공)

        <img width="509" alt="image" src="https://user-images.githubusercontent.com/63294532/184187819-26673ed2-2ab4-4376-b9ae-c1a54ebcdf2d.png">

* direct

    * 수신자가 체크인한 경우(성공)

        <img width="475" alt="image" src="https://user-images.githubusercontent.com/63294532/184188966-b06b7f96-ee13-4e24-bf4f-c3a0f7649516.png">

    * 수신자가 체크인하지 않은 경우(실패)

        <img width="407" alt="image" src="https://user-images.githubusercontent.com/63294532/184188312-2f7af36f-509f-4598-8640-ded5fdeb207a.png">

* checkout
    
    * 피어세션 중에는 체크아웃불가능(실패)

        <img width="509" alt="image" src="https://user-images.githubusercontent.com/63294532/184189301-fe09cf0e-15f5-4e35-aa2b-c57f9c95a3d8.png">

    * 정상 체크아웃 - 활동시간 표시

        <img width="438" alt="image" src="https://user-images.githubusercontent.com/63294532/184189433-58b30ec6-81cf-44fc-a104-dfa9e5be3d9e.png">

    * 강제종료시 체크아웃

        <img width="493" alt="image" src="https://user-images.githubusercontent.com/63294532/184189606-45a1ef74-432d-454c-9dae-ac232068f85d.png">

