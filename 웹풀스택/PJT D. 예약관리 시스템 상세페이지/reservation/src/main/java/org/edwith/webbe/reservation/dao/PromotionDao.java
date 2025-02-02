package org.edwith.webbe.reservation.dao;

import java.util.Collections;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import org.edwith.webbe.reservation.dto.Promotion;

import static org.edwith.webbe.reservation.dao.PromotionDaoSqls.*;

@Repository
public class PromotionDao {
	private NamedParameterJdbcTemplate jdbc;
	private RowMapper<Promotion> rowMapper = BeanPropertyRowMapper.newInstance(Promotion.class);

	public PromotionDao(DataSource dataSource) {
		this.jdbc = new NamedParameterJdbcTemplate(dataSource);
	}

	public List<Promotion> getPromotions() {
		return jdbc.query(SELECT_ALL, Collections.emptyMap(), rowMapper);
	}

	public int selectCount() {
		return jdbc.queryForObject(SELECT_COUNT_ALL, Collections.emptyMap(), int.class);
	}
}
