package kr.or.connect.reservation.dto;

import java.util.Date;

import lombok.Data;

@Data
public class ReservationUserComment {
	private Integer id;
	private Integer productId;
	private Integer reservationInfoId;
	private Integer userId;
	private Float score;
	private String comment;
	private Date createDate;
	private Date modifyDate;
}
