체크포인트 정리하기
===

<details>
  <summary>프로세스 메모리 구조 정리하기</summary>
  <div markdown='1'>
  <br>

  자바스크립트는 **V8엔진**을 사용한다.

  ![1](https://user-images.githubusercontent.com/46989954/180129706-b1b8e979-4828-496d-a855-f4076de3afd4.png)   

  - TEXT 섹션   
    - 프로그램의 함수, 제어문, 상수 등을 포함한다.
    - 읽기만 가능하다.

  - DATA(=GVAR)&BSS 섹션
    - 범위가 정해지지 않은 전역 변수와 정적 변수를 포함한다.
  
  - HEAP 섹션
    - 동적으로 할당되는 메모리 영역이다.
    - malloc이나 new로 할당한다.

  - STACK 섹션
    - 함수를 호출했을 때 나오는 모든 데이터를 저장한다. (지역 변수, 리턴값, ...)

  </div>
</details>

<details>
  <summary>init</summary>
  <div markdown='1'>
  <br>

  - stackSize와 heapSize를 입력받는다.
  - memory 객체를 선언한다.
  - stack과 heap의 기본 주소를 return한다. (둘 다 0부터 시작하게 구현했음)   
     
  ![1](https://user-images.githubusercontent.com/46989954/180153366-ec039ce9-2851-4a44-a8f3-8eea3a1237b3.png)   
  ![2](https://user-images.githubusercontent.com/46989954/180153416-788d7621-2fc2-43a1-a0a7-942e801d8b5b.png)   
  ![image](https://user-images.githubusercontent.com/46989954/180153821-c1a4f502-7656-44eb-829c-39a8d82a3e18.png)   

  </div>
</details>

<details>
  <summary>setSize</summary>
  <div markdown='1'>
  <br>

  - type과 length를 입력받는다.
  - 만약 유효한 사이즈가 아니면 set 하지 않는다.
  - 타입들의 사이즈는 Map 객체로 만들어서 관리한다.
  - 이미 있는 타입이라면, 있다고 알려준다. + 해당 타입의 사이즈도 알려준다.
  - 없는 타입이라면, Map 객체 안에 넣어준다.   
     
   ![1](https://user-images.githubusercontent.com/46989954/180284593-ee46336d-5357-4e4b-ad14-df37d17356c5.png)   
   ![2](https://user-images.githubusercontent.com/46989954/180284618-0048cb43-d4f6-4cba-a13f-4a2e48df9338.png)   
   ![3](https://user-images.githubusercontent.com/46989954/180284647-a2545548-1d4f-4103-8617-bdd41779afd3.png)   

  </div>
</details>

<details>
  <summary>malloc</summary>
  <div markdown='1'>
  <br>

  - 없는 타입이라면, 없다고 알려준다.
  - 포인트변수 정보와 넘어온 정보가 같다면, heap에도 메모리를 추가해준다.
  - heap에 추가했다면, 정보가 담겨있던 포인트 변수에 heap 주소값을 넣어준다.
  - count만큼 pointer를 앞으로 옮겨준다.    
   
  ![2](https://user-images.githubusercontent.com/46989954/180283994-f9c30eda-3d82-4e1f-9a8f-c6b942b7e4ef.png)        
  ![1](https://user-images.githubusercontent.com/46989954/180283971-fb74c5f5-df7d-49cb-abf6-436fec8b112d.png)   
  ![3](https://user-images.githubusercontent.com/46989954/180284017-2ddb22f1-99ec-472b-a496-3a243b53d6e8.png)   

  </div>
</details>

<details>
  <summary>free</summary>
  <div markdown='1'>
  <br>

  - pointer는 포인터 변수의 idx로, heap 주소값을 가져온다.
  - 해당하는 주소에 있는 모든 값을 0으로 바꾼다.
  - 몇 번 메모리를 해제했는지 알려준다.   
  
  ![1](https://user-images.githubusercontent.com/46989954/180285463-8f2d33ce-105d-48fa-b204-e4a27a3c9b3e.png)   
  ![2](https://user-images.githubusercontent.com/46989954/180285503-52e6e2bd-938f-4863-9316-ed0fc04a32f6.png)   
  ![3](https://user-images.githubusercontent.com/46989954/180285533-abec6eb7-4a09-4f68-8215-6fe2b026019a.png)   

  </div>
</details>

<details>
  <summary>call</summary>
  <div markdown='1'>
  <br>

  - name이 8자를 넘어가면 알려준다.
  - paramCount가 0미만, 10초과면 알려준다.
  - 우선 맨 처음에 함수 정보를 stack에 할당한다.
  - paramCount만큼 포인터 변수를 할당하고, malloc을 위해 정보를 남겨놓는다.
  - stackPointer도 paramCount만큼 증가시킨다.   

  ![1](https://user-images.githubusercontent.com/46989954/180286686-d251a26e-0eb8-400e-aff5-ee2c6b2cdf6e.png)   
  ![2](https://user-images.githubusercontent.com/46989954/180286723-037c7df2-b53a-42f6-9562-192ca8b35c1c.png)   
  ![3](https://user-images.githubusercontent.com/46989954/180286749-b7da8c1f-5caa-4658-9e8a-c3286a8f4e36.png)   
  
  </div>
</details>

<details>
  <summary>returnFrom</summary>
  <div markdown='1'>
  <br>

  - 첫 번째 인자가 string인 것(=함수인 것)을 찾는다.
  - 만약 입력 받은 name이 최근 호출이 아니라면 경고문을 보여준다.
  - 함수 제외하고, 해당하는 함수의 포인트 변수들을 제거한다.   

  ![1](https://user-images.githubusercontent.com/46989954/180288378-ec198c12-5392-42d8-9d79-b6e79a7593f7.png)   
  ![2](https://user-images.githubusercontent.com/46989954/180288403-64895f01-3810-4218-b291-1ed7d06958b5.png)   
  ![3](https://user-images.githubusercontent.com/46989954/180288442-2d876162-0fe5-476d-9c6a-efe4488baf04.png)   
  ![4](https://user-images.githubusercontent.com/46989954/180288491-c81a6443-d039-46ea-bc2b-917678a4e19f.png)   

  </div>
</details>

<details>
  <summary>usage</summary>
  <div markdown='1'>
  <br>

  ![1](https://user-images.githubusercontent.com/46989954/180298089-44b545c9-4173-4062-8827-30b7eb1aed64.png)   
  ![2](https://user-images.githubusercontent.com/46989954/180298106-b17519e3-e6cf-4bcb-9343-d75a2b5f42db.png)   
  ![3](https://user-images.githubusercontent.com/46989954/180298126-f78dcc9e-d37d-4b41-a408-b2258c5b026f.png)   
  ![4](https://user-images.githubusercontent.com/46989954/180298147-96a17d6d-ef5e-42fa-935e-08e36c3114e3.png)   

  </div>
</details>

<details>
  <summary>reset</summary>
  <div markdown='1'>
  <br>

  ![1](https://user-images.githubusercontent.com/46989954/180299222-4563a853-13d7-4c5e-ab72-4ca21426aa6d.png)   
  ![2](https://user-images.githubusercontent.com/46989954/180299307-b7d9d334-9f25-4dcd-b6c6-0fe7e9549061.png)   
  ![3](https://user-images.githubusercontent.com/46989954/180299351-32b408b9-94d7-4f72-8643-1fe150ab9ee3.png)   

  </div>
</details>