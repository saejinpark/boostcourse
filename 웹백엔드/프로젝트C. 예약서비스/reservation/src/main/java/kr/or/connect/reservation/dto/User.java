package kr.or.connect.reservation.dto;

import java.sql.Date;

import lombok.Data;

@Data
public class User {
	private int id;
	private String name;
	private String password;
	private String email;
	private String phone;
	private Date create_date;
	private Date modify_date;
}
