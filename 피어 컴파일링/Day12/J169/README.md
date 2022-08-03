# 실행방법

    (Window만)

    VSC terminal을 bash로 열기 (Git bash 설치가 되어 있어야 함)

    아래 사진 참고
    
<img width="350" alt="VSC bash terminal 열기" src="https://user-images.githubusercontent.com/43336212/182369593-4a939e88-562a-48a3-83e4-b28f8476ab66.png">

    
    진행방법
    
1. run-func 설치
> npm i -g run-func

1-1. 만약 아래 사진과 같은 에러 발생 시

<img width="600" alt="npm install 오류" src="https://user-images.githubusercontent.com/43336212/182363735-ba150e62-45d2-47f4-8fb1-886ccb3a7861.png">

> npm set registry https://registry.npmjs.org/

> npm uninstall -g run-func

> npm i -g run-func
    
<br>

2. mit 명령어 alias 등록
> alias mit='run-func mit.js'

<br>

3. 테스트 하기

(예시 시나리오)

- mit init

```bash
$ mit init test
```

<img width="450" alt="mit init test" src="https://user-images.githubusercontent.com/43336212/182484621-3084a1d4-6895-432d-90d4-e5225762fd7d.png">

<br>

- mit commit

```jsx
//./test/test.txt 추가
test content
```

> $ mit commit test

```jsx
//./test/new.txt 추가
new file

//./test/test.txt 수정
test content --revised
```

> $ mit commit test

```jsx
//./test/test.txt 2차 수정
test content --revise v2
```

> $ mit commit test

- mit log

> $ mit log test

<img width="600" alt="mit log test" src="https://user-images.githubusercontent.com/43336212/182493255-ef93e285-ac37-4b16-8b9e-6f4f0b6c55c8.png">

- mit restore

> $ mit resotre test 455dc4a889f6a3cd3aa3d975c356787d3c3815cb29c0fc1ae2784a71aa066472

    
# 체크 포인트

- [x]  mit 하위 명령과 인자값 처리
- [x]  init 명령으로 초기화
- [x]  commit 명령으로 특정 디렉토리 해시값 비교
- [x]  blob 오브젝트 폴더/파일 생성
- [x]  blob 오브젝트 zlib 압축 저장
- [x]  tree 오브젝트 폴더/파일 생성
- [x]  tree 오브젝트 blob 관련 파일 작성
- [x]  commit 오브젝트 폴더/파일 생성
- [x]  commit 오브젝트 tree, 날짜 파일 작성
- [x]  commits 파일에 커밋 해시값 기록
- [x]  log 명령으로 commits 파일에서 이력 출력
- [x]  restore 명령으로 commits에서 해시값 비교해서 restore 대상 찾기
- [x]  커밋 해시값 8자리와 64자리 모두 지원
- [x]  tree와 blob 오브젝트를 참고하여 zlib 복구해서 파일 내용 복원
    

# 나만의 체크 포인트

- [x] 스크립트 함수 콘솔로 인자 받아 호출

```jsx
//mit.js
exports.init = function(String){
    console.log(String);
};

run-func 모듈 설치 후
run-func mit.js init 
//Hello

//alias 등록
alias mit='run-func mit.js'
mit init Hello
//Hello
```

<img width="600" alt="스크립트 함수 콘솔로 인자 받아 호출" src="https://user-images.githubusercontent.com/43336212/182372325-8ac6230e-a9d7-4fb8-a4be-ace0967d59c1.png">

- [x] mit init 초기화 구현
- [x] Commit class 구현
- [x] Tree class 구현
    ```jsx
    //Tree 안의 this.map 구조
    {filename1 : {sha:sha1, zlibLength:length1}, filename2 : {sha:sha2, zlibLength:length2}, ...};  //Map()
    ```

<br>

mit commit 디렉토리명

- [x] 디렉토리 경로에 있는 전체 파일에 대해 sha256 해시 생성
- [x] 기존 commit에 있는 파일 목록과 해시값 비교 후 (기존 commit에 없는 파일 | 해시값이 달라진 파일 | 없어진 파일) 탐지
- [x] 해시값 앞 8자리를 objects 디렉토리 안에 하위 디렉토리로 생성
- [x] 나머지 부분을 파일명으로 만든 하위 디렉토리에 저장
- [x] blob 오브젝트 파일 내용은 원본 파일을 zlib으로 압축해 저장

<br>

- [x] mit log
- [x] mit restore


# 학습 메모
git log --stat http://www.dreamy.pe.kr/zbxe/CodeClip/3766623

    git log는 저장소의 커밋 히스토리를 시간순으로 최근 커밋부터 각 커밋의 SHA-1 체크섬, 저자 이름, 저자 이메일, 커밋한 날짜, 커밋 메시지를 보여준다.

    --stat 옵션은
    어떤 파일이 수정됐는지, 얼마나 많은 파일이 변경됐는지, 또 얼마나 많은 줄을 추가하거나 삭제했는지 통계정보를 함께 보여준다.
    

<img width="800" alt="git log --stat" src="https://user-images.githubusercontent.com/43336212/182288930-e26a39df-0c37-4eb4-8f8f-1df2c7d213ab.png">


Map.prototype.values() https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/values

run-func 스크립트 안의 함수 콘솔로 호출해서 사용하기 
https://stackoverflow.com/questions/30782693/run-function-in-script-from-command-line-node-js
https://www.npmjs.com/package/run-func

npm install 시 JSON.parse Error 해결 방법 https://stackoverflow.com/questions/54656780/error-npm-err-unexpected-token-in-json-at-position-0-while-parsing-near

    npm set registry https://registry.npmjs.org/ 입력
    지우고 재설치


fs.mkdirSync() https://secondmemory.kr/667

bash alias 설정 https://caver.tistory.com/entry/%EB%A6%AC%EB%88%85%EC%8A%A4Linux-Alias-%EC%84%A4%EC%A0%95-%EB%B0%8F-%EC%82%AC%EC%9A%A9-%EB%B0%A9%EB%B2%95

git rm -r --cached 캐시 삭제 https://niceman.tistory.com/114

new Date() https://dororongju.tistory.com/116

fs 모듈 https://opentutorials.org/module/938/7373

fs readdir aysnc await으로 구현 https://stackoverflow.com/questions/40593875/using-filesystem-in-node-js-with-async-await

fs.readfileSync() https://webruden.tistory.com/947

fs isFile() https://rateye.tistory.com/390

비동기 병렬 처리 https://medium.com/@trustyoo86/async-await%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%9C-%EB%B9%84%EB%8F%99%EA%B8%B0-loop-%EB%B3%91%EB%A0%AC%EB%A1%9C-%EC%88%9C%EC%B0%A8-%EC%B2%98%EB%A6%AC%ED%95%98%EA%B8%B0-315f31b72ccc
```
foreach는 각 loop에 대해 즉각적으로 callback을 실행해주고 바로 종료되버림. 그래서 비동기 처리가 안됨.(foreach 뒤에 있는 코드가 foreach 안의 처리가 끝나는 걸 기다리지 않고 동시에 실행되는 것과 마찬가지) 
비동기 처리가 필요할 때는 for..of 또는 pomise.all(array.map()) 사용 가능
for..of 는 앞의 loop가 끝나야 실행되는 순차 처리
promise.all를 이용한 방법은 병렬 처리. 그래서 각 비동기 처리의 delay 시점에 따라 순서가 다를 수 있음. 
즉, 실행 순서가 중요하지 않고 그냥 전체 비동기 작업의 종료를 기다리고 싶은 거면 promise.all을 사용하는 것이 효율적임
```

zlib 사용법 https://stackoverflow.com/questions/7625251/compression-and-decompression-of-data-using-zlib-in-nodejs

crypto createHash sha256 https://minu0807.tistory.com/84

콘솔 메시지 색깔 변경 https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color

fs.unlink 파일 삭제 https://velog.io/@kkaemi/node.js-%ED%8C%8C%EC%9D%BC-%EC%82%AD%EC%A0%9C