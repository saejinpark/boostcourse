package kr.or.connect.reservation.dao;

public class ProductPriceDaoSqls {
	public static final String PRODUCT_PRICE__SELECT_BY__PRODUCT_ID = "SELECT * FROM product_price WHERE product_id = :productId ORDER BY id DESC";
}
