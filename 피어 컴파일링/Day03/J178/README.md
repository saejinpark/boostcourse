# 나만의 체크 포인트

< 키워드 검색 크롤링 >

- [x] 특정한 검색 엔진에서 원하는 단어를 검색 기능 구현
- [x] 크롤링 도구로 검색 결과를 출력 기능 구현
- [x] node.js 기반 크롤링 처리 도구 또는 모듈을 학습 및 활용
- [x] 검색 결과 HTML에서 제목, 링크 주소, 미리보기 내용을 추출하도록 구현

< 검색 프로그램 >

- [x] 콘솔에서 프로그램을 실행 시 키워드를 입력 기능 구현
- [x] 크롤링해서 결과를 가져오는 모듈 파일 구현
- [ ] LRU 캐시 묘듈 파일 구현
- [ ] 입출을 담당하는 콘솔프로그램 파일 구현 
- [ ] 검색한 키워드는 LRU 캐시에 저장
- [ ] LRU 캐시 저장할 수 있는 키워드 개수 5개, 키워드별 데이터 개수 10개를 기록하도록 초기화 시점에 지정
- [ ] 캐시의 set동작 구현
- [ ] 캐시의 get동작 구현
- [ ] 캐시에 저장할 시 키워드와 결과가 1:n 구조를 가지도록 데이터 구조 정리
- [ ] LRU 캐시를 저장된 단언지 우선 확인 후, 있을 시 저장된 데이터 표시
- [ ] 캐시에 hit 되어서 표시한 경우, 캐시된 정보라는 것을 표시
- [ ] 키워드에 $cache를 입력하면 현재 LRU 캐시에 저장된 키워드 목록과 hitCount 출력

# 학습 메모

웹 크롤러는 스파이더 또는 검색엔진 봇이라고 하며, 전체 인터넷에서 콘텐츠를 다운로드하고 색인을 생성합니다.
크롤링 : 소프트웨어 프로그램을 통해 자동으로 웹사이트에 액세스하여 데이터를 얻는 일
검색 색인화 : 정보를 필요로 하는 사람에게 인터넷의 어디에서 그 정보를 찾을 수 있는 알려주기 위해 검색 엔진이 만드는, 인터넷의 도서관 카드 카탈로그 (like 태그)
메타데이터 : 웹사이트가 무엇에 대한 것인지 알려주는 데이터를 뜻함.

주요 검색 엔진의 봇
- Google: Googlebot
- Bing: Bingbot
- Yandex(러시아 검색엔진): Yandex Bot
- Baidu(중국 검색엔진): Baidu Spider

node 기반 크롤링 라이브러리
npm 패키지 의존성 관리 도구를 설정해서 사용가능
- Crawler
- Axios : 브라우저와 Node 환경에서 사용하는 Promise 기반의 HTTP Client로 사이트의 HTML을 가져올 때 사용할 라이브러리입니다.
- Cheerio : Node.js 환경에서 JQuery 처럼 DOM Selector 기능들을 제공합니다. Axios의 결과로 받은 데이터에서 필요한 데이터를 추출하는데 사용하는 라이브러리 입니다.

HTTP 요청을 만들어서 보내고 응답으로 받은 페이지 내용을 분석하는 방식을 주로 사용

<br>

# 결과

<strong> 검색 기능 및 출력 기능 구현 </strong>

![searchPrint](https://user-images.githubusercontent.com/73741112/179936598-fbaa034a-2cf7-4720-95ea-d555ff309e90.png)

<strong> 크롤링 도구 (Cheerio-httpcli) </strong>

사용가이드

- npm을 이용하여 Cheerio-httpcli 설치 

```bash
$ npm install cheerio-httpcli
```

- Cheerio-httpcli 활용을 위한 import

![cheerio](https://user-images.githubusercontent.com/73741112/179933430-a4bda855-d7ee-4f6e-8896-519ef20bab09.png)


<strong> 검색결과를 내용을 추출 후 구현 </strong>

![result output](https://user-images.githubusercontent.com/73741112/179934452-22e4d1cf-6a4d-47c5-bc90-9ac5924a7243.png)

<strong> 콘솔에서 프로그램을 실행 시 키워드를 입력 기능 구현 </strong>

- readline 모듈을 사용하여 입력 기능을 구현하였습니다.

![inputoutput](https://user-images.githubusercontent.com/73741112/179938883-94c7792e-c213-487b-b7c5-1721db9f37be.png)

<strong> 크롤링해서 결과를 가져오는 모듈 파일 구현 </strong>

- cheerio-httpcli 모듈을 사용하여 크로링과 결괄를 가져오는 기능을 구현하였습니다.

![code](https://user-images.githubusercontent.com/73741112/179945082-32f04a81-2f1d-42a0-a9e8-2dc04e80860a.png)

- 실행화면

![outputimage](https://user-images.githubusercontent.com/73741112/179945092-c352bf31-b3ee-4257-b95b-2648f9da31fc.png)

