package org.edwith.webbe.securityReservation.dto;

import lombok.Data;

@Data
public class ReservationInfoPrice {
	private Integer id;
	private Integer reservationInfoId;
	private Integer productPriceId;
	private Integer count;
}
