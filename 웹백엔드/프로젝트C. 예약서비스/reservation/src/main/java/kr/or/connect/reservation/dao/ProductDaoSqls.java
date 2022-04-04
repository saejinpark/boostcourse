package kr.or.connect.reservation.dao;

public class ProductDaoSqls {
	public static final String PRODUCT__SELECT_ALL = "SELECT * FROM product";

	public static final String PRODUCT__SELECT_COUNT = "SELECT count(*) FROM product";

	public static final String PRODUCT__SELECT_COUNT_BY__CATEGORY_ID = "SELECT count(*) FROM product WHERE category_id LIKE :category_id";

	public static final String PRODUCT__SELECT__LIMIT_START = "SELECT * FROM product ORDER BY id ASC LIMIT :start, :productCount";
	
	public static final String PRODUCT__SELECT_BY__CATEGORY_ID__LIMIT_START = "SELECT * FROM product WHERE category_id = :categoryId ORDER BY id ASC LIMIT :start, :productCount";
	
	public static final String PRODUCT__SELECT_BY__PRODUCT_ID = "SELECT * FROM product WHERE id = :productId";

}
