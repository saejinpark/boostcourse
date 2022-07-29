# 학습 목표
- 운영체제에서 프로세스를 실행해서 때 종료될 때 까지 작업을 시뮬레이션하는 프로그램
- 프로세스 스케줄링 방식을 비교해보도록 시각화
- 프로세스와 스레드의 차이점 이해 및 스레드로 병렬 처리 구현
- 프로세스, 스레드 스케줄링 방식과 알고리즘에 대해 이해하고 우선순위 큐 방식을 구현

# 나만의 체크 포인트
(미션을 달성하기 위해 필요하다고 생각되는 체크포인트 적기 + 실행 결과에 대한 기록 포함)
- [x] 프로세스를 일정한 시간동안 실행하는 프로그램 구현
- [x] 6개의 프로세스 -> 최대 동작 시간을 겹치지 않도록 구현
- [x] 1초동안 한 번에 하나에 프로세스만 실행 가능, 1초 후에는 다른 프로세스 실행(남은 프로세스가 1개인 경우 해당 프로세스 계속 실행)
- [x] 프로세스 필요한 데이터 구조 또는 타입 선언 -> process.mjs
    - [x] 프로세스 이름
    - [x] 프로세스 상태 : 4가지(ready, running, waiting, terminated)
    - [x] 누적 시간
    - [x] 최대 동작 시간
    - [x] 반환 시간
    - [x] 우선순위
    - [x] 프로세스의 상태 간 변경 구현
        - [x] ready or waiting -> running
        - [x] running -> terminated or waiting (누적 시간과 최대 동작 시간 비교)
- [x] 구현해야 할 스케줄링 방식
    - [x] deadline scheduling -> deadline_scheduling.mjs
    - [x] static priority scheduling -> static_priority_scheduling.mjs
    - [x] Round Robin scheduling
    - [x] baisc_scheduler(공통 부분만 따로 만들기)
- [x] worker 모듈 연습으로 한 번 써보기
    - [x] practice.mjs
    - [x] practice2.mjs
- [ ] 스레드 구현
    - [ ] 스레드마다 실행 시간 2초 단축 가능
    - [ ] 최대 작업 시간을 2로 나눈 몫만큼 스레드 생성
    - [ ] 프로그램 시작 시 랜덤으로 프로세스 3개 생성, 스레드 개수 표시
    - [ ] 프로그램은 모든 프로세스 작업이 끝나면 종료
    - [ ] thread -> worker 모듈
    - [ ] 특정 프로세스는 할당된 스레드가 모두 동작 완료해야 프로세스 동작 멈추기가 가능

# 실패
- worker_thread를 통해 worker를 부르고 해당 worker를 모두 기다린 후 원래 process로 돌아가 하던 일을 계속 진행한다는 의도는 이해 했으나, 만들어진 worker들을 모두 기다리는 방법을 찾지 못 했음. -> 어떻게 해결해야 할지 모르겠음.

# 피어 세션
- thread에 해당하는 구현 전까지는 확인이 가능합니다.
- 필요 파일 : process_scheduling.mjs(실행용 파일), 4개의 scheduler 구현(basic, round_robin, static_priority, deadline), process.mjs

# 학습 메모
(미션을 해결하는 중에 학습한 내용을 잊지 않도록, 기록하고 메모하기 - 학습한 키워드, 참고한 웹사이트 등)
- 구현해야 하는 각 스케줄링 방식 공부
- Deadline Scheduling : https://jackpot53.tistory.com/104  https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=babobigi&logNo=220497780134
- worker 모듈 : https://inpa.tistory.com/entry/NODE-%F0%9F%93%9A-workerthreads-%EB%AA%A8%EB%93%88
- worker thread : https://nodejs.org/api/worker_threads.html#workerparentport https://livecodestream.dev/post/how-to-work-with-worker-threads-in-nodejs/