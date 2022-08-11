# 나만의 체크포인트
## SQL 데이터관리
- [x] 입력 명령어 validation
- [x] `CREATE TABLE` 구현
- [x] `INSERT INTO` 구현
- [x] `DELETE FROM` 구현
- [x] `UPDATE` 구현
- [x] `SELECT FROM` 구현
- [x] `DROP TABLE` 구현
## 리포트와 내보내기
- [x] `REPORT TABLE` 구현
- [x] `EXPORT TO` 구현
- [x] `IMPORT FROM` 구현
# 학습 메모
## CSV
열과 행을 쉼표와 개행으로 구분하는 간단한 엑셀 형태의 파일  
## 테스트 예시
```
// CREATE
CREATE TABLE billboard (singer String, year Numeric, song String)
// INSERT
INSERT INTO billboard (singer, year, song) VALUES ("BTS", 2015, "I NEED U")
INSERT INTO billboard (singer, year, song) VALUES ("BTS", 20170, "DNA")
INSERT INTO billboard (singer, year, song) VALUES ("BTS", 2018, "FAKE LOVE")
INSERT INTO billboard (singer, year, song) VALUES ("BTS", 2020, "Dynamite")
INSERT INTO billboard (singer, year, song) VALUES ("BTS", 2021, "Butter")
INSERT INTO billboard (singer, year, song) VALUES ("One Direction", 2012, "What Makes You Beautiful")
INSERT INTO billboard (singer, year, song) VALUES ("IU", 2021, "Celebrity")
// DELETE
DELETE FROM billboard WHERE song = "FAKE LOVE"
// UPDATE
UPDATE billboard SET year = 2017 WHERE song = "DNA"
// SELECT
SELECT FROM billboard WHERE singer="BTS"
// DROP
DROP TABLE billboard
// REPORT
CREATE TABLE billboard (singer String, year Numeric, song String)
INSERT INTO billboard (singer, year, song) VALUES ("BTS", 2015, "I NEED U")
INSERT INTO billboard (singer, year, song) VALUES ("BTS", 20170, "DNA")
INSERT INTO billboard (singer, year, song) VALUES ("BTS", 2018, "FAKE LOVE")
INSERT INTO billboard (singer, year, song) VALUES ("BTS", 2020, "Dynamite")
INSERT INTO billboard (singer, year, song) VALUES ("BTS", 2021, "Butter")
INSERT INTO billboard (singer, year, song) VALUES ("One Direction", 2012, "What Makes You Beautiful")
INSERT INTO billboard (singer, year, song) VALUES ("IU", 2021, "Celebrity")
REPORT TABLE billboard
// EXPORT
EXPORT TO btsboard FROM billboard WHERE singer = "BTS"
//IMPORT
CREATE TABLE myboard (singer String, song String, year Numeric)
INSERT INTO myboard (singer, year, song) VALUES ("Cherry Filter", 2006, "Happy Day")
INSERT INTO myboard (singer, year, song) VALUES ("IU", 2021, "Celebrity")
INSERT INTO myboard (singer, year, song) VALUES ("BTS", 2021, "Butter")
INSERT INTO myboard (singer, year, song) VALUES ("10CM", 2018, "Perfect")
IMPORT FROM myboard TO billboard
```
# Refs.
[Data types in CSV | WebDataRocks](https://www.webdatarocks.com/doc/data-types-in-csv/)  

[SQL Compare String | Complete Guide to SQL Compare String](https://www.educba.com/sql-compare-string/)  

[Reading and Writing CSV Files with Node.js](https://stackabuse.com/reading-and-writing-csv-files-with-node-js/)  

[[Nodejs] fs (파일 시스템) 읽기, 쓰기, 붙여쓰기, 삭제 등등..](https://3dmpengines.tistory.com/1971)  