package kr.or.connect.reservation.dto;

import java.util.Date;

import lombok.Data;

@Data
public class FileInfo {
	private Integer id;
	private String fileName;
	private String saveFileName;
	private String contentType;
	private Integer deleteFlag;
	private Date createDate;
	private Date modifyDate;
}
