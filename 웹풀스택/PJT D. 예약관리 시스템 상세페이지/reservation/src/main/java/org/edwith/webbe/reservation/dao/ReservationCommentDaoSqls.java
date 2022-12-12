package org.edwith.webbe.reservation.dao;

public class ReservationCommentDaoSqls {
	public static final String SELECT_AVG_SCORE_ALL = "SELECT IFNULL(AVG(score), 0) FROM reservation_user_comment;";

	public static final String SELECT_AVG_SCORE_BY_PRODUCTID = "SELECT IFNULL(AVG(score), 0) FROM reservation_user_comment WHERE product_id = :productId;";

	public static final String SELECT_COUNT_ALL = "SELECT COUNT(*) FROM reservation_user_comment;";

	public static final String SELECT_COUNT_BY_PRODUCTID = "SELECT COUNT(*) FROM reservation_user_comment WHERE product_id = :productId";

	public static final String SELECT_ALL_LIMIT_START_COUNT = "SELECT ruc.id id, ruc.product_id productId, ri.reservation_email email, score, comment, ruc.create_date createDate, ruc.modify_date modifyDate "
			+ "FROM reservation_user_comment ruc INNER JOIN reservation_info ri ON ruc.reservation_info_id = ri.id ORDER BY id DESC LIMIT :start, :count;";

	public static final String SELECT_BY_PRODUCTID_LIMIT_START_COUNT = "SELECT ruc.id id, ruc.product_id productId, ri.reservation_email email, score, comment, ruc.create_date createDate, ruc.modify_date modifyDate "
			+ "FROM reservation_user_comment ruc INNER JOIN reservation_info ri ON ruc.reservation_info_id = ri.id WHERE ruc.product_id = :productId ORDER BY id DESC LIMIT :start, :count;";

	public static final String INSERT_RESERVATION_INFO_COMMENT = "INSERT INTO reservation_user_comment(product_id, reservation_info_id, score, comment, create_date, modify_date) "
			+ "VALUES(:productId, :reservationInfoId, :score, :comment, now(), now());";
}
