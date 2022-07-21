# 나만의 체크포인트
### 키워드 검색 크롤링
- [x] 데이터 크롤링을 위한 패키지 설치
  ```bash
  npm install axios cheerio iconv-lite -s
  ```
- [x] 검색 키워드 인코딩
    <details>
    <summary>결과</summary>
    <div markdown="1">
    <img src="https://user-images.githubusercontent.com/74449232/179897133-9f37bec4-07c7-4102-a255-6d5fa2f2e416.png"/>
    </div>
    </details>
- [x] 검색 사이트 분석  
    개발자 도구를 통해 태그 속성을 확인했음!
    <details>
    <summary>결과</summary>
    <div markdown="1">
    <img src="https://user-images.githubusercontent.com/74449232/179922492-a489d4c3-2288-4400-aff2-c60ec690cad5.png"/>
    </div>
    </details>
- [x] 키워드 넣어서 사이트에 검색하고  
    검색 결과 제목, 링크 주소, 미리보기 내용 추출하기
    <details>
    <summary>결과</summary>
    <div markdown="1">
    <img src="https://user-images.githubusercontent.com/74449232/179925530-f649bcf8-a761-480e-a371-4031ee4adfd3.png"/>
    </div>
    </details>


<br><br>

### 검색 프로그램
- [x] 반복 입력받기
    <details>
    <summary>결과</summary>
    <div markdown="1">
    <img src="https://user-images.githubusercontent.com/74449232/179950446-fe22b298-7733-4525-a76c-b709fab69804.png"/>
    </div>
    </details>
- [x] 크롤링 파일 불러오기
- [x] LRU 캐시 구현
    <details>
    <summary>결과</summary>
    <div markdown="1">
    <img src="https://user-images.githubusercontent.com/74449232/180050808-a7fcfcf3-9bce-4add-a3af-85ea302f9068.png"/>  
    <img src="https://user-images.githubusercontent.com/74449232/180051273-17587336-fd02-4be8-88bd-06baf740dbb2.png"/>
    </div>
    </details>
- [x] $cache 입력시 LRU 캐시에 저장된 키워드 목록과 hitCount 출력
    <details>
    <summary>결과</summary>
    <div markdown="1">
    <img src="https://user-images.githubusercontent.com/74449232/180050418-0584c747-b540-4db2-9abb-667aa83670ad.png"/>
    </div>
    </details>

<br><br>

# 학습메모
> ### Node.js gitignore
- 참고링크 : https://jin2rang.tistory.com/entry/nodejs-git-ignore

<br>

> ### 크롤링 관련 패키지 설치
- axios : 외부의 웹브라우저에 요청해서 특정 HTML을 내려받기 위해 필요한 패키지
- cheerio : HTML 코드에서 특정 위치(depth)를 가져오기 위함
- iconv-lite : HTML에 한글이 포함되어 있을 시 발생할 수 있는 문제 해결을 위함
- 참고링크 : https://thisisprogrammingworld.tistory.com/136

<br>

> ### 크롤링
- url parameter 인코딩
  ```javascript
  var text1 = "안녕하세요";
  var text2 = "hello world";

  console.log(encodeURIComponent(text1)); // %EC%95%88%EB%85%95%ED%95%98%EC%84%B8%EC%9A%94
  console.log(encodeURIComponent(text2)); // hello%20world
  ```
- 참고링크  
  https://sangminem.tistory.com/28  
  https://dltjdgur327.tistory.com/13  
  https://velog.io/@yesdoing/Node.js-%EC%97%90%EC%84%9C-%EC%9B%B9-%ED%81%AC%EB%A1%A4%EB%A7%81%ED%95%98%EA%B8%B0-wtjugync1m  

<br>

> ### 공백제거
```javascript
var temp = ' 5 2';
console.log(temp.trim());   // '5 2'
```
- 참고링크  
  https://developer-talk.tistory.com/176  

<br>

> ### LRU
- 참고링크  
  https://blo9.xyz/2020/08/10/Coding/Algorithm/JavaScript1/lru_cache/  
