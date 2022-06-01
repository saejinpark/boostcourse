package org.edwith.webbe.securityReservation.dao;

public class UserDaoSqls {
	public static final String SELECT_BY_EMAIL = 
			"SELECT id, name, password, email, phone, create_date, modify_date "
			+ "FROM user WHERE email = :email";
	public static final String INSERT_USER =
			"INSERT INTO user(name, password, email, create_date, modify_date) "
			+ "VALUES (:name, :password, :email, :phone, :createDate, :modifyDate);";
}