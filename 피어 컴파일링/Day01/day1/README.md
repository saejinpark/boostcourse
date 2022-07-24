# 기능 요구사항
1. 배열 array1과 array2가 주어집니다. 각 배열의 원소는 숫자 1부터 13까지로 이루어져 있습니다.
2. 배열에서 같은 숫자가 2번 이상 나오는 경우 페어와 연속 규칙에 맞는 숫자들을 포함되는지 비교해서 둘 중에 어느 쪽이 더 큰 값인지 확인해야 합니다.
3. array1 배열이 더 큰 값을 포함하면 1을, array2 배열이 더 큰 값을 포함하고 있으면 2를 return 하는 함수를 구현합니다.
# 나만의 체크포인트
## 1. 기능 체크포인트
- [x] 양쪽 배열에 모두 페어나 규칙이 없을때 0을 return 한다.
- [x] 양쪽 배열에서 페어 숫자가 같거나 우위를 비교를 할 수 없을 때 0을 return 한다.
- [x] 같은 숫자 2개가 페어로 나오는 경우보다 3개가 페어로 나오는 경우가 더 큰 값이다.
- [x] 같은 숫자 3개가 페어로 나오는 경우보다 다섯 숫자가 연속으로 나오는 경우가 더 큰 값이다. 
- [x] 다섯 숫자가 연속으로 나오는 경우보다 같은 숫자 4개가 페어로 나오는 경우가 더 큰 값이다.
- [x] 양쪽 모두 같은 개수의 페어나 연속숫자라면 더 큰 숫자가 큰 값이다.
- [x] 숫자 페어가 2벌이 나오는 경우에는 더 큰 숫자로 되어있는 페어만 우선적으로 고려했다.
## 2. 프로그래밍 체크포인트
- [x] 함수를 사용하며, 별도 타입을 선언하지 않도록 구현했다.
- [x] 함수 하나가 10줄 이상 넘어가면 하위 함수로 분리하고, 상위 함수는 하위 함수를 호출한다.
- [x] 함수 선언한 이후에 들여쓰기 단계가 3단계를 초과하는 경우는 함수로 분리했다.
- [x] 입력값을 받기 위해서 표준입력방식 또는 소스코드 파일 안에서 함수를 호출하면서 입력값을 넣는 방식으로 구현했다.
- [x] 결과가 VSCODE콘솔에 출력되어 진다.
- [x] 최종적으로 콘솔에 출력한 결과를 이미지로 캡처했다.
- [x] 요구사항을 분석해서 스스로 할 일 체크리스트를 README.md에 작성한다.
- [x] 체크리스트를 하나씩 완료할 때마다 소스와 실행 결과는 gist에 commit 한다. (Push는 한 번만 해도 무방하다.
# Official 체크포인트
- [x] 개발 환경을 설정해서 함수의 실행결과가 콘솔에 출력된다.
- [x] 배열에서 같은 숫자가 2개 나오는지 확인했다.
- [x] 배열에서 같은 숫자가 3개 나오는지 확인했다.
- [x] 배열에서 5개 연속된 번호가 나오는지 확인했다.
- [x] 배열에서 같은 숫자가 4개 나오는지 확인했다.
- [x] 배열에 있는 페어와 규칙을 확인해서, 두 개 배열을 비교했다.
- [x] 함수를 들여쓰기와 길이가 작은 단위 여러 개로 분리해서 작성했다.
- [x] 여러 경우의 수를 테스트하기 위해서 여러 가지 경우를 고려한 임시 값을 넣어서 결과를 확인했다.
- [x] secret gist를 생성하고 git 주소를 가져와서 local에 clone했다.
- [x] 본인만의 체크리스트를 만들고, 체크할 때마다 commit했다.
# 학습메모
## 문제 해결 과정
1. 입출력 초기화  
    ```javascript
    import { createInterface } from "readline";

    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    const LIMIT = 2;
    let count = 0;

    let array1 = null;
    let array2 = null;

    console.log("첫번째 배열을 입력해주세요.");

    rl.on("line", (line) => {
        count++;
        if (count === 1) {
            array1 = lineToArr(line);
            console.log("두번째 배열을 입력해주세요.");
        }else if (count === LIMIT) {
            array2 = lineToArr(line);
            const bigArray = selectBigArray(array1, array2);
            console.log(bigArray === 0 ? "더 큰 배열은 없습니다" : `더 큰 배열은 'array${selectBigArray(array1, array2)}'입니다`);
            rl.close();
        }
    });

    rl.on("close", () => {
        process.exit();
    });
    ```
    
    - readline 모듈을 사용하여 입력을 할수있도록 초기화 해주었다.
    - LIMIT 상수를 만들어 입력의 수를 정해주었다
    - count 변수를 만들어 현재 입력이 몇 번째 입력인지를 체크해 주었다.
    - 변수 array1, array2를 선언하고  null 값을 입력해 주었다.
    - 그리고 "첫번째 배열을 입력해주세요." 라는 구분을 출력하게 만들었다
    - 첫번째 입력으로 line를 입력받아 lineToArr(line)을 사용하여 숫자 배열로 바꾸어준 후 array1에 저장해 주었다.
      - lineToArr(line)
        ```javascript
        const lineToArr = (line) => {
            return line.split(" ").map((v) => parseInt(v));
        };
        ```
        " " 으로 라인을 나누어 배열로 바꾸어 주고 배열 각각의 값을 정수로 바꾸어 준다.  

        >mdn web doc / String.prototype.split() : https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/split  
        >mdn web doc / Array.prototype.map() : https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/map  
        >mdn web doc / parseInt() : https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/parseInt
    - 그리고 "두번째 배열을 입력해주세요." 구분을 출력해 준다.
    - 두번째 입력으로 line를 입력받아 lineToArr(line)함수를 호출하여 숫자 배열로 바꾸어준 후 array2에 저장해 주었다.
    - 그리고 selectBigArray(array1, array2) 함수를 호출하여 두배열을 비교하여
2. selectBigArray(array1, array2)  
    두개의 배열을 비교해주는 selectBigArray(array1, array2)를 만들어 주었다.
    ```javascript
    const [array1PairNum, array1MaxPairCount, array1NumMap] = getPairNumAndCountAndMap(array1);
    const [array2PairNum, array2MaxPairCount, array2NumMap] = getPairNumAndCountAndMap(array2);
    const [array1FiveSequence, array1FiveSequenceNum] = getFiveSequenceAndNum(array1NumMap);
    const [array2FiveSequence, array2FiveSequenceNum] = getFiveSequenceAndNum(array2NumMap);
    const pairWin = getPairWinSectionOne(array1MaxPairCount, array2MaxPairCount, array1PairNum, array2PairNum);
    const sequenceWin = getSequenceWinSectionOne(array1FiveSequence, array2FiveSequence, array1FiveSequenceNum, array2FiveSequenceNum);
    return comparePairWinAndSequenceWinSectionOne(pairWin, sequenceWin, array1MaxPairCount, array2MaxPairCount);
    ```
   1. getPairNumAndCountAndMap(array)
       위의 함수 내부에서 array의 pair된 숫자, pair의 수, 숫자의 포함을 알려주기위한 numMap를 리턴해주는 함수인 getPairNumAndCountAndMap(array)를 만들어주었다  
       ```javascript
        let pairNum = 0, maxPairCount = 0, numMap = new Map();
        for (let oneOfArray of array) {
            if(!numMap.has(oneOfArray))numMap.set(oneOfArray, 1);
            else {
                let testCase = numMapAddCount(numMap, oneOfArray);
                if (testCase > 1 && testCase > maxPairCount) [maxPairCount, pairNum] = [testCase, oneOfArray];
            };
        } return [pairNum, maxPairCount, numMap];
       ```
       1. numMap의 내부에 숫자를 더해주고 그값을 리턴해주는 
       그리고 각 array별로 실행하여 
       ```javascript
       const [array1PairNum, array1MaxPairCount, array1NumMap] = getPairNumAndCountAndMap(array1);
       const [array2PairNum, array2MaxPairCount, array2NumMap] = getPairNumAndCountAndMap(array2);
       ```
       이러한 방식으로 잢을 저장해 주었다.
### 학습한 내용