package kr.or.connect.reservation.dto;

import java.util.Date;

import lombok.Data;

@Data
public class FileInfo {
	private Integer id;
	private String file_name;
	private String save_file_name;
	private String content_type;
	private Integer delete_flag;
	private Date create_date;
	private Date modify_date;
}
