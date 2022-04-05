package kr.or.connect.reservation.dto;

import lombok.Data;

@Data
public class ProductImage {
	private Integer id;
	private Integer productId;
	private String type;
	private Integer fileId;
}
