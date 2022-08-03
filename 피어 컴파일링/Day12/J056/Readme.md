# 나만의 체크포인트

- [x] mit init 구현
- [x] mit init 후에 디렉토리명 적어주지 않을 시 에러처리
- [x] blob, object, commit 오브젝트의 역할 정리
- [x] 디렉토리 내부 파일 전체 탐색 구현
      <img width="100%" alt="스크린샷 2022-08-02 오후 3 39 19" src="https://user-images.githubusercontent.com/83356118/182308577-e47a36de-f00d-482b-b4c8-76c5a61c1843.png">
- [x] commit 내역있는 지 없는 지 체크 구현
- [x] blob objects 내에 디렉토리 생성 구현
- [x] 해시값을 바탕으로 변경사항 기록 구현
- [x] blob 오브젝트 압축후 objects 하위폴더로 생성 구현
- [x] tree 오브젝트 생성 구현<img width="100%" alt="스크린샷 2022-08-02 오후 9 46 58" src="https://user-images.githubusercontent.com/83356118/182378161-85b5363a-fa66-4a33-a19d-3e4055db63d5.png"><img width="100%" alt="스크린샷 2022-08-02 오후 9 47 30" src="https://user-images.githubusercontent.com/83356118/182378253-b7e6756e-7ca9-44a3-8be2-e858e081a8bd.png">
- [x] commit 오브젝트 생성 구현<img width="100%" alt="스크린샷 2022-08-02 오후 10 22 23" src="https://user-images.githubusercontent.com/83356118/182385137-1af0acbb-b879-4ece-8c93-563c624272e3.png">
- [x] 커밋 기록 구현
      <img width="100%" alt="스크린샷 2022-08-02 오후 11 46 42" src="https://user-images.githubusercontent.com/83356118/182403495-04a2c232-12ea-48d5-94e1-0e176d316081.png">
- [x] 로그 이력 출력
      <img width="100%" alt="스크린샷 2022-08-03 오전 12 08 14" src="https://user-images.githubusercontent.com/83356118/182408522-a7e57e82-c5be-4d35-b6ac-83d0da980704.png">
- [x] 커밋마다 현재 트리 확인 후 변경된 파일명 함께 표시
      ![스크린샷 2022-08-03 오전 1 27 19](https://user-images.githubusercontent.com/83356118/182425459-72d9e879-3e12-4f72-9300-a4f53bd8e5fc.png)
- [x] restore로 압축 해제 콘솔에 출력
      ![스크린샷 2022-08-03 오전 2 21 52](https://user-images.githubusercontent.com/83356118/182435992-4b821a7e-e576-43a0-a0fb-5d86ffa2137e.png)

# 학습메모

1. git blob 오브젝트
   git은 해시값으로 데이터에 접근하게 하는데 해시값을 가져오는 역할은 blob 오브젝트를 통해서 수행된다.
2. git tree 오브젝트
   tree 오브젝트는 tree나 blob 오브젝트를 가질 수 있다.
   내부의 파일은 blob 오브젝트로 폴더는 tree 오브젝트로 저장된다.
3. git commit 오브젝트
   commit 오브젝트는 이전 commit 오브젝트의 해시를 가진다.
4. 구조 설계
   커밋을 하면 objects 밑에 커밋번호 디렉토리가 생기고 blob 파일이 생성됨 -> tree폴더가 생성되고 tree내용을 담은 파일이 tree폴더 밑에 생성됨 -> 커밋번호 디렉토리에 commit폴더가 생성되고 정보를 담은 commit 파일이 생성됨

### 참고사항

git 오브젝트
https://git-scm.com/book/ko/v2/Git%EC%9D%98-%EB%82%B4%EB%B6%80-Git-%EA%B0%9C%EC%B2%B4
