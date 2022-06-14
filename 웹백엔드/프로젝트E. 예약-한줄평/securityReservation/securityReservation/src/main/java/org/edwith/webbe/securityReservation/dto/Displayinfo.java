package org.edwith.webbe.securityReservation.dto;

import lombok.Data;

@Data
public class Displayinfo {
	private int id;
	private int categoryId;
	private int displayInfoId;
	private String name;
	private String description;
	private String content;
	private String event;
	private String openingHours;
	private String placeName;
	private String placeLot;
	private String placeStreet;
	private String tel;
	private String homepage;
	private String email;
	private String createDate;
	private String modifyDate;
	private int fileId;
}
