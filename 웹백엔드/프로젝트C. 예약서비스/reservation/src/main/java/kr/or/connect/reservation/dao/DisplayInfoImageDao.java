package kr.or.connect.reservation.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import kr.or.connect.reservation.dto.DisplayInfoImage;

import static kr.or.connect.reservation.dao.DisplayInfoImageDaoSqls.*;

@Repository
public class DisplayInfoImageDao {
	private NamedParameterJdbcTemplate jdbc;
	private RowMapper<DisplayInfoImage> rowMapper = BeanPropertyRowMapper.newInstance(DisplayInfoImage.class);

	public DisplayInfoImageDao(DataSource dataSource) {
		this.jdbc = new NamedParameterJdbcTemplate(dataSource);
	}
	
	public List<DisplayInfoImage> selectByDisplayInfoId(Integer displayInfoId) {
		Map<String, Integer> params = new HashMap<String, Integer>();
		params.put("displayInfoId", displayInfoId);
		return jdbc.query(DISPLAY_INFO_IMAGE__SELECT_BY__DISPLAY_INFO_ID, params, rowMapper);
	}
}
