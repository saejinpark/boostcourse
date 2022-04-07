package kr.or.connect.reservation.dto;

import java.sql.Date;

import lombok.Data;

@Data
public class DisplayInfo {

	private Integer id;
	private Integer productId;
	private String openingHours;
	private String placeName;
	private String placeLot;
	private String placeStreet;
	private String tel;
	private String homepage;
	private String email;
	private Date createDate;
	private Date modifyDate;
}
