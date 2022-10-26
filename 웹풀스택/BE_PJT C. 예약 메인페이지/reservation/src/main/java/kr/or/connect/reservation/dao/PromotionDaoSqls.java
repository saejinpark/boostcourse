package kr.or.connect.reservation.dao;

public class PromotionDaoSqls {
	public static final String SELECT_ALL = 
			"SELECT promotion.id id, product.id productId, c.id categoryId, "
			+ "c.name categoryName, product.description description, pm.file_id fileId "
			+ "FROM promotion INNER JOIN product ON promotion.product_id = product.id "
			+ "RIGHT OUTER JOIN category c ON category_id = c.id "
			+ "INNER JOIN product_image pm ON pm.product_id = product.id " + "AND pm.type = 'ma'";

	public static final String SELECT_COUNT_ALL = 
			"SELECT COUNT(*) FROM promotion";
}
