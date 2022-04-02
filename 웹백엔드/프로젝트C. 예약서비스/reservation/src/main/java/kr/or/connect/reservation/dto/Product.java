package kr.or.connect.reservation.dto;

import java.sql.Date;

import lombok.Data;

@Data
public class Product {
	private Integer id;
	private Integer category_id;
	private String description;
	private String content;
	private String event;
	private Date create_date;
	private Date modify_date;
}
