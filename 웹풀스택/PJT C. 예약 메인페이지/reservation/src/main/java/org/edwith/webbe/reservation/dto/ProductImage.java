package org.edwith.webbe.reservation.dto;

import lombok.Data;

@Data
public class ProductImage {
	private int productId;
	private int productImageId;
	private String type;
	private int fileInfoId;
	private String fileName;
	private String saveFileName;
	private String contentType;
	private int deleteFlag;
	private String createDate;
	private String modifyDate;
}
