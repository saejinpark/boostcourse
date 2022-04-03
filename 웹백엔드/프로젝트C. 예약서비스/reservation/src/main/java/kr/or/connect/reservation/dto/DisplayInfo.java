package kr.or.connect.reservation.dto;

import java.sql.Date;

import lombok.Data;

@Data
public class DisplayInfo {

	private Integer id;
	private Integer product_id;
	private String opening_hours;
	private String place_name;
	private String place_lot;
	private String place_street;
	private String tel;
	private String homepage;
	private String email;
	private Date create_date;
	private Date modify_date;
}
