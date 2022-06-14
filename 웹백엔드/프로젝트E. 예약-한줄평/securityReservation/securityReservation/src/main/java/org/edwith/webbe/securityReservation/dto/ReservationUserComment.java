package org.edwith.webbe.securityReservation.dto;

import java.util.List;

import lombok.Data;

@Data
public class ReservationUserComment {
	private int id;
	private int productId;
	private int reservationInfoId;
	private int score;
	private int userId;
	private String comment;
	private List<ReservationUserCommentImage> reservationUserCommentImages;
}
