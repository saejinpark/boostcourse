package kr.or.connect.reservation.dao;

public class ProductDaoSqls {
	public static final String PRODUCT__SELECT_ALL = "SELECT * FROM product";
	public static final String PRODUCT__SELECT_COUNT_ALL__CATEGORY_ID = "SELECT COUNT(*) FROM product WHERE category_id = :categoryId";
	public static final String PRODUCT__SELECT_BY__PRODUCT_ID = "SELECT * FROM product WHERE id = :productId";
}
