package kr.or.connect.reservation.dto;

import java.util.List;

import lombok.Data;

@Data
public class ReservationUserComment {
	private int id;
	private int productId;
	private int reservationInfoId;
	private int score;
	private String reservationEmail;
	private String comment;
	private String createDate;
	private String modifyDate;
	private List<ReservationUserCommentImage> reservationUserCommentImages;
}
