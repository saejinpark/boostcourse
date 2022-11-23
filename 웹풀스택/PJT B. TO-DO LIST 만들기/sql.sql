use connectdb;

select * from role;

CREATE TABLE todo ( 
	id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT, 
	title VARCHAR(255) NOT NULL, name VARCHAR(100) NOT NULL, 
	sequence INT(1) NOT NULL, type VARCHAR(20) DEFAULT 'TODO', 
	regdate DATETIME DEFAULT NOW(), 
    PRIMARY KEY (id) 
);

select * from todo;

insert into todo(title, name, sequence) values('자바스크립트공부하기', '홍길동', 1);
insert into todo(title, name, sequence) values('리포트 제출하기', '홍길동', 1);

select id, title, name, sequence, type, regdate from todo order by regdate desc;
select id, title, name, sequence, type, regdate from todo where type = 'TODO' order by regdate desc;

update todo set type = 'DOING' where id = 1;
update todo set type = 'DONE' where id = 1;

drop table todo;