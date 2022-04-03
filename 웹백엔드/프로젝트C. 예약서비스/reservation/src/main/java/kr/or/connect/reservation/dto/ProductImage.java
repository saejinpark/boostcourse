package kr.or.connect.reservation.dto;

import lombok.Data;

@Data
public class ProductImage {
	private Integer id;
	private Integer product_id;
	private String type;
	private Integer file_id;
}
