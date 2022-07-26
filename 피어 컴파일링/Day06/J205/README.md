how to use

```
node index.js
```

# 나만의체크포인트

## XML Parser

- [x] tokenizer
- [x] lexer
- [x] parser
- [x] stack
- [ ] HTML 샘플 페이지 에 포함된 HTML 분석 처리 가능

## XPath 처리

- [x] elementByAttribute
- [x] findXPath()

  - [ ] 샘플 HTML에서 XPath로 /html/body/p[2]/span 처리

  - [x] 리소스 XML에서 XPath로 /vector/group[2]/path 처리

- [x] elementsByTag()

# 학습메모

## Dom tree 생성 과정

1. Conversion(변환) : HTML의 raw bytes(원시 바이트)형태로 서버에서 받아온다. 해당 파일의 인코딩(예:UTF-8)에 따라 문자로 변환한다.
2. Tokenizing(토큰화) : 브라우저가 변환된 문자열을 HTML5 표준에 따라 고유 토큰으로 변환한다.
3. Lexing(렉싱) : 이 토큰들은 다시 각각의 특성과 규칙을 정의한 object(객체) “노드”로 변환된다.
4. DOM 생성 : HTML 마크업이 여러 태그 간의 관계를 나타내기 때문에 DOM은 트리 구조를 가진다. 따라서, DOM에 포함된 노드 또한 서로 관계를 가지게 된다. 다시 말해서, 노드의 상대적인 관계를 이용하면, 하나의 노드를 기준으로 모든 노드에 접근할 수 있다.
