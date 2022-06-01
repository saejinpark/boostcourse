package org.edwith.webbe.securityReservation.dao;

public class ReservationInfosDaoSqls {
	
	public static final String SELECT_BY_ID = 
			"SELECT ri.id id, ri.product_id productId, ri.display_info_id displayInfoId, "
			+ "ri.cancel_flag cancelFlag, p.description productDescription, "
			+ "p.content productContent, ri.user_id userId, SUM(pp.price) sumPrice, "
			+ "ri.reservation_date reservationDate, ri.create_date createDate, "
			+ "ri.modify_date modifyDate FROM reservation_info ri "
			+ "INNER JOIN product p on p.id = ri.product_id "
			+ "INNER JOIN reservation_info_price rip ON ri.id = rip.reservation_info_id "
			+ "INNER JOIN product_price pp ON rip.product_price_id=pp.id "
			+ "WHERE ri.id = :id GROUP BY ri.id;";
	
	public static final String SELECT_BY_USER_ID = 
			"SELECT ri.id id, ri.product_id productId, ri.display_info_id displayInfoId, "
			+ "ri.cancel_flag cancelFlag, p.description productDescription, "
			+ "p.content productContent, ri.user_id userId, SUM(pp.price*rip.count) sumPrice, "
			+ "ri.reservation_date reservationDate, ri.create_date createDate, "
			+ "ri.modify_date modifyDate FROM reservation_info ri "
			+ "INNER JOIN product p on p.id = ri.product_id "
			+ "INNER JOIN reservation_info_price rip ON ri.id = rip.reservation_info_id "
			+ "INNER JOIN product_price pp ON rip.product_price_id=pp.id "
			+ "WHERE ri.user_id = :userId GROUP BY ri.id ORDER BY id DESC;";
	
	public static final String INSERT_RESERVATION_INFO =
			"INSERT INTO reservation_info "
			+ "(product_id, display_info_id, user_id, reservation_date, "
			+ "cancel_flag, create_date, modify_date) "
			+ "VALUES(:productId, :displayInfoId, :userId, :reservationDate, "
			+ ":cancelFlag, :createDate, :modifyDate);";
	
	public static final String INSERT_RESERVATION_INFO_PRICE =
			"INSERT INTO reservation_info_price "
			+ "(reservation_info_id, product_price_id, count) "
			+ "VALUES(:reservationInfoId, :productPriceId, :count);";
	
	public static final String UPDATE_CANCEL_FLAG = 
			"UPDATE reservation_info SET cancel_flag = 1 WHERE id = :id;";
}