package org.edwith.webbe.reservation.dao;

public class ReservationInfosDaoSqls {

	public static final String SELECT_BY_ID = "SELECT ri.id id, ri.product_id productId, ri.display_info_id displayInfoId, "
			+ "ri.cancel_flag cancelFlag, p.description productDescription, "
			+ "p.content productContent, SUM(pp.price) sumPrice, "
			+ "ri.reservation_date reservationDate, ri.create_date createDate, "
			+ "ri.modify_date modifyDate FROM reservation_info ri " + "INNER JOIN product p on p.id = ri.product_id "
			+ "INNER JOIN reservation_info_price rip ON ri.id = rip.reservation_info_id "
			+ "INNER JOIN product_price pp ON rip.product_price_id=pp.id " + "WHERE ri.id = :id;";

	public static final String SELECT_BY_RESERVATION_EMAIL = "SELECT ri.id id, ri.product_id productId, ri.display_info_id displayInfoId, "
			+ "ri.cancel_flag cancelFlag, p.description productDescription, "
			+ "p.content productContent, ri.user_id userId, SUM(pp.price*rip.count) sumPrice, "
			+ "ri.reservation_date reservationDate, ri.create_date createDate, "
			+ "ri.modify_date modifyDate FROM reservation_info ri " + "INNER JOIN product p on p.id = ri.product_id "
			+ "INNER JOIN reservation_info_price rip ON ri.id = rip.reservation_info_id "
			+ "INNER JOIN product_price pp ON rip.product_price_id=pp.id "
			+ "WHERE ri.user_id = :userId GROUP BY ri.id ORDER BY id DESC;";

	public static final String INSERT_RESERVATION_INFO = "INSERT INTO reservation_info "
			+ "(product_id, display_info_id, reservation_name, reservation_tel, reservation_email, reservation_date, "
			+ "create_date, modify_date) "
			+ "VALUES(:productId, :displayInfoId, :reservationName, :reservationTel, :reservationEmail "
			+ ":reservationDate, :createDate, :modifyDate);";

}