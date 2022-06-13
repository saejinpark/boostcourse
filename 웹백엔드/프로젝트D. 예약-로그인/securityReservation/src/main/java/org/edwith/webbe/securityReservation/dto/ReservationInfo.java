package org.edwith.webbe.securityReservation.dto;

import lombok.Data;

@Data
public class ReservationInfo {
	private int id;
	private int productId;
	private int displayInfoId;
	private int cancelFlag;
	private String productDescription;
	private String productContent;
	private int userId;
	private int sumPrice;
	private String reservationDate;
	private String createDate;
	private String modifyDate;
}
