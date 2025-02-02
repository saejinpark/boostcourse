package org.edwith.webbe.reservation.dao;

public class DisplayinfoDaoSqls {
	public static final String SELECT_BY_CATEGORYID_LIMIT = 
		"SELECT p.id id, category_id categoryId, di.id displayInfoId, name, "
		+ "description, content, event, opening_hours openingHours, "
		+ "place_name placeName, place_lot placeLot, place_street placeStreet, tel, "
		+ "homepage, email, di.create_date createDate, di.modify_date modifyDate, file_id fileId "
		+ "FROM display_info di INNER JOIN product p ON di.product_id = p.id "
		+ "INNER JOIN category c ON p.category_id = c.id "
		+ "INNER JOIN product_image pi ON p.id = pi.product_id "
		+ "WHERE pi.type = 'th' AND c.id = :categoryId LIMIT :start, :productCount";
	

	public static final String SELECT_ALL_LIMIT = 
		"SELECT p.id id, category_id categoryId, di.id displayInfoId, name, "
		+ "description, content, event, opening_hours openingHours, "
		+ "place_name placeName, place_lot placeLot, place_street placeStreet, tel, "
		+ "homepage, email, di.create_date createDate, di.modify_date modifyDate, file_id fileId "
		+ "FROM display_info di INNER JOIN product p ON di.product_id = p.id "
		+ "INNER JOIN category c ON p.category_id = c.id "
		+ "INNER JOIN product_image pi ON p.id = pi.product_id "
		+ "WHERE pi.type = 'ma' LIMIT :start, :productCount";

	
	public static final String SELECT_BY_ID = 
		"SELECT p.id id, category_id categoryId, di.id displayInfoId, name, "
		+ "description, content, event, opening_hours openingHours, "
		+ "place_name placeName, place_lot placeLot, place_street placeStreet, tel, "
		+ "homepage, email, di.create_date createDate, di.modify_date modifyDate, file_id fileId "
		+ "FROM display_info di INNER JOIN product p ON di.product_id = p.id "
		+ "INNER JOIN category c ON p.category_id = c.id "
		+ "INNER JOIN product_image pi ON p.id = pi.product_id "
		+ "WHERE pi.type = 'ma' AND di.id = :id";
	
}
