# 기능 요구사항

## 첫번째

-   파일과 디렉토리 경로 Path를 처리하는 라이브러리 모듈 또는 클래스를 구현한다.
-   node에 이미 있는 Path 클래스/모듈과 상관없이 다음 조건을 만족하는 직접 Path 객체를 구현해야 한다.
-   Path 문자열을 초기 매개변수로 전달해서 Path 객체를 생성할 수 있어야 한다.
-   UNIX 스타일, 윈도우 스타일 구성 방식을 모두 지원해야 한다.
-   UNIX : 디렉토리 분리 문자 / forward slash, Path 요소 구분 : colon
-   윈도우 : 디렉토리 분리 문자 \ backword slash, Path 요소 구분 ; semicolon
-   본인 컴퓨터 운영체제와 상관없이 UNIX나 윈도우 형식을 모두 동작하도록 구현해야 한다.

## 두번째

다음과 같은 함수를 추가하고, 이전 구현한 함수와 새로 추가한 함수 결과를 테스트한다.

1. Path Components 관련

    > pathComponents는 읽기만 가능하도록 만들고 변경하는 것은 메소드를 만든다.  
    > 경로에 요소를 추가하는 메소드 : appendComponent()  
    > base를 제외한 마지막 경로 제거하는 메소드 : deleteLastComponent()

2. Path 비교 관련
    > relative(to) 현재 Path 속성과 to Path 속성을 비교한다.  
    > 리턴값은 현재 Path에서 to까지 이동한다고 가정했을 때 상대 경로를 문자열로 생성한다.

```javascript
let path = new Path.parse("/data/result/test/aaa");
path.relative("/data/result/source/bbb");
// Returns: '../../source/bbb'
```

# 프로그래밍 요구사항

## 첫번째

-   Path를 분석해서 생성하도록 구현해야 한다.
-   Path에 포함될 수 없는 특수문자가 포함된 경우나 필수적인 항목이 없으면 throw 처리한다.
-   한글이나 공백도 지원해야 한다.

```javascript
const path = new Path("/home/user/boost/camp.txt");
console.log(path.stringfy());
// { root : '/',
//   dir : '/home/user/boost',
//   base : 'camp.txt',
//   ext : '.txt',
//   name : 'camp' }
```

-   Path가 /usr/bin:/usr/local/bin 값처럼 여러 Path를 포함하는 경우 Path배열을 리턴하는 생성자를 별도로 구현한다
-   Path 요소가 하나인 경우와 어떻게 구분할 지 스스로 판단한다.
-   Path 파싱을 위해서 정규표현식(regular expression)을 학습하고 필수적으로 사용한다.
-   다음과 같은 Path 요소에 접근해서 읽고, 변경할 수 있어야 한다.
-   root : String
-   base : String
-   name : String
-   ext : String
-   lastDirectory : String
-   components : [String]
-   absoluteString : String //readonly. 직접 저장하면 안되고 분석한 내용으로 조합해서 만들어야 함

## 두번째 프로그래밍

### 단위 테스트

> 자바스크립트와 node 환경에서 사용하는 단위 테스트 라이브러리를 활용해야 한다.  
> Mocha 또는 Jest 를 권장한다.  
> 메소드별로 정상적인 동작을 확인하기 위해서 테스트 코드를 1개 이상 작성해서 예상 동작을 검증한다.  
> 본인이 생각하는 의미있는 테스트의 기준에 맞춰서 작성한다.

# 나만의 체크포인트

## 기능 체크포인트

### 첫번째

-   [x] 파일과 디렉토리 경로 Path를 처리하는 라이브러리 모듈 또는 클래스를 구현헸다.
-   [x] node에 이미 있는 Path 클래스/모듈과 상관없이 다음 조건을 만족하는 직접 Path 객체를 구현했다.
-   [x] Path 문자열을 초기 매개변수로 전달해서 Path 객체를 생성했다.
-   [x] UNIX 스타일, 윈도우 스타일 구성 방식을 모두 지원한다.
-   [x] 본인 컴퓨터 운영체제와 상관없이 UNIX나 윈도우 형식을 모두 동작하도록 구현했다.

## 프로그래밍 체크포인트

### 첫번째

-   [x] Path를 분석해서 생성하도록 구현했다.
-   [x] Path에 포함될 수 없는 특수문자가 포함된 경우나 필수적인 항목이 없으면 throw 처리한다.
-   [x] 한글이나 공백도 지원한다.

# Offcial 체크포인트

-   [x] Path 인식, 패턴 분류하는 정규 표현식 만들기
-   [x] Unix 스타일 경로 문자열로 Path 분석 후 객체 생성
-   [x] Windows 스타일 경로 문자열로 Path 분석 후 객체 생성
-   [x] 복수 Path 요소 지원 생성자 구현
-   [x] Path 생성 안되는 경우 예외처리
-   [x] Path 생성 안되는 경우 예외에 대한 테스트 함수
-   [x] Path 부속 필수 요소 접근 : root, base, name, ext, lastDirectory, components
-   [x] absoluteString 읽기 전용으로 구현
-   [x] Path Components 에 경로 추가 메서드 구현
-   [x] Path Components 에 마지막 경로 제거 메서드 구현
-   [x] 두 개 Path 상대 경로 비교 relative() 기능 구현
-   [x] 다양한 경우의 수를 테스트하는 단위 테스트 함수 10개 이상 구현

# 학습 메모

> mocha 공식 사이트 : https://mochajs.org/

# 처리과정

## 1. 운영체제 판별

우선 운영체제를 확인하기 위해서

path를 디렉토리 분리문자의 포함여부로 확인해 주었다.

```javascript
//window
/.*\\.*/.test(path);
//UNIX
/.*\/.*/.test(path);
```

## 2. Path 요소 구분

구분자로 split()하여 개수가 한개라면 현재 작업에서 실행하고 그게 아니라면

요소를 각각 path로 바꾸어 리턴되도록 했다.

```javascript
returnPathArr(pathArr) {
    return pathArr.map((path) => new Path(path));
}
```

## 3. absoluteString 읽기전용으로 만들기

읽기 전용으로 만들어 주기위해 내부에 path를 넣어 클로저를 만들고 내부에서

getAbsoluteString() 함수를 만들어 this.getAbsoluteString()에 할당해 주었다

```javascript
(function (path) {
    this.getAbsoluteString = () => {
        return path;
    };
}.call(this, pathArr[0]));
```

## 4. 내부값을 선언

위에서 만들 getAbsoluteString()을 이용하여 Path에 각 값을 입력해주었다

```javascript
//window
this.setComponents(this.getAbsoluteString().split("\\"));
this.setComponentsByIndex(0, this.getComponentsByIndex(0) + "\\");
//UNIX
this.setComponents(this.getAbsoluteString().split("/"));
this.setComponentsByIndex(0, this.getComponentsByIndex(0) + "/");
//공통
this.setRoot(this.getComponentsByIndex(0));
this.setBase(this.getComponentsByIndex(this.getComponentsLength() - 1));
const [name, ext] = this.getBase().split(".");
this.setName(name);
this.setExt("." + ext);
this.setLastDirectory(this.getComponentsByIndex(this.getComponentsLength() - 2));
```

## 5. appendComponent(component) 만들기

Path의 constructor에서 선언부분을 init함수로 나누어 초기화가 내부에서도 될수있도록

만들어 주고 정규식으로 기존의 Path를 나누어 component의 끝에

입력받은 component를 더하고 init함수를 사용해 다시 초기화를 시켜주었다.

```javascript
//window
this.appendComponent = (component) => {
    if (component === undefined) {
        throw new Error("component가 입력되지 않았습니다.");
    } else {
        let [paths, base] = path.match(/(.+\\)|(.+)/g);
        paths += `${component}\\`;
        this.init(paths + base);
    }
};
//UNIX
this.appendComponent = (component) => {
    if (component === undefined) {
        throw new Error("component가 입력되지 않았습니다.");
    } else {
        let [paths, base] = path.match(/(.+\/)|(.+)/g);
        paths += `${component}/`;
        this.init(paths + base);
    }
};
```

## 6. deleteLastComponent()

정규식으로 기존의 Path를 나누어 마지막 component를 지우고

init함수를 사용해 다시 초기화를 시켜주었다.

```javascript
//window
this.deleteLastComponent = () => {
    const [...paths] = path.match(/(.+?\\)|(.+)/g);
    const base = dir.pop();
    paths.pop();
    paths.push(base);
    this.init(paths.join(""));
};
//UNIX
this.deleteLastComponent = () => {
    const [...paths] = path.match(/(.+?\/)|(.+)/g);
    const base = paths.pop();
    paths.pop();
    paths.push(base);
    this.init(paths.join(""));
};
```

## 7. relative(to)

while문과 정규식을 활용해 기존의 Path와 비교하여 처리해주었다

```javascript
//window
this.relative = (to) => {
    let relativePath = "";
    const [...paths] = path.match(/\\[^/]+/g);
    const [...toPaths] = to.match(/\\[^/]+/g);
    while (paths.includes(toPaths[0]) && paths[0] !== toPaths[0]) {
        relativePath += "..\\..\\..\\..\\";
        paths.shift();
    }
    while (paths.length > 0) {
        if (paths[0] === toPaths[0]) {
            relativePath += "..\\";
            paths.shift();
            toPaths.shift();
        } else {
            break;
        }
    }
    relativePath += toPaths.join("").substring(1);
    return relativePath;
};
//UNIX
this.relative = (to) => {
    let relativePath = "";
    const [...paths] = path.match(/\/[^/]+/g);
    const [...toPaths] = to.match(/\/[^/]+/g);
    if (paths.includes(toPaths[0]) && paths[0] !== toPaths[0]) {
        while (paths.includes(toPaths[0]) && paths[0] !== toPaths[0]) {
            relativePath += "../../../../";
            paths.shift();
        }
    } else {
        while (paths.length > 0) {
            if (paths[0] === toPaths[0]) {
                relativePath += "../";
                paths.shift();
                toPaths.shift();
            } else {
                break;
            }
        }
    }
    relativePath += toPaths.join("").substring(1);
    return relativePath;
};
```
