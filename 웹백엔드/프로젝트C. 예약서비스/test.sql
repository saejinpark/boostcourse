use connectdb;

SELECT IFNULL(AVG(score), 0) FROM reservation_user_comment WHERE product_id = 1;
SELECT COUNT(*) FROM reservation_user_comment;
SELECT COUNT(*) FROM reservation_user_comment WHERE product_id = 1;

SELECT ruc.id id, product_id productId, reservation_info_id reservationInfoId, score, user.id userId, comment 
FROM reservation_user_comment ruc INNER JOIN user on ruc.user_id = user.id ORDER BY ruc.id DESC LIMIT 1, 5;

SELECT id, product_id productId, reservation_info_id reservationInfoId, score, comment, create_date createDate, modify_date modifyData FROM reservation_user_comment WHERE product_id = 1 ORDER BY id DESC LIMIT 1, 5;

select * from reservation_user_comment ruc;
select * from display_info;

select * from display_info_image;
select * from reservation_user_comment_image;

select * from file_info;

select * from product;

select * from reservation_info;

select * from display_info;

SELECT COUNT(*) FROM reservation_user_comment WHERE display_info_id = 1;

select * from display_info di INNER JOIN product p ON di.id = p.id;

SELECT * FROM display_info di INNER JOIN product p ON di.product_id = p.id;