package org.edwith.webbe.securityReservation.dao;

public class FileInfoDaoSqls {
	public static final String INSERT_FILE_INFO =
		"INSERT INTO file_info(file_name, save_file_name, content_type, delete_flag, create_date, modify_date) VALUES(:fileName, :saveFileName, :contentType, 0, now(), now());";

	public static final String SELECT_BY_ID = 
		"SELECT * FROM file_info WHERE id = :fileId;";
}
