package org.edwith.webbe.reservation.dao;

public class CategoryDaoSqls {
	public static final String SELECT_ALL = 
			"SELECT category_id id, name, COUNT(category_id) count "
			+ "FROM display_info di "
			+ "INNER JOIN product p ON di.product_id = p.id "
			+ "INNER JOIN category c ON p.category_id = c.id "
			+ "GROUP BY category_id, name;"
		;
	public static final String SELECT_COUNT_ALL = 
			"SELECT COUNT(*) count "
			+ "FROM display_info"
		;
	public static final String SELECT_COUNT_BY_ID = 
			"SELECT COUNT(*) count "
			+ "FROM display_info di "
			+ "INNER JOIN product p ON di.product_id = p.id "
			+ "INNER JOIN category c ON p.category_id = c.id "
			+ "WHERE category_id = :id;"
		;
}
