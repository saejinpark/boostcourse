package org.edwith.webbe.reservation.dto;

import java.util.List;

import lombok.Data;

@Data
public class ReservationComment {
	private int id;
	private int productId;
	private String email;
	private float score;
	private String comment;
	private String createDate;
	private String modifyDate;
	private List<ReservationCommentImage> reservationCommentImages;
}
