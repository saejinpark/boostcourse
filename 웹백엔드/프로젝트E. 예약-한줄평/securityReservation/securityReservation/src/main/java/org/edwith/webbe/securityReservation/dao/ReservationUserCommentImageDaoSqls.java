package org.edwith.webbe.securityReservation.dao;

public class ReservationUserCommentImageDaoSqls {
	public static final String SELECT_BY_RESERVATION_USER_COMMENT_ID = 
		"SELECT ruci.id id, ruci.reservation_info_id reservationInfoId, "
		+ "ruci.reservation_user_comment_id reservationUserCommentId, "
		+ "ruci.file_id fileId, fi.file_name fileName, fi.save_file_name "
		+ "saveFileName, fi.content_type contentType, fi.delete_flag deleteFlage, "
		+ "fi.create_date createDate, fi.modify_date modifyDate "
		+ "FROM reservation_user_comment_image ruci INNER JOIN "
		+ "file_info fi ON ruci.file_id = fi.id "
		+ "WHERE reservation_user_comment_id = :reservationUserCommentId";
	
	public static final String INSERT_RESERVATION_USER_COMMENT_IMAGE = 
		"INSERT INTO reservation_user_comment_image(reservation_info_id, reservation_user_comment_id, file_id)\r\n"
		+ "VALUE(:reservationInfoId, :reservationUserCommentId, :fileId);";
}
