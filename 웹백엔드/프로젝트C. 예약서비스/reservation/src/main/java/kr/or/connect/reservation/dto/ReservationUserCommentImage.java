package kr.or.connect.reservation.dto;

import lombok.Data;

@Data
public class ReservationUserCommentImage {
	private Integer id;
	private Integer reservation_info_id;
	private Integer reservation_user_comment_id;
	private Integer file_id;
}
