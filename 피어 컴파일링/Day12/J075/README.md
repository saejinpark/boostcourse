# 체크포인트
- 구동 방법: npm install -g 입력 후, 커맨드 창에서 명령어를 입력

- [X] mit 하위 명령과 인자값 처리
    - <img width="588" alt="스크린샷 2022-08-03 오전 8 44 18" src="https://user-images.githubusercontent.com/26318372/182496947-14cdb4e4-052a-4c93-bfc4-5d93d66dc357.png">

- [X] init 명령으로 초기화
    - mit init ../temp 시 생기는 폴더들
    - <img width="221" alt="스크린샷 2022-08-03 오전 8 44 35" src="https://user-images.githubusercontent.com/26318372/182496950-1498fc1f-1e79-49e8-be4a-b1fd8d8e721a.png">

- [X] commit 명령으로 특정 디렉토리 해시값 비교
    - 아무 파일도 안올렸을 때. 
    - <img width="584" alt="스크린샷 2022-08-03 오전 8 45 46" src="https://user-images.githubusercontent.com/26318372/182496954-812cb07e-3287-4c86-a719-2eba659039b5.png">
    - 새 파일 올릴 때.
    - hello.txt -> hello, world! , text.txt -> 테스트입니다. 내용
    - <img width="202" alt="스크린샷 2022-08-03 오전 8 46 01" src="https://user-images.githubusercontent.com/26318372/182496957-488ecfd7-f074-4520-8072-b04456afb0a6.png">
    - <img width="569" alt="스크린샷 2022-08-03 오전 8 46 13" src="https://user-images.githubusercontent.com/26318372/182496958-1cb495bd-f7e9-404c-940d-4c3cf51da413.png">

    - 같은 파일 올리려고 했을 때
    - <img width="590" alt="스크린샷 2022-08-03 오전 8 46 26" src="https://user-images.githubusercontent.com/26318372/182496959-88babc55-a913-42ec-8f10-5735463276c5.png">

- [X] blob 오브젝트 폴더/파일 생성
    - <img width="205" alt="스크린샷 2022-08-03 오전 8 47 29" src="https://user-images.githubusercontent.com/26318372/182496960-a54a5e6f-3677-44e7-ba0c-d1de7b83feca.png">

- [X] blob 오브젝트 zlib 압축 저장
    - <img width="739" alt="스크린샷 2022-08-03 오전 8 47 44" src="https://user-images.githubusercontent.com/26318372/182496961-c1586f60-28b2-462b-ae35-6f3dc798584d.png">

- [X] tree 오브젝트 폴더/파일 생성
    - <img width="222" alt="스크린샷 2022-08-03 오전 8 48 11" src="https://user-images.githubusercontent.com/26318372/182496962-0e24370a-b3c8-4c3f-a42d-333f4ce2050d.png">

- [X] tree 오브젝트 blob 관련 파일 작성
    - <img width="860" alt="스크린샷 2022-08-03 오전 8 48 19" src="https://user-images.githubusercontent.com/26318372/182496963-b0608bc1-d8af-42dc-95e4-66bf2b718e48.png">

- [X] commit 오브젝트 폴더/파일 생성
    - <img width="226" alt="스크린샷 2022-08-03 오전 8 49 04" src="https://user-images.githubusercontent.com/26318372/182496966-b8c66569-eb24-4139-a24f-0a17a46d2d89.png">

- [X] commit 오브젝트 tree, 날짜 파일 작성
    - 맨 처음 파일이라 prev hash 없는 모습
    - <img width="837" alt="스크린샷 2022-08-03 오전 8 49 28" src="https://user-images.githubusercontent.com/26318372/182496969-e0f54c8d-ff4b-4fa4-bb81-8dfc2dcdee5a.png">
    - 이후 prev hash 존재하는 모습
    - <img width="1007" alt="스크린샷 2022-08-03 오전 8 49 44" src="https://user-images.githubusercontent.com/26318372/182496970-1102cfb5-e590-4cb8-b2e3-df6f5b02e919.png">

- [X] commits 파일에 커밋 해시값 기록
    - 캡처를 못해 추후 추가해서 위에 보였던 커밋 해시값과 다를 수 있음
    - <img width="681" alt="스크린샷 2022-08-03 오전 9 10 24" src="https://user-images.githubusercontent.com/26318372/182497440-d6f01d89-0241-4ad3-ad18-ec474c1fa7a8.png">

- [X] log 명령으로 commits 파일에서 이력 출력
    - <img width="723" alt="스크린샷 2022-08-03 오전 8 50 45" src="https://user-images.githubusercontent.com/26318372/182496971-48b4b51a-5d7a-4114-9384-93768bbcdf5d.png">

- [X] restore 명령으로 commits에서 해시값 비교해서 restore 대상 찾기
    - <img width="811" alt="스크린샷 2022-08-03 오전 8 51 41" src="https://user-images.githubusercontent.com/26318372/182496972-f6ad96af-92de-4528-85b6-6b3dc995ccf3.png">

- [X] 커밋 해시값 8자리와 64자리 모두 지원
    - 여덟자리는 위의 사진에 있음
    - 64자리 캡처는 나중에 캡처해 위에 보였던 커밋 해시값과 다를 수 있음
    - <img width="956" alt="스크린샷 2022-08-03 오전 9 12 34" src="https://user-images.githubusercontent.com/26318372/182497614-9d00ae3f-122d-489a-a960-588c441fd3da.png">

- [X] tree와 blob 오브젝트를 참고하여 zlib 복구해서 파일 내용 복원
    - <img width="962" alt="스크린샷 2022-08-03 오전 9 04 02" src="https://user-images.githubusercontent.com/26318372/182496973-b5fdaca6-122a-45f8-bac8-b8e31685dada.png">
    - <img width="1126" alt="스크린샷 2022-08-03 오전 9 14 55" src="https://user-images.githubusercontent.com/26318372/182497813-fecd9c75-513a-4712-9575-a42eb3b9c964.png">

# 나만의 체크포인트
- [X] init 명령어 구현
    - [X] 디렉토리 아래에 .mit 하위 디렉토리 objects 생성
    - [X] 디렉토리 아래에 .mit 하위 디렉토리 index 생성
- [X] commit 명령어 구현
    - [X] 디렉토리에서 전체 파일 목록 가져오기
    - [X] 파일별로 blob 오브젝트를 생성
    - [X] tree 오브젝트 생성
    - [X] commit object 생성
    - [X] 커밋 기록을 index에 기록
- [X] log 명령어 구현
- [X] restore 명령어 구현

# 학습 메모
## 구현 과정
- 콘솔 명령 구현
    - cli 를 이용하기 위해 package.json에 bin 설정을 추가해주었다. 
- init 명령어 구현
    - 폴더를 생성하기 위해서 fs 모듈를 임포트하였다. 
    - 파일 경로를 어떻게 알 수 있을까 고민하다가 path 모듈을 알게 되어서 이용하였다.
- commit 명령어 구현
    - 우선 디렉토리 안의 전체 파일 목록을 가지고 온다. 디렉토리는 제외한다. 
    - 파일 내용을 가지고 와서 해시 256을 적용한다. 
    - 파일 원본내용을 zlib으로 압축하면 비동기로 진행되서 await를 사용하였다. -> 동기 모듈이 있어서 deflateSync 로 대체
    - 이전 트리 해시값을 가지고, 현재 트리값과 함께 commit 오브젝트를 생성한다.
    - index에 commit object의 해시값을 기록한다.
- log 명령어 구현
    - 커밋 기록들을 가지고와서 커밋마다 tree를 돌아 파일명 등을 가지고와서 형식에 맞게 출력했다. 

## 학습 키워드
- CLI
- Sha256
- git
- zlib
- fs
- path

## 참고 자료
- git 내부 동작
    - https://velog.io/@rnjsrntkd95/Git-%EB%82%B4%EB%B6%80-%EB%8F%99%EC%9E%91%EC%9D%98-%EC%9D%B4%ED%95%B4
- js 폴더 만들기
    - https://nodejs.dev/learn/working-with-folders-in-nodejs
- js 상위 디렉토리까지 한번에 생성
    - https://secondmemory.kr/667
- js path 모듈로 경로 다루기
    - https://www.daleseo.com/js-node-path/
- js 디렉토리안의 파일 목록 가져오기
    - http://daplus.net/javascript-node-js%EC%9D%98-%EB%94%94%EB%A0%89%ED%86%A0%EB%A6%AC%EC%97%90%EC%9E%88%EB%8A%94-%EB%AA%A8%EB%93%A0-%ED%8C%8C%EC%9D%BC%EC%9D%98-%EC%9D%B4%EB%A6%84-%EB%AA%A9%EB%A1%9D%EC%9D%84-%EC%96%B4/
- js 디렉토리인지 파일인지 체크
    - https://itinerant.tistory.com/104
- sha256 해시함수 사용
    - https://backend-intro.vlpt.us/3/02.html
    - https://remarkablemark.medium.com/how-to-generate-a-sha-256-hash-with-javascript-d3b2696382fd
- substr
    - https://codechacha.com/ko/javascript-how-to-substring/
- zlib 문자열 압축
    - https://nodejs.sideeffect.kr/docs/v0.10.7/api/zlib.html
- CLI
    - https://kim-oriental.tistory.com/29
    - https://velog.io/@skh9797/CLI-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%A8-%EB%A7%8C%EB%93%A4%EA%B8%B0
- js 파일 사이즈 구하기
    - https://bonita-sy.tistory.com/entry/Nodejs-%ED%8C%8C%EC%9D%BC-%EC%82%AC%EC%9D%B4%EC%A6%88-%EA%B5%AC%ED%95%98%EA%B8%B0