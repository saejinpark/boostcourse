package org.edwith.webbe.reservation.dto;

import java.util.List;

import lombok.Data;

@Data
public class ReservationComment {
	private int id;
	private int productId;
	private int reservationInfoId;
	private int score;
	private int userId;
	private String comment;
	private List<ReservationCommentImage> reservationCommentImages;
}
