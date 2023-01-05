package org.edwith.webbe.reservation.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import org.edwith.webbe.reservation.dto.DisplayInfo;

import static org.edwith.webbe.reservation.dao.DisplayInfoDaoSqls.*;

@Repository
public class DisplayInfoDao {
	private NamedParameterJdbcTemplate jdbc;
	private RowMapper<DisplayInfo> rowMapper = BeanPropertyRowMapper.newInstance(DisplayInfo.class);

	public DisplayInfoDao(DataSource dataSource) {
		this.jdbc = new NamedParameterJdbcTemplate(dataSource);
	}

	public List<DisplayInfo> getDisplayInfos(Integer start, Integer productCount) {
		Map<String, Integer> params = new HashMap<>();
		params.put("start", start);
		params.put("productCount", productCount);
		return jdbc.query(SELECT_ALL_LIMIT, params, rowMapper);
	}

	public List<DisplayInfo> getDisplayInfos(Integer categoryId, Integer start, Integer productCount) {
		Map<String, Integer> params = new HashMap<>();
		params.put("categoryId", categoryId);
		params.put("start", start);
		params.put("productCount", productCount);
		return jdbc.query(SELECT_BY_CATEGORYID_LIMIT, params, rowMapper);
	}

	public DisplayInfo getDisplayInfos(Integer id) {
		Map<String, Integer> params = new HashMap<>();
		params.put("id", id);
		return jdbc.queryForObject(SELECT_BY_ID, params, rowMapper);
	}

}
