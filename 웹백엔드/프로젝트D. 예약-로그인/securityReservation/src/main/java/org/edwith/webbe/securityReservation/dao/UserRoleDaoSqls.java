package org.edwith.webbe.securityReservation.dao;

public class UserRoleDaoSqls {
	public static final String SELECT_BY_EMAIL = "SELECT ur.id, ur.user_id, ur.role_name FROM user_role ur JOIN user u ON ur.user_id = u.id WHERE u.email = :email";
	public static final String INSERT_ADMIN_ROLE = 
			"INSERT INTO user_role(user_id, role_name) "
			+ "VALUES (:userId, \"ROLE_ADMIN\");";
	public static final String INSERT_USER_ROLE = 
			"INSERT INTO user_role(user_id, role_name) "
			+ "VALUES (:userId, \"ROLE_USER\");";
}