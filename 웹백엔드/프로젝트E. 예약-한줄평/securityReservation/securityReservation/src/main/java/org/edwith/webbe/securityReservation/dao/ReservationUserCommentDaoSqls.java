package org.edwith.webbe.securityReservation.dao;

public class ReservationUserCommentDaoSqls {
	
	public static final String SELECT_AVG_SCORE_BY_PRODUCTID = 
			"SELECT IFNULL(AVG(score), 0) FROM reservation_user_comment WHERE product_id = :productId;";

	public static final String SELECT_COUNT_ALL = "SELECT COUNT(*) FROM reservation_user_comment;";
	
	public static final String SELECT_COUNT_BY_PRODUCTID = "SELECT COUNT(*) FROM reservation_user_comment WHERE product_id = :productId";
	
	public static final String SELECT_ALL_LIMIT_START_COUNT = 
			"SELECT ruc.id id, product_id productId, reservation_info_id "
			+ "reservationInfoId, score, user.id userId, "
			+ "comment FROM reservation_user_comment ruc "
			+ "INNER JOIN user on ruc.user_id = user.id ORDER BY ruc.id DESC LIMIT :start , :count;";
	
	public static final String SELECT_BY_PRODUCTID_LIMIT_START_COUNT = 
			"SELECT ruc.id id, product_id productId, reservation_info_id "
			+ "reservationInfoId, score, user.id userId, comment FROM reservation_user_comment ruc "
			+ "INNER JOIN user on ruc.user_id = user.id WHERE product_id = :productId ORDER BY ruc.id DESC LIMIT :start , :count;";
	
	public static final String INSERT_RESERVATION_INFO_COMMENT = 
			"INSERT INTO reservation_user_comment(product_id, reservation_info_id, user_id, score, comment, create_date, modify_date) "
			+ "VALUES(:productId, :reservationInfoId, :userId, :score, :comment, now(), now());";
}
