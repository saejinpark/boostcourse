package kr.or.connect.reservation.dao;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import kr.or.connect.reservation.dto.DisplayInfo;

import static kr.or.connect.reservation.dao.DispalyInfoDaoSqls.*;

@Repository
public class DisplayInfoDao {
	private NamedParameterJdbcTemplate jdbc;
	private RowMapper<DisplayInfo> rowMapper = BeanPropertyRowMapper.newInstance(DisplayInfo.class);

	public DisplayInfoDao(DataSource dataSource) {
		this.jdbc = new NamedParameterJdbcTemplate(dataSource);
	}

	public List<DisplayInfo> selectAll() {
		Map<String, Integer> params = new HashMap<>();
		return jdbc.query(DISPLAY_INFO__SELECT_ALL, params, rowMapper);
	}

	public int selectCount() {
		return jdbc.queryForObject(DISPLAY_INFO__SELECT_COUNT, Collections.emptyMap(), Integer.class);
	}
	
	public DisplayInfo selectByProductId(Integer productId) {
		Map<String, Integer> params = new HashMap<String, Integer>();
		params.put("productId", productId);
		return jdbc.queryForObject(DISPLAY_INFO__SELECT_BY__PRODUCT_ID, params, rowMapper);
	}

}
