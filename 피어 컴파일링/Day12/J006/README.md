## 체크리스트

- [x] mit 하위 명령과 인자값 처리

- [x] init 명령으로 초기화

- [x] commit 명령으로 특정 디렉토리 해시값 비교

- [x] blob 오브젝트 폴더/파일 생성

- [x] blob 오브젝트 zlib 압축 저장

- [x] tree 오브젝트 폴더/파일 생성

- [x] tree 오브젝트 blob 관련 파일 작성

- [x] commit 오브젝트 폴더/파일 생성

- [x] commit 오브젝트 tree, 날짜 파일 작성

- [x] commits 파일에 커밋 해시값 기록
![결과물](https://user-images.githubusercontent.com/61281128/182494851-ee8eeb3c-5646-49d1-aed5-288760734302.PNG)

- [x] log 명령으로 commits 파일에서 이력 출력
![로그 테스트](https://user-images.githubusercontent.com/61281128/182494823-3892d044-1a96-4f30-9627-9e75641d70e1.PNG)

- [ ] restore 명령으로 commits에서 해시값 비교해서 restore 대상 찾기

- [ ] 커밋 해시값 8자리와 64자리 모두 지원

- [ ] tree와 blob 오브젝트를 참고하여 zlib 복구해서 파일 내용 복원
