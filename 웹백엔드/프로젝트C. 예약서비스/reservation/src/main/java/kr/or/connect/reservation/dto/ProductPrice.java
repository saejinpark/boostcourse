package kr.or.connect.reservation.dto;

import java.util.Date;

import lombok.Data;

@Data
public class ProductPrice {
	private Integer id;
	private Integer product_id;
	private String price_type_name;
	private Integer price;
	private Float discount_rate;
	private Date create_date;
	private Date modify_date;
}
