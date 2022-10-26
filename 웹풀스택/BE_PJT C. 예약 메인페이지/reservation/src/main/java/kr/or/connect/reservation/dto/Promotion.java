package kr.or.connect.reservation.dto;

import lombok.Data;

@Data
public class Promotion {
	private int id;
	private int productId;
	private int categoryId;
	private String categoryName;
	private String description;
	private int fileId;
}
