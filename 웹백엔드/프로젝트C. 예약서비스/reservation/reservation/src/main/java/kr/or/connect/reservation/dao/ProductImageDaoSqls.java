package kr.or.connect.reservation.dao;

public class ProductImageDaoSqls {
	public static final String PRODUCT_IMAGE__SELECT_BY__PRODUCT_ID = "SELECT * FROM product_image WHERE product_id = :productId";
	public static final String PRODUCT_IMAGE__SELECT_BY__PRODUCT_ID__TYPE_MA = "SELECT * FROM product_image WHERE product_id = :productId AND type = 'ma'";
	
}
