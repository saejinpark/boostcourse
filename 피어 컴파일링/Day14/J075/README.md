### !!!! 테스트 시 시나리오 !!!!
- 아직 예외처리가 완벽하게 구현되지 않아 오류가 발생할 수 있습니다. 또한 http는 지원하지 않습니다.
- 캐시 동작 여부는 변수를 통해 직접 설정해 주셔야 합니다. 
- 넥슨이 리다이렉트도 되고, src개수도 적어서 테스트하실 때 보기 편하실 것 같습니다. 
- 1. useCache = false, url: https://www.nexon.com --> 파일을 메모리에 캐싱해 저장(cache.json)
- 2. useCache = true, url: https://www.nexon.com --> 캐싱 데이터 가져와 표시

# 구현 결과
- [X] URL 입력 후 HTTP 요청 보내기 구현
    - <img width="550" alt="스크린샷 2022-08-05 오전 7 03 27" src="https://user-images.githubusercontent.com/26318372/182961640-90d2ccff-6eb9-45c4-be7e-33cb7ebaac7f.png">
    - request-processer.js > getHTTPs 함수로 구현
- [X] HTML 파싱 - src 속성 탐색 구현
    - request-processer.js > getSRC 함수로 구현
- [X] 응답 대기 시간 측정 및 출력
- [X] 다운로드 시간 측정 및 출력
    - <img width="553" alt="스크린샷 2022-08-05 오전 7 10 03" src="https://user-images.githubusercontent.com/26318372/182961656-aa250975-59ad-401b-8663-fec921fbf705.png">
- [X] 요청 도메인 개수 측정 및 출력
- [X] 전체 요청 개수 측정 및 출력
- [X] 전체 이미지 개수 측정 및 출력
- [X] 전체 코드 개수 측정 및 출력
- [X] 전체 전송 용량 측정 및 출력
- [X] 리다이렉트 개수 측정 및 출력
    - https://www.nexon.com 이 /home/game으로 리다이렉트가 됩니다. 
    - <img width="614" alt="스크린샷 2022-08-05 오전 7 11 49" src="https://user-images.githubusercontent.com/26318372/182961659-64f5ff6b-9c73-4dd6-8d89-9e5ed2d61b0b.png">
    - <img width="845" alt="스크린샷 2022-08-05 오전 7 10 26" src="https://user-images.githubusercontent.com/26318372/182961658-7d926002-c86a-493b-b181-54ab17c59c6a.png">
- [X] 응답 - 리소스 메모리 캐싱 구현
    - <img width="468" alt="스크린샷 2022-08-05 오전 7 17 42" src="https://user-images.githubusercontent.com/26318372/182962206-815afed8-5e14-46ef-b7ae-c044b51b0380.png">
- [X] 캐싱 데이터 측정 및 출력
    - <img width="776" alt="스크린샷 2022-08-05 오전 7 12 39" src="https://user-images.githubusercontent.com/26318372/182961663-c5dca114-a5c4-4f62-a0da-88ff40d8eb5f.png">
- 캐시를 쓰면 로딩 데이터가 얼마나 빨라지는지 보았다. 안썼을 때는 네이버 기준 5805ms, 쓰면 2126ms 으로 절반 이상 빨라졌음을 확인할 수 있었다. 
- <img width="1002" alt="스크린샷 2022-08-05 오전 7 44 14" src="https://user-images.githubusercontent.com/26318372/182966321-b9a8c864-d8d8-4b58-9472-274592f83227.png">
- <img width="995" alt="스크린샷 2022-08-05 오전 7 44 45" src="https://user-images.githubusercontent.com/26318372/182966343-a7cda51a-9015-4f5d-97f5-549017a5f832.png">

# 나만의 체크포인트
## 기능
- [X] url 입력 시 유효성 검증
- [X] http/https 모듈을 활용해서 요청을 보내고 응답 받기
- [X] Parser 모듈을 활용해서 응답에 포함된 HTML 을 분석
- [X] script 태그의 src 속성, img 태그의 src 속성에 있는 주소도 다시 요청을 보내서 받는다.
- [X] 모든 요청을 보낸 시각, 요청에 대한 응답을 받은 시각, 다운로드가 끝난 종료 시각을 모두 기록
- [X] 요청 URL을 기준으로 이미지(png, gif, jpg)와 코드(css, js) 파일들은 메모리에 캐싱
- [X] 캐시 데이터를 사용하면 로딩이 얼마나 빨라지는 지 비교
- [X] 캐시 방식은 LRU 캐시 말고 다른 방식으로 스스로 판단하고 결정

# 학습 메모

## 구현 과정
- http/https 모듈을 활용해서 요청을 보내고 응답 받기
    - 저번 크롤링 미션 때 사용한 Axios, Cheerio 조합을 사용하기로했다. -> 다시 읽어보니 http/https 모듈 사용이어서 다시 바꿈. 
    - ~~axios: 브라우저와 Node 환경에서 사용하는 Promise 기반의 HTTP Client로 사이트의 HTML을 가져올 때 사용할 라이브러리~~
    - ~~cheerio: Node.js 환경에서 JQuery 처럼 DOM Selector 기능들을 제공~~
- async와 await, promise
    - 최종 결과에 모든 결과가 누적되어야 하는데, 하나의 값만 나오는 이상한 현상이 있었다. 동기, 비동기처리의 문제인 줄 알고 이를 공부했다.
    - function 앞에 async가 붙으면 항상 프로미스 반환 -> 프로미스 아니더라도 프로미스로 값을 감쌈. (promise 붙여서 반환하는 거랑 동일) 
    - await -> async 함수 안에서만 동작. 프로미스가 처리될 때까지 기다림
    - 하지만 비동기 처리를 구현해도 안됐다. 결국 constructor를 지우고 static으로 공용 변수를 만들어서 해결할 수 있었다.
- static
    - 정적 메서드는 어떤 특정한 객체가 아닌 클래스에 속한 함수를 구현하고자 할 때 주로 사용
    - 정적 프로퍼티도 물론 만들 수 있습니다. 정적 프로퍼티는 일반 클래스 프로퍼티와 유사하게 생겼는데 앞에 static이 붙는다는 점만 다름
    - 프로퍼티를 직접 할당한 것과 동일하게 동작
    - 모든 결과가 누적안되는 문제를 static을 통해 해결했다. 하지만 나는 클래스 객체를 하나만 만들어서 사용했기 떄문에 static을 사용하는 것과 this를 사용하는 것이 차이가 없다고 생각한다. 하지만 this로 줄때는 안됐음.... 피어세션 때 여쭤봐야겠다. 
    - 코드 고치다가 발견함.... 함수 나눠줬는데 클래스를 하나 더 만들고 있었음....
- 리다이렉트 처리
    - 리다이렉트 처리를 하려고 하니까 기존에 썼던 프로미스가 문제가 됐다. 이를 고치니까 비동기 문제가 생겼고, 프로미스를 리턴하는 함수를 하나 더 만들어서 해결할 수 있었다. 
- web cache
    - 캐시 구현은 브라우저 캐시와 최대한 비슷하게 구현해보려고 한다. 
    - 본래 캐시 정책
        - 캐쉬된 데이터는 캐쉬의 만료일자(expired) 혹은 만료시간(max-age)이 아직 남아있는경우 의해 최신상태인 것으로 인정
        - 캐쉬가 최신 상태가 아닐(stale)경우 클라이언트는 서버에 유효성 검사(validation) 요청을 보내서 캐쉬에 존재하는 데이터를 새로 내려받지 않아도 아직 유효한지 검사
        - 유효하지 않을경우 전체 재전송이 일어나며, 유효할경우에는 재전송이 일어나지 않음
    - 구현할 캐시 정책
        - 캐시 저장 시 max-age를 저장. 없다면 기본값으로 진행
        - 캐시된 데이터는 만료 시간이 남아있는 경우 최신 상태인 것으로 인정.
        - 캐시가 만료시간이 지났으면, 유효성 검사를 통과했다고 가정하고 캐시 만료시간 업데이트.


## 학습 키워드
- http / https
- response / requenst
- cache

## 참고 자료
- html request& parsing
    - https://onlydev.tistory.com/103
- chreeo 공식 문서
    - https://cheerio.js.org/classes/Cheerio.html#cheerio
- axios 공식 문서
    - https://axios-http.com/kr/docs/intro
- async
    - https://ko.javascript.info/async-await
- set
    - https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Set
- static
    - https://ko.javascript.info/static-properties-methods
- web cache
    - https://cyberx.tistory.com/9
    - https://icecreamie.tistory.com/52