package org.edwith.webbe.securityReservation.dto;

import java.util.Date;
import java.util.List;

import lombok.Data;

@Data
public class RegisteredReservationInfo {
	private int id;
	private int productId;
	private int cancelFlag;
	private int displayInfoId;
	private int userId;
	private Date reservationDate;
	private Date createDate;
	private Date modifyDate;
	private List<ReservationInfoPrice> prices;
}
