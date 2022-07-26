# 나만의 체크포인트

## mission01

### 1. tokenizer ()

- **1-1. '<','>'를 기반으로 토큰을 나누고, 나눈 요소들을 배열 내부에 저장하기.** (✅)

  ![1-1 이미지 1](https://ifh.cc/g/NtwGWh.png)
  ![1-1 이미지 2](https://ifh.cc/g/4DDqP5.png)
  ![1-1 이미지 3](https://ifh.cc/g/VXRszp.png)

- **1-2. 주석인 경우에는 무시하기** (✅)

  ![1-2 이미지 1](https://ifh.cc/g/331pDb.jpg)

- **1-3. 띄어쓰기가 존재하는 경우에는 분리 후 '='를 기반으로 분리하기.** (✅)

  ![1-3 이미지 1](https://ifh.cc/g/0dVpwZ.jpg)

- **1-4. 토큰 스택 생성하기** (✅)

  - 1-4-1. '/' 요소가 1번 인덱스에 들어있을 경우 스택 pop 기능 구현하기 ('</'로 시작하기 때문). (✅)
  - 1-4-2. pop 기능의 수행을 하지 못할 경우, (스택 맨 위의 엘리먼트와 현재 엘리먼트가 일치하지 X) 예외처리 발생하게 하기. (✅)
  - 1-4-3. '/' 요소가 뒤에서 2번째 인덱스에 들어있을 경우 스택 영향 주지 않게 하기 ('/>'로 끝나기 때문). (✅)

  ![1-4 이미지 1](https://ifh.cc/g/frjFRR.png)
  ![1-4 이미지 2](https://ifh.cc/g/A2JcNX.jpg)
  ![1-4 이미지 3](https://ifh.cc/g/q76jXX.png)
  ![1-4 이미지 4](https://ifh.cc/g/cnB2Ct.jpg)

- **1-5. Map 자료형과 배열을 사용해서 lexer 함수에 넘겨주기** (✅)

  - 1-5-1. '<','>'로 감싸여져 있고 '/'가 없으면 [], '<','>'조차 없으면 'text', "<", '>", "/"가 있으면 "/" (✅)

  ![1-5 이미지1](https://ifh.cc/g/ntjTCW.png)
  ![1-5 이미지2](https://ifh.cc/g/zcX1ww.jpg)
  ![1-5 이미지3](https://ifh.cc/g/vxYpFH.jpg)
  ![1-5 이미지4](https://ifh.cc/g/1xAXrx.png)
  ![1-5 이미지5](https://ifh.cc/g/1O2qVB.png)
  ![1-5 이미지6](https://ifh.cc/g/jsQ4FS.png)
  ![1-5 이미지7](https://ifh.cc/g/w0oAlg.jpg)

### 2. lexer (✅)

- **2-1. tokenizer 자료가 잘 넘겨졌는지 확인하기.** (✅)
- **2-2. Map 자료형(키: element(문자열) => 값: 각 요소들이 들어있는 배열)을 기반으로 element, attributes, name, value 객체 생성하기.** (✅)
- **2-3. 'text'인 경우 'text' 속성과 값을 넣어주기.** (✅)
- isEnd 속성 따로 추가하기 (isend는 "/"의 유/무에 따라 달라지며, 'text'는 예외적으로 넘어간다.) (✅)
- 객체들이 들어있는 배열로 따로 만들어 'parser'를 구현한다. (✅)

  ![2 이미지 1](https://ifh.cc/g/PxmNsO.jpg)
  ![2 이미지 2](https://ifh.cc/g/j17lty.png)
  ![2 이미지 3](https://ifh.cc/g/Kc8HRj.jpg)

### 3. parser (✅)

**(parser의 경우 코딩 과정 중에서 변경 사항이 많아 미처 세세하게 체크포인트를 나누지 못했습니다 🥲)**

- **3-1. 배열을 순회하면서 객체 생성하기.** (✅)
  - opentag인 경우에는 StackPointer를 1 증가시키고, 해당 스택 배열에 객체를 생성함. (✅)
  - closetag인 경우에는 StackPointer를 1 감소시킴 (✅)
  - singletag인 경우에는 StackPointer를 그대로 유지한 채 관련 객체를 해당 스택 인덱스 배열에 push (✅)
  - text인 경우에는 opentag 특성상 위로 올라가는데, 내려가서 적용한 후 다시 위로 올라감 (✅)

![3 이미지 1](https://ifh.cc/g/FQZGn5.jpg)
![3 이미지 2](https://ifh.cc/g/DqKOOo.jpg)
![3 이미지 3](https://ifh.cc/g/9dWkX7.jpg)

## mission02

- **1. elementByAttribute 구현하기** (✅)

  - parserStack 내부의 모든 attribute 속성을 탐색한 후에 맞는 경우에는 해당 속성을 리턴한다. (✅)

    ![1 이미지 1](https://ifh.cc/g/1D1R88.png)
    ![1 이미지 2](https://ifh.cc/g/Pa8MLm.jpg)

- **2. elementByTag 구현하기 (✅)**

  - parserStack 내부의 모든 "element" 속성을 탐색한 후에 맞는 경우에는 해당 속성을 리턴한다. (✅)

    ![2 이미지 1](https://ifh.cc/g/SOzlp5.jpg)
    ![2 이미지 2](https://ifh.cc/g/ApC6Az.jpg)

- **3. findXPath 구현하기 (✅)**

  - parserStack에서 발견했을 경우 children을 이용해 연쇄적으로 찾는다 (재귀 방식을 이용해도 좋다) (✅)
    (인덱스가 주어지지 않았을 경우 첫 번째 요소를 리턴)

    ![3 이미지 1](https://ifh.cc/g/SOzlp5.jpg)
    ![3 이미지 2](https://ifh.cc/g/ApC6Az.jpg)

# 학습메모

## mission 01 문제 인식 및 설계 과정

![미션 1-1](https://ifh.cc/g/hG0Ccp.jpg)
![미션 1-2](https://ifh.cc/g/BW25gS.jpg)
![미션 1-3](https://ifh.cc/g/KCh2l0.jpg)
![미션 1-4](https://ifh.cc/g/hGG6Jq.jpg)
