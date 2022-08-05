## 나만의 체크리스트

- [x] http,https 모듈을 활용해서 요청을 보내고 응답을 받기. - 완료
- [x] html함수를 밖으로 빼는서 정리 - 완료
- [x] dom parser 모듈을 통해 html parsing. - 완료
- [x] 이때 script태그의 src속성, img태그의 src속성에 있는 주소도 받기 - 완료
- [x] 가져온 링크를 요청을 보내고 응답시간 체크 - 완료
- [x] 링크 내 정보 , 파일, 등으로 도메인 스킴 경로 종류 용량 대기시간 다운시간 구성 - 완료
- [x] 메모리 캐싱 FIFO로 동작하도록 구현
- [x] 캐시된 메모리들은 로딩에 포함되지 않도록 구현
- [x] http가 들어올때도 https로 들어올 수 있게 리다이렉트
- [x] www.nexon.com -> www.nexon.com/HOME/GAME 처럼 path도 리다이렉트 받을 수 있게 구현
- [x] 최종 출력구현

## 학습정리 체크리스트

- [x] URL 입력 후 HTTP 요청 보내기 구현

- [x] HTML 파싱 - src 속성 탐색 구현

- [x] 응답 대기 시간 측정 및 출력

- [x] 다운로드 시간 측정 및 출력

- [x] 요청 도메인 개수 측정 및 출력

- [x] 전체 요청 개수 측정 및 출력

- [x] 전체 이미지 개수 측정 및 출력

- [x] 전체 코드 개수 측정 및 출력

- [x] 전체 전송 용량 측정 및 출력

- [x] 리다이렉트 개수 측정 및 출력
![끝1](https://user-images.githubusercontent.com/61281128/182908143-c6e62343-f023-42b4-8ed0-f973015701b4.PNG)
위 사진을 보면 naver.com -> http://www.naver.com -> https://www.naver.com 으로 2번 리다이렉션 되었다.
- [x] 응답 - 리소스 메모리 캐싱 구현 - FIFO방식으로 구현
![시작 2](https://user-images.githubusercontent.com/61281128/182908263-f568dd88-de96-4132-9ca8-a751848c4337.PNG)
100개의 큐를 저장할 수 있는 리소스 메모리를 구현했음.
- [x] 캐싱 데이터 측정 및 출력
![끝2](https://user-images.githubusercontent.com/61281128/182908335-1f65e37c-7387-47d1-8fa2-4849f4552ac1.PNG)
캐싱 데이터에 의해 전체 로딩시간은 888.9ms 절약되었다. 또한 약 878MB의 전송 용량도 절약되었음을 알 수 있다.

## 추가구현 필요
