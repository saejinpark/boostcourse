package kr.or.connect.reservation.dao;

public class ProductDaoSqls {
	public static final String PRODUCT__SELECT_ALL = "SELECT * FROM product";
	
	public static final String PRODUCT__SELECT_COUNT = "SELECT count(*) FROM product";
	
	public static final String PRODUCT__SELECT_COUNT__CATEGORY_ID = 
			"SELECT count(*) FROM product WHERE category_id LIKE :category_id";
}
