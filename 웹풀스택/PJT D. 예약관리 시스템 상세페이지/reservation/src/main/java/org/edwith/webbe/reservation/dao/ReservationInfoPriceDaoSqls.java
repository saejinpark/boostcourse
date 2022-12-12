package org.edwith.webbe.reservation.dao;

public class ReservationInfoPriceDaoSqls {

	public static final String SELECT_BY_RESERVATION_INFO_ID = "SELECT * FROM reservation_info_price rip WHERE rip.reservation_info_id = :reservationInfoId;";

	public static final String INSERT_RESERVATION_INFO_PRICE = "INSERT INTO reservation_info_price "
			+ "(reservation_info_id, product_price_id, count) "
			+ "VALUES(:reservationInfoId, :productPriceId, :count);";
}
