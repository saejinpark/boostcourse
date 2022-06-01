package org.edwith.webbe.securityReservation.dto;

import lombok.Data;

@Data
public class ProductPrice {
	private int id;
	private int productId;
	private String priceTypeName;
	private int price;
	private int discountRate;
	private String createDate;
	private String modifyDate;
}
