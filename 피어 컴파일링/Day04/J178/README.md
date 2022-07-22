# 나만의 체크 포인트

- [x] 함수 프로토 타입
- [x] init 함수 구현
- [x] setSize 함수 구현
- [x] malloc 함수 구현
- [x] free 함수 구현
- [x] call 함수 구현
- [x] returnFrom 함수 구현
- [x] usage 함수 구현
- [x] callstack 함수 구현
- [x] heapdump 함수 구현
- [x] garbageCollect 함수 구현
- [x] reset 함수 구현
- [x] 메모리 객체 구현
- [x] 별도 파일로 return 값 출력 확인

# 학습 메모

<h3> try..catch </h3>

- 문법
    
    ```jsx
    try {
      // try_statements
    } catch (error) {
      // catch_statements
    } finally {
      // finally_statements
    }
    ```
    
    - throw Error
    
    ```jsx
    throw new Error('message');
    ```
    
    - 참고
    
    ['try..catch'와 에러 핸들링](https://ko.javascript.info/try-catch)

<h3> map method </h3>

- new Map() – 맵을 만듭니다.
- map.set(key, value) – key를 이용해 value를 저장합니다.
- map.get(key) – key에 해당하는 값을 반환합니다. key가 존재하지 않으면  undefined를 반환합니다.
- map.has(key) – key가 존재하면 true, 존재하지 않으면 false를 반환합니다.
- map.delete(key) – key에 해당하는 값을 삭제합니다.
- map.clear() – 맵 안의 모든 요소를 제거합니다.
- map.size – 요소의 개수를 반환합니다.


# 결과

해당 결과는 outputController.js 파일 내에서 각 함수 기능 및 반환값에 맞춰 console.log 함수를 이용해 출력한 결과입니다.

- init 함수 구현

반환값은 기본 주소(Base Adderess) = 0x00000000입니다.

<img width="402" alt="input1" src="https://user-images.githubusercontent.com/73741112/180265348-dc31a287-c0c8-4b12-9234-e650cafa99fb.png">

<img width="221" alt="output1" src="https://user-images.githubusercontent.com/73741112/180265345-f8a14c48-42d3-40d2-a531-f0c24da5b672.png">

- setSize 함수 구현

type별 고유사이즈를 등록, Map 구조에 저장된 type 별 고유사이즈를 출력한 결과입니다.

<img width="389" alt="input2" src="https://user-images.githubusercontent.com/73741112/180265340-6158727a-f956-48ed-ba78-8b5e5b5c91e1.png">


<img width="303" alt="output2" src="https://user-images.githubusercontent.com/73741112/180265339-3e7d9c43-2fbb-4c8d-b662-aea2ea33deba.png">


- malloc 함수 구현

스택영역에 힙 영역 주소를 저장하고 시작위치 스택 주소값을 반환값을 출력한 결과입니다.

<img width="419" alt="input3" src="https://user-images.githubusercontent.com/73741112/180265335-66c6acf9-bcb2-479b-8c1b-c3d943989f82.png">

<img width="521" alt="output3" src="https://user-images.githubusercontent.com/73741112/180265333-ee6fcce8-efa6-441c-a410-44d8edb81230.png">

- free 함수 구현

스택주소값에 있는 힙 영역을 해제하고 힙 영역 고유 주소를 반환한 결과입니다.

<img width="447" alt="input4" src="https://user-images.githubusercontent.com/73741112/180265326-1ecc0f9d-00af-4ffb-9922-bfb4d7442ade.png">

<img width="318" alt="output4" src="https://user-images.githubusercontent.com/73741112/180265321-a8de8346-8eaa-42d0-8d0f-3d5f78619297.png">

- call 함수 구현

마지막 스택 위치를 알려주는 스택 포인터에 포인터 변수를 paramCount만큼 반복해서 생성하고 스택 포인터를 증가시키고 스택구조를 반환한 결과입니다.

<img width="420" alt="input5" src="https://user-images.githubusercontent.com/73741112/180265317-d6a6a8a2-c9d6-403d-8d0f-8afd7c5dc27b.png">

<img width="582" alt="output5" src="https://user-images.githubusercontent.com/73741112/180265315-770167f7-aba1-4d34-b38b-14195938a23c.png">

- returnFrom 함수 구현

증가했던 스택 공간을 비우고 이전 호출 위치로 이동한다.

< case 1 >
함수 명이 제일 최근에 호출된 함수 명일 경우

<img width="466" alt="input6_1" src="https://user-images.githubusercontent.com/73741112/180265313-0e0ff14e-9f14-4e5d-91e5-37fed1a4a8f8.png">

<img width="366" alt="output6_1" src="https://user-images.githubusercontent.com/73741112/180265309-a2c36140-961d-478a-be3d-c0914ed63dae.png">

< case 2 >
함수 명이 제일 최근에 호출된 함수가 아닐 경우

<img width="428" alt="input6_2" src="https://user-images.githubusercontent.com/73741112/180265306-cf8ef1e7-6f4f-44e5-a634-23d19e74c09a.png">

<img width="856" alt="output6_2" src="https://user-images.githubusercontent.com/73741112/180265303-783d5f44-eb04-4dc4-84a1-7a5db05fe45c.png">

- usage 함수 구현

스택 영역 전체크기, 사용중인 용량, 남은 용량, 힙 영역 전체크기, 사용중인 용량, 남은 용량을 순서대로 배열로 반환한 값을 출력한 결과입니다.

<img width="400" alt="input7" src="https://user-images.githubusercontent.com/73741112/180265319-ea24a550-b202-4c46-9617-e6963228aa56.png">

<img width="239" alt="output7" src="https://user-images.githubusercontent.com/73741112/180265318-c3ee9026-bf0a-493d-8467-1ac904ba13da.png">

- callstack 함수 구현

현재 스택에 쌓여있는 호출 스택을 문자열로 반환한 값을 출력한 결과입니다.

<img width="477" alt="input8" src="https://user-images.githubusercontent.com/73741112/180265301-874785bc-8fe2-49cf-a1d8-f3a8fddcab0d.png">

<img width="477" alt="output8" src="https://user-images.githubusercontent.com/73741112/180265299-4eae0598-1aa9-4262-99e4-fda5f2c98d4f.png">

- heapdump 함수 구현

힙영역에서 사용중인 상태를 문자열 배열로 표현해서 반환한 값을 출력한 결과입니다.

<img width="477" alt="input9" src="https://user-images.githubusercontent.com/73741112/180265293-bde6219a-e5a5-44a4-be18-7959037d1525.png">

<img width="459" alt="output9" src="https://user-images.githubusercontent.com/73741112/180265291-a57c2c29-c516-4014-9f61-92d32a74a1ce.png">

- garbageCollect 함수 구현

힙영역에 할당된 타입들 중에서 스택에 포인터 변수가 없는 경우를 찾아서 해제하는 기능 을 한 후 힙 구조를 출력한 결과입니다.

<img width="443" alt="input10" src="https://user-images.githubusercontent.com/73741112/180265287-22e98eb2-3b00-40b4-8851-58621b2b221c.png">

<img width="480" alt="output10" src="https://user-images.githubusercontent.com/73741112/180265284-72d02bc0-78b5-48ab-808b-b326952cb083.png">

- reset 함수 구현

모든 stack과 heap 공간을 비우고 init했을 때와 동일하게 초기상태로 만든 후, stack 상태와 heap 공간을 출력한 결과입니다.

<img width="485" alt="input11" src="https://user-images.githubusercontent.com/73741112/180265280-2ac61726-2a96-46b0-b4ee-e0c280d8703f.png">

<img width="227" alt="output11" src="https://user-images.githubusercontent.com/73741112/180265275-2c822224-4ab6-4eda-99f2-9987551dc092.png">
