package kr.or.connect.reservation.dao;

public class ProductDaoSqls {
	public static final String PRODUCT__SELECT_ALL = "SELECT * FROM product";

	public static final String PRODUCT__SELECT_COUNT_ALL = "SELECT count(*) FROM product";

	public static final String PRODUCT__SELECT_COUNT_BY__CATEGORY_ID = "SELECT count(*) FROM product WHERE category_id LIKE :category_id";

	public static final String PRODUCT__SELECT_ALL__LIMIT_START_COUNT = "SELECT * FROM product ORDER BY id LIMIT :start, :count";
	
	public static final String PRODUCT__SELECT_BY__CATEGORY_ID__LIMIT_START_COUNT = "SELECT * FROM product WHERE category_id = :categoryId ORDER BY id LIMIT :start, :count";
	
	public static final String PRODUCT__SELECT_BY__PRODUCT_ID = "SELECT * FROM product WHERE id = :productId";

}
