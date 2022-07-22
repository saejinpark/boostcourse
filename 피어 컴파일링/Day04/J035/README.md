나만의 체크포인트
===
- [x] 프로세스 메모리 구조 정리하기
- [ ] Memory 객체 구현하기
  - [x] init
  - [x] setSize
  - [x] malloc
  - [x] free
  - [x] call
  - [x] returnForm
  - [x] usage
  - [ ] callstack
  - [ ] heapdump
  - [ ] garbageCollect
  - [x] reset

<br>

학습 메모
===
> **메모리 관리 모델에 대한 지식을 학습하고 동작 방식을 이해하면 프로그래밍 언어 동작과 처리 흐름을 이해하는 데 도움이 된다.**

**노션에 정리**    
- 메모리 한 칸의 크기는 1바이트이다.
- 배열 한 칸을 4바이트로 생각하고 구현함.
- 포인터란?
- 콜스택
- 메모리힙

<br>

실행 스크립트
===

**순서대로 하지 않으면 오류날 가능성이 큼**
**usage 또는 reset은 다 사용가능**
```
init 50 50
setSize number 1
setSize string 1
call
malloc number 2
malloc string 5
free 1
free 2
returnFrom foo
```

출처
===

- 프로세스 메모리 구조
  - https://everybe-ok.tistory.com/15
- malloc & free
  - https://blockdmask.tistory.com/290
  - https://coding-factory.tistory.com/671
  - https://scvtwo.tistory.com/148
  - http://www.tcpschool.com/c/c_memory_malloc
- 바이트 크기
  - https://harrydony.tistory.com/34
- 시뮬레이터
  - https://speakerdeck.com/deepu105/v8-memory-usage-stack-and-heap?slide=15


