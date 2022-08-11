# 나만의 체크포인트

-   [x] html 디자인 완료
-   [x] 소켓 연결
-   [x] create 완성
-   [x] csv 파일추가 구현
-   [x] insert 완성
-   [x] delete 완성
-   [x] update 완성
-   [x] select 완성
-   [x] drop 완성

# 학습메모

> 부스트코스 웹백엔드 https://www.boostcourse.org/web326/joinLectures/28304?isDesc=false >

![image](https://user-images.githubusercontent.com/54755633/183873293-ddc16480-d33b-4f07-bf99-eb60ab9f1577.png)

![image](https://user-images.githubusercontent.com/54755633/184022700-70a099a4-f2d0-4bb4-b245-748f70608380.png)

## 테스트 구문 첫단어는 선택해주세요

실행
```
node server.js

//크롬 주소창에 입력

http://localhost:3000/

```

```
//create
TABLE table_name (column1 Numeric, column2 Numeric, column3 Numeric)

//insert
INTO table_name (column1, column2, column3) VALUES (1, 2, 3)

//delete
FROM table_name WHERE id = 3

//update
table_name SET column1 = 2 WHERE id = 1

//select
* FROM table_name
column1 FROM table_name WHERE id > 2

//drop
TABLE table_name
```
