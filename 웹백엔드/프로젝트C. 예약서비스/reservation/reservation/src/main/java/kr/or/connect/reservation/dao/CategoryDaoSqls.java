package kr.or.connect.reservation.dao;

public class CategoryDaoSqls {
	public static final String SELECT_ALL = 
			"SELECT category_id id, name, COUNT(category_id) count "
			+ "FROM display_info di "
			+ "RIGHT OUTER JOIN product p ON di.product_id = p.id "
			+ "RIGHT OUTER JOIN category c ON p.category_id = c.id "
			+ "GROUP BY category_id, name;"
		;
	public static final String SELECT_COUNT_ALL = 
			"SELECT COUNT(*) count "
			+ "FROM display_info di "
			+ "RIGHT OUTER JOIN product p ON di.product_id = p.id "
			+ "RIGHT OUTER JOIN category c ON p.category_id = c.id "
		;
	public static final String SELECT_COUNT_BY_ID = 
			"SELECT COUNT(*) count "
			+ "FROM display_info di "
			+ "RIGHT OUTER JOIN product p ON di.product_id = p.id "
			+ "RIGHT OUTER JOIN category c ON p.category_id = c.id "
			+ "WHERE category_id = :id;"
		;
}
