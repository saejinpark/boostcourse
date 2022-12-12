package org.edwith.webbe.reservation.dto;

import java.sql.Date;

import lombok.Data;

@Data
public class ReservationCommentImage {
	private int id;
	private int reservationInfoId;
	private int reservationUserCommentId;
	private int fileId;
	private String fileName;
	private String saveFileName;
	private String contentType;
	private int deleteFlag;
	private Date createDate;
	private Date modifyDate;
}
