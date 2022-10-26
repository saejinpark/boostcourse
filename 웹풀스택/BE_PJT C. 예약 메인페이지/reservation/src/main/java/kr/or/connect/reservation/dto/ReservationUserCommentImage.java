package kr.or.connect.reservation.dto;

import lombok.Data;

@Data
public class ReservationUserCommentImage {
	private int id;
	private int reservationInfoId;
	private int reservationUserCommentId;
	private int fileId;
}
