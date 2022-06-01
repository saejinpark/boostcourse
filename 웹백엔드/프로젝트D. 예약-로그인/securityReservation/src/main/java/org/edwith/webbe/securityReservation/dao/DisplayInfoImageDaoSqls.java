package org.edwith.webbe.securityReservation.dao;

public class DisplayInfoImageDaoSqls {
	public static final String SELECT_BY_DISPLAYID = 
			"SELECT dii.id id, display_info_id displayInfoId, fi.id fileId, "
			+ "file_name fileName, save_file_name saveFileName, content_type contentType, "
			+ "delete_flag deleteFlag, create_date createDate, modify_date modifyDate "
			+ "FROM display_info_image dii INNER JOIN file_info fi on dii.file_id = fi.id "
			+ "WHERE display_info_id = :displayId;";
}
