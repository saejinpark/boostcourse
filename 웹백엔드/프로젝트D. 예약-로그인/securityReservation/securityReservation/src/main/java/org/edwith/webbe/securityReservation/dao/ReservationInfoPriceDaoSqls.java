package org.edwith.webbe.securityReservation.dao;

public class ReservationInfoPriceDaoSqls {
	
	public static final String SELECT_BY_RESERVATION_INFO_ID =
			"SELECT * FROM reservation_info_price rip WHERE rip.reservation_info_id = :reservationInfoId;";

}
