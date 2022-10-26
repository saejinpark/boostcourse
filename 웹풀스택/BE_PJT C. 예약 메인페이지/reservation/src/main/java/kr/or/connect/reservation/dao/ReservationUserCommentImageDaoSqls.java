package kr.or.connect.reservation.dao;

public class ReservationUserCommentImageDaoSqls {
	public static final String SELECT_BY_RESERVATIONINFOID = 
			"SELECT * FROM reservation_user_comment_image WHERE reservation_info_id = :reservationInfoId"; 
}
