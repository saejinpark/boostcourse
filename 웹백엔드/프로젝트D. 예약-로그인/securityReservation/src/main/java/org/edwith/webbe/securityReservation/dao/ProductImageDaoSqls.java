package org.edwith.webbe.securityReservation.dao;

public class ProductImageDaoSqls {
	public static final String SELECT_BY_PRODUCTID = 
			"SELECT product_id productId, pi.id productImageId, type, file_id fileInfoId, "
			+ "file_name fileName, save_file_name saveFileName, content_type contentType, "
			+ "delete_flag deleteFlag, create_date createDate, modify_date modifyDate "
			+ "FROM product_image pi INNER JOIN file_info fi ON pi.file_id = fi.id "
			+ "WHERE product_id = :productId;";
}
