package org.edwith.webbe.reservation.dto;

import lombok.Data;

@Data
public class Promotion {
	private int id;
	private int productId;
	private int productImageId;
	private int categoryId;
	private String categoryName;
	private String description;
	private int fileId;
}
