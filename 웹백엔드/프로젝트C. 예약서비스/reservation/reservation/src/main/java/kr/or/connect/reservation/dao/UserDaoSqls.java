package kr.or.connect.reservation.dao;

public class UserDaoSqls {
	public static final String USER__SELECT_ALL = "SELECT id, name, password, email, phone, create_date AS createDate, modify_date AS modifyDate FROM user";
	public static final String USER__SELECT_BY__ID = "SELECT id, name, password, email, phone, create_date AS createDate, modify_date AS modifyDate FROM user WHERE id = :id";
}
