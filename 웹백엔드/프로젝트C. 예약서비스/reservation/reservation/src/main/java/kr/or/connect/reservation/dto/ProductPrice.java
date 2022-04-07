package kr.or.connect.reservation.dto;

import java.util.Date;

import lombok.Data;

@Data
public class ProductPrice {
	private Integer id;
	private Integer productId;
	private String priceTypeName;
	private Integer price;
	private Float discountRate;
	private Date createDate;
	private Date modifyDate;
}
