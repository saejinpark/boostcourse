package kr.or.connect.reservation.dto;

import lombok.Data;

@Data
public class ReservationUserCommentImage {
	private Integer id;
	private Integer reservationInfoId;
	private Integer reservationUserCommentId;
	private Integer fileId;
}
