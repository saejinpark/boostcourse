package kr.or.connect.reservation.dao;

import static kr.or.connect.reservation.dao.FileInfoDaoSqls.*;

import java.util.HashMap;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import kr.or.connect.reservation.dto.FileInfo;

@Repository
public class FileInfoDao {
	private NamedParameterJdbcTemplate jdbc;
	private RowMapper<FileInfo> rowMapper = BeanPropertyRowMapper.newInstance(FileInfo.class);

	public FileInfoDao(DataSource dataSource) {
		this.jdbc = new NamedParameterJdbcTemplate(dataSource);
	}

	public FileInfo selectByFileId(Integer fileId) {
		Map<String, Integer> params = new HashMap<String, Integer>();
		params.put("fileId", fileId);
		return jdbc.queryForObject(FILE_INFO__SELECT_BY__FILE_ID, params, rowMapper);
	}
}
