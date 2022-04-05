package kr.or.connect.reservation.dao;

public class ReservationUserCommentDaoSqls {
	public static final String RESERVATION_USER_COMMENT__SELECT_COUNT_ALL = "SELECT COUNT(*) FROM reservation_user_comment";
	public static final String RESERVATION_USER_COMMENT__SELECT_ALL__LIMIT_START_COUNT = "SELECT * FROM reservation_user_comment ORDER BY id DESC Limit :start, :count";
	public static final String RESERVATION_USER_COMMENT__SELECT_COUNT_BY__PRODUCT_ID = "SELECT COUNT(*) FROM reservation_user_comment WHERE product_id = :productId";
	public static final String RESERVATION_USER_COMMENT__SELECT_BY__PRODUCT_ID__LIMIT_START_COUNT = "SELECT * FROM reservation_user_comment WHERE product_id = :productId ORDER BY id DESC LIMIT :start, :count";
	public static final String RESERVATION_USER_COMMENT__SELECT_AVG__SCORE = "SELECT AVG(score) FROM reservation_user_comment WHERE product_id = :productId";
}
