package org.edwith.webbe.reservation.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import org.edwith.webbe.reservation.dto.DisplayInfoImage;

import static org.edwith.webbe.reservation.dao.DisplayInfoImageDaoSqls.*;

@Repository
public class DisplayInfoImageDao {
    private NamedParameterJdbcTemplate jdbc;
    private RowMapper<DisplayInfoImage> rowMapper = BeanPropertyRowMapper.newInstance(DisplayInfoImage.class);

    public DisplayInfoImageDao(DataSource dataSource) {
        this.jdbc = new NamedParameterJdbcTemplate(dataSource);
    }
    

	public List<DisplayInfoImage> selectByProductId(Integer displayId) {
		Map<String, Integer> params = new HashMap<>();
		params.put("displayId", displayId);
		return jdbc.query(SELECT_BY_DISPLAYID, params, rowMapper);
	}
}
