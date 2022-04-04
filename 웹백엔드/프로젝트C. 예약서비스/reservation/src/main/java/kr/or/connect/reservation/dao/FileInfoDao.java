package kr.or.connect.reservation.dao;

import static kr.or.connect.reservation.dao.FileInfoDaoSqls.*;

import java.util.HashMap;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;

import kr.or.connect.reservation.dto.FileInfo;

public class FileInfoDao {
	private NamedParameterJdbcTemplate jdbc;
	private RowMapper<FileInfo> rowMapper = BeanPropertyRowMapper.newInstance(FileInfo.class);

	public FileInfoDao(DataSource dataSource) {
		this.jdbc = new NamedParameterJdbcTemplate(dataSource);
	}

	public FileInfo selectByFileId(Integer FileId) {
		Map<String, Integer> params = new HashMap<String, Integer>();
		params.put("FileId", FileId);
		return jdbc.queryForObject(FILE_INFO__SELECT_BY__FILE_ID, params, rowMapper);
	}
}
