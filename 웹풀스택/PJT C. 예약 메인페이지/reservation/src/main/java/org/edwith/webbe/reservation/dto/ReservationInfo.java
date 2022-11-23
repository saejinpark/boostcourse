package org.edwith.webbe.reservation.dto;

import lombok.Data;

@Data
public class ReservationInfo {
	private int id;
	private int productId;
	private int displayInfoId;
	private String reservationName;
	private String reservationTel;
	private String reservationEmail;
	private String reservationDate;
	private String createDate;
	private String modifyDate;
}
