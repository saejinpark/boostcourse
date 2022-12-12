package org.edwith.webbe.reservation.dto;

import java.util.Date;
import java.util.List;

import lombok.Data;

@Data
public class RegisteredReservationInfo {
	private int id;
	private int productId;
	private int displayInfoId;
	private String reservationName;
	private String reservationTel;
	private String reservationEmail;
	private Date reservationDate;
	private Date createDate;
	private Date modifyDate;
	private List<ReservationInfoPrice> prices;
}
