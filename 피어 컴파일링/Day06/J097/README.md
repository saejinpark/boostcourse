## 실행

```bash
node xmlparser.js # npm install 없이 바로 실행하세요
```

## 구현 한계

- 탭 들여쓰기를 text로 인식함
- 속성 값 안의 \<, \>를 처리 못함
- XPath은 last, 상대 경로 등 지원 안하고 절대 경로만 지원함
- 문자열이 HTML인지 XML인지 수동 기입해야 함
- 모듈 분리 안되어있음

## 메서드 별 역할과 책임

### tokenizer

XML 문자열을 토큰 단위로 분할합니다.

본 프로그램에서 토큰은 `<, >` 로 감싸진 토큰과 감싸지지 않은 토큰으로 구분합니다. 전자는 element, 후자는 text로 판단합니다.

### lexer

토큰의 의미를 분석합니다. 먼저 토큰에 세부적인 타입(`.type`)을 부여합니다.
-  `- tag` 타입인 경우 어떤 `element` 인지, 만약 있는 경우 `attributes`는 무엇인지 표기합니다. 
-  `text` 타입인 경우 어떤 텍스트를 `value`로 갖는지 표기합니다.
- 이 외의 타입(특히 `comment`)은 parser에 넘기지 않고 이 메서드에서 폐기합니다.
- 이 문서가 HTML일 때, singleton tag (self-closing이 가능한)의 경우 별도로 예외 처리합니다. open tag를 self-closing tag로 변환하며 closing tag는 폐기합니다.

### parser

lexer로부터 토큰 리스트를 받아 AST를 빌드합니다.

tag의 쌍이 맞지 않는 경우를 확인합니다.

### XMLParser

Tokenizer -> Lexer -> Parser를 실행하는 wrapper function 입니다.

인자로 문자열과 문서 타입을 받습니다. 문서 타입은 "XML"(default), "HTML" 둘 중 하나로 지정합니다.

## 체크리스트

- xml parser
  - [x] 예제 출력 분석
    - element
      - text (있는 경우)
      - attributes (있는 경우)
        - name
        - value
      - children (있는 경우)
  - [x] tokenizer 구현
  - [x] lexer 구현
  - [x] parser 구현
  - [x] 싱글톤 태그 예외 처리
  - [ ] 생략된 closing 태그의 위치 추측 (포기)
  - [x] 하위 함수로 분할
  - [x] 태그가 제대로 닫히지 않는 예외 케이스 확인

- xpath 처리
  - [x] elementByAttribute
  - [x] elementsByTag
  - [x] findXPath
  - [x] try catch 처리

## 학습메모

- [x] XML?

- [x] tokenizer?

- [x] lexer?

- [x] parser?

```bash
original string
"[123, 45, 'hello']"

after tokenizer
['[', '123', '45', "'hello'", ']']

after lexer
[{type: 'LBracket', value: '['},
 {type: 'number', value: 123},
 {type: 'number', value: 45},
 {type: 'string', value: 'hello'},
 {type: 'RBracket', value: ']'}]

after parser
{ type: 'array',
  child: 
   [ { type: 'number', value: 123, child: [] },
     { type: 'number', value: 45, child: [] },
     { type: 'string', value: 'hello', child: [] } 
    ] 
}
```

- [x] stringify?
  JSON.stringify, 오브젝트를 json 형태로 문자열화해주는 메서드
- [ ] 정규표현식?
- [x] 왜 tokenizer 와 lexer를 분리하지? lexer 혼자서 토큰도 나누고 동시에 의미도 부여하면 되는거 아닌가?
  
  토크나이저에서 요소 단위로 먼저 잘라줘야 렉서에서 문자열이 들어왔을 때 이게 요소의 text인지 IDENTIFER인지 알 수 있다.
- [x] 텍스트는 어떻게 처리하지?
  element의 text로 하면 children으로 text - element - text 순으로 있을 때 text 와 element의 순서가 굉장히 애매해짐.
  xml에서는 무조건 text node로 가지고 있어야 하므로[^xml-text] 그렇게 처리함. (이건 html 파서가 아니니까..)

- [ ] 닫기가 생략 가능한 태그가 있다면, 이걸 어디서 닫아야 하는지 어떻게 추측하는가?

  지금 알아낼 만한 주제는 아니라고 생각해서 샘플 html에서 자식을 가질 수 있지만 closing tag를 생략할 수 있는 것들은 예외 처리를 하지 않고 오류가 나도록 했다. 여기에 매몰되기에는 시간이 너무 없음.

[^xml-text]: [XML DOM - Nodes](https://www.w3schools.com/xml/dom_nodes.asp)