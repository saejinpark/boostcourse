use BusinessCard;
create table BusinessCard(
    name varchar(20),
    phone char(13),
    companyName varchar(20),
    createDate long
);
drop table BusinessCard;
insert into BusinessCard values("바바바", "000-0000-0000", "회사이름", 3483379384784);
select * from BusinessCard;
SELECT name, phone, companyName, createDate FROM BusinessCard WHERE name like '%p%';