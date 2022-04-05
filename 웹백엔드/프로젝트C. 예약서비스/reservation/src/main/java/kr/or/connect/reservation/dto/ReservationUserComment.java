package kr.or.connect.reservation.dto;

import java.util.Date;

import lombok.Data;

@Data
public class ReservationUserComment {
	private Integer id;
	private Integer product_id;
	private Integer reservation_info_id;
	private Integer user_id;
	private Float score;
	private String comment;
	private Date create_date;
	private Date modify_date;
}
