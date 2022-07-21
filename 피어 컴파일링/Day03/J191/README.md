### 실행하기
**`npm install cheerio-httpcli` 모듈 설치** <br>
**`node io.js` 명령으로 실행** <br>

# 나만의 체크포인트
- [X]  node.js 기반 크롤링 처리 도구 서칭 </br>
`npm install cheerio-httpcli` 모듈 설치
- [X]  크롤링 데이터 호출 확인
- [X]  검색결과에서 링크 주소 추출 확인
- [X]  검색결과에서 제목 추출 확인
- [X]  검색결과에서 미리보기 내용 추출 확인
- [X]  표준 입력 형식으로 키워드 받기
- [X]  검색한 키워드는  LRU 캐시에 저장
- [X]  LRU 캐시 저장할 수 있는 키워드 개수와 키워드별 데이터 개수는 생성 또는 초기화 시점에 지정
- [X]  LRU 캐시가 최근에 검색한 단어는 5개, 데이터는 10개까지 기록하도록 초기화 + 정책적으로 변경할 수 있도록 구현
- [X]  캐시에서 get 할 때마다 hit가 되면 hitCount를 증가
- [X]  캐시에 set할 때는 이전에 동일한 키가 있으면 업데이트
- [X]  키가 없으면 LRU 캐시에서 가장 오래전에 검색한 것을 지우고 새로 추가
- [X]  캐시에 저장할 때는 키워드와 결과가 1:n 구조를 가지도록 저장
- [X]  LRU 캐시를 저장된 단어인지 우선 확인하고, 있을 경우는 저장된 내용을 이용해서 표시
- [X]  캐시에서 찾아서 표시하는 경우는 캐시된 정보라는 것을 표시
- [X]  키워드에 $cache를 입력하면 현재 LRU 캐시에 저장된 키워드 목록과 hitCount를 출력


# 학습 
### reference
|content|🔗|
|:---|:---:|
|LRU cache|[link](https://progressivecoder.com/wp-content/cache/all/lru-cache-implementation-using-javascript-linked-list-and-objects/index.html)|
|크롤링 모듈|[link](https://www.npmjs.com/package/cheerio-httpcli)|
|비동기/동기|[link](https://joshua1988.github.io/web-development/javascript/promise-for-beginners/)|
|모듈 사용|[link](https://velog.io/@bining/node.js-%EB%AA%A8%EB%93%88-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0-Common-JS)|