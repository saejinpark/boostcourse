체크포인트 정리하기
===================

### 키워드 검색 크롤링
<details>
<summary>크롤링이 무엇인지 정리하기</summary>
<div markdown="1">   
<br>

_" Web scraping, web harvesting, or web data extraction is data scraping used for extracting data from websits "_   

- **프로세스**
  - 대상 선정
    크롤링 하고 싶은 홈페이지의 URL을 선정하는 과정
   - 데이터 로드
    URL의 HTML을 가져오는 과정 
   - 데이터 분석
    어떤 데이터를 수집할지, 수집하지 않을지 선정하는 과정
   - 수집
    선정된 데이터를 추출하여 메모리상에 저장하는 과정
</div>
</details>

<details>
<summary>필요한 라이브러리 찾고, 정리하기</summary>
<div markdown="1">
<br>

**1. axios**

```
  npm install axios
```

  브라우저와 node 환경에서 사용하는 Promise 기반의 HTTP Client로, 사이트의 HTML을 가져올 수 있다.
  
**2. cheerio**

```
  npm install cheerio
```
  DOM Selector 기능을 제공하여 axios로 받은 데이터에서 필요한 데이터만 수집할 수 있다. 
  
</div>
</details>

<details>
<summary>대상 선정하기</summary>
<div markdown="1">
<br>

- 키워드를 입력하면 키워드에 대한 뉴스가 나오도록 함 
  - 검색사이트 : https://naver.com
  - 검색 방법 : https://search.naver.com/search.naver?where=news&ie=utf8&sm=nws_hty&query=${키워드}
  
</div>
</details>

<details>
<summary>데이터 로드</summary>
<div markdown="1">
<br>

- axios를 통해 HTML을 가져온다.   
![1](https://user-images.githubusercontent.com/46989954/179901595-6d9b6f86-51b7-4574-bbfb-00a949ea5e64.png)

</div>
</details>

<details>
<summary>데이터 분석</summary>
<div markdown="1">
<br>

- 가져올 데이터
  - 제목
  - 링크
  - 미리보기
  
- class 목록
![1](https://user-images.githubusercontent.com/46989954/179913840-27ee6cea-13f1-4d4a-9f67-01deb60ba041.png)   

```
  #main_pack section.sc_new.sp_nnews._prs_nws div div.group_news ul li
    div.news_wrap.api_ani_send
      div
        a.news_tit  // 제목 & URL
      div.news_dsc 
        div
          a         // 미리보기
```        
      
    

</div>
</details>

<details>
<summary>수집</summary>
<div markdown="1">
<br>

- 뉴스 리스트 가져오기
  ![1](https://user-images.githubusercontent.com/46989954/179916925-3f0ae5be-d215-4f9d-b492-2cabd1a68108.png)   
- 수집할 데이터만 가져와서 저장하기
  ![2](https://user-images.githubusercontent.com/46989954/179917024-0f2706ca-da0e-434e-bb35-5c514d26221b.png)   
</div>
</details>

<details>
<summary>결과 캡처하기</summary>
<div markdown="1">
<br>

- 전체 코드
  ![1](https://user-images.githubusercontent.com/46989954/179921930-f3dd07d5-a943-4a1e-bc91-0e62a2e32255.png)   
- 결과
  ![2](https://user-images.githubusercontent.com/46989954/179921994-f2358700-07bd-49ce-a16f-9367741dd456.png)

</div>
</details>

### 키워드 검색 크롤링
<details>
<summary>LRU 캐시 동작이 무엇인지 정리하기</summary>
<div markdown="1">   
<br>
  
  - LRU 캐시 (=Least Recently Used Cache)
    가장 오랫동안 사용되지 않았던 Cache를 메모리에서 삭제하는 알고리즘이다. 
  
  - 구현
    - Double Linked List (= Queue)를 통해 구현된다.
    - head에 가까울수록 최근 데이터이며, tail에 가까울수록 오래된 데이터이다.   
    ![1](https://user-images.githubusercontent.com/46989954/179924001-25a14ac0-efa7-4d97-978b-2522f717f34c.png)
    
</div>
</details>

<details>
<summary>크롤링 코드에서 키워드를 입력받아 사용할 수 있게 변경</summary>
<div markdown="1">   
<br>
  
- 데이터를 가져오는 속도보다 끝나는 속도가 빠르기 때문에 Promise/async/await 사용 해야해서 코드를 전체 수정했다.
  - 입력 함수   
    ![1](https://user-images.githubusercontent.com/46989954/179979199-defba008-3c05-4058-a7af-3b73b388c9d3.png)   
  
  - 크롤링 함수   
    ![2](https://user-images.githubusercontent.com/46989954/179979301-963d51a5-2734-4c07-a514-4bdbb65e6e97.png)   
    
</div>
</details>

<details>
<summary>크롤링 코드와 입력 코드 모듈 분리</summary>
<div markdown="1">   
<br>
  
- commonjs와 es6 modules를 둘 다 사용할 수 없어 **commonjs**를 사용하기로 했다.    
  ( import -> require / export -> module.exports )
  
  - crawler.js   
    ![1](https://user-images.githubusercontent.com/46989954/179983974-8cd66a5d-350e-47ae-9b8f-3bf964dd140c.png)   

  - input.js   
    ![2](https://user-images.githubusercontent.com/46989954/179984112-b8a3868d-8424-41ed-ae25-ed9be7e77fdd.png)   
</div>
</details>

<details>
<summary>여러 키워드를 입력할 수 있도록 변경하기</summary>
<div markdown="1">   
<br>
  
- callBackReadline이라는 콜백함수를 만들어서 특정 키워드가 나올 때까지 반복해서 받을 수 있게 구현했다. (임시로 $cache 넣어둠)   
  ![1](https://user-images.githubusercontent.com/46989954/179995828-88ff0ca7-d8fd-4804-8076-349a78fb76d4.png)   
  ![2](https://user-images.githubusercontent.com/46989954/179996775-0a30a981-bca5-46ae-b90f-d79aa5222dd6.png)

</div>
</details>

<details>
<summary>캐시 코드 구현하기</summary>
<div markdown="1">   
<br>
  
**모호한 부분이 있어 set & get 기능을 재구성함**   
- SET   
  **cache에 해당 키워드가 없을 때**   
  - keywordSize가 제한을 넘어가면
    - 맨 앞(오래된) keyword를 제거
  - 새로운 keyword 추가   
![111](https://user-images.githubusercontent.com/46989954/180033880-bf5513f0-5822-4581-8c8b-80beea8161f4.png)   

- GET   
  **cache에 해당 키워드가 있을 때**   
  - 저장된 뉴스를 보여줌
  - 보여준 뒤, hitCnt 증가
  - 보여준 뒤, 뉴스 업데이트    
![222](https://user-images.githubusercontent.com/46989954/180033928-713fae2d-24b0-448d-a678-51a77b93ab2a.png)   
 
</div>
</details>

<details>
<summary>결과 이미지</summary>
<div markdown="1">   
<br>
  
1. naver 첫 입력   
  ![1](https://user-images.githubusercontent.com/46989954/180035318-de765a9a-9403-4759-a57d-85885478efb9.png)   
2. boostcamp 첫 입력 
  ![2](https://user-images.githubusercontent.com/46989954/180035361-acb9c69a-6e9c-4c4d-b07d-bedda45f090b.png)   
3. connect 첫 입력
  ![3](https://user-images.githubusercontent.com/46989954/180035433-24334a43-94c0-43ac-affc-05df3191524f.png)   
4. web 첫 입력   
  ![4](https://user-images.githubusercontent.com/46989954/180035467-1b3b7590-c9ca-4973-b4c1-f151f7efaa7a.png)   
5. mobile 첫 입력   
  ![5](https://user-images.githubusercontent.com/46989954/180035506-381be9e7-ff69-45e7-94e5-0c4516e750a0.png)   
6. $cache 확인   
  ![6](https://user-images.githubusercontent.com/46989954/180035537-eee7aef9-9959-4b32-9fbd-7494b6fc4326.png)   
7. boostcamp 두 번째 입력   
  ![7](https://user-images.githubusercontent.com/46989954/180035581-94063935-a398-418f-a6b7-070dea851f10.png)   
8. $cache 확인   
  ![8](https://user-images.githubusercontent.com/46989954/180035663-5044431b-0c0d-476a-8efc-74522634801c.png)   
9. plus 첫 입력 -> 5개가 넘어가서 오래된 naver 삭제   
  ![9](https://user-images.githubusercontent.com/46989954/180035705-6a063464-b924-4dc0-8085-597d7da00d88.png)   
10. $cache 확인   
  ![10](https://user-images.githubusercontent.com/46989954/180035744-9640c0a0-37a4-4be2-82dc-e8eec638e6b6.png)   
11. exit으로 빠져나갈 수 있음    
  ![11](https://user-images.githubusercontent.com/46989954/180035764-131a03df-c8dd-432b-9138-62da935f0130.png)   
</div>
</details>