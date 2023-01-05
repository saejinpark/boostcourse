package org.edwith.webbe.reservation.dao;

public class ReservationInfosDaoSqls {

	public static final String SELECT_BY_ID = "SELECT ri.id id, ri.product_id productId, ri.display_info_id displayInfoId, "
			+ "ri.cancel_flag cancelFlag, p.description productDescription, "
			+ "p.content productContent, SUM(pp.price) sumPrice, "
			+ "ri.reservation_date reservationDate, ri.create_date createDate, "
			+ "ri.modify_date modifyDate FROM reservation_info ri " + "INNER JOIN product p on p.id = ri.product_id "
			+ "INNER JOIN reservation_info_price rip ON ri.id = rip.reservation_info_id "
			+ "INNER JOIN product_price pp ON rip.product_price_id=pp.id " + "WHERE ri.id = :id;";

	public static final String SELECT_BY_RESERVATION_EMAIL = "SELECT ri.id"
			+ ", ri.product_id productId"
			+ ", ri.display_info_id displayInfoId"
			+ ", ri.reservation_name reservationName"
			+ ", ri.reservation_tel reservationTel"
			+ ", ri.reservation_email reservationEmail"
			+ ", ri.reservation_date reservationDate"
			+ ", ri.cancel_flag cancelFlag"
			+ ", ri.create_date createDate"
			+ ", ri.modify_date modifyDate"
			+ ", SUM(rip.count * pp.price / 100 * (100 - pp.discount_rate)) payment "
			+ "FROM reservation_info ri "
			+ "INNER JOIN reservation_info_price rip ON ri.id = rip.reservation_info_id "
			+ "INNER JOIN product_price pp ON pp.id = rip.product_price_id "
			+ "WHERE ri.reservation_email = :email "
			+ "GROUP BY ri.id;";

	public static final String INSERT_RESERVATION_INFO = "INSERT INTO reservation_info "
			+ "(product_id, display_info_id, reservation_name, reservation_tel, reservation_email, reservation_date, "
			+ "create_date, modify_date) "
			+ "VALUES(:productId, :displayInfoId, :reservationName, :reservationTel, :reservationEmail, "
			+ ":reservationDate, now(), now());";

	public static final String CANCEL = "UPDATE reservation_info SET cancel_flag = 1 WHERE id = :id;";
}