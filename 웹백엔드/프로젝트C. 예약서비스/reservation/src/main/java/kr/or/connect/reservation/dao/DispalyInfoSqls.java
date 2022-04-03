package kr.or.connect.reservation.dao;

public class DispalyInfoSqls {
	public static final String DISPLAY_INFO__SELECT_ALL = "SELECT * FROM display_info";
	
	public static final String DISPLAY_INFO__SELECT_COUNT = "SELECT count(*) FROM display_info";

	public static final String DISPLAY_INFO__SELECT_BY__PRODUCT_ID = "SELECT * FROM display_info WHERE product_id = :productId";
	
	
}
