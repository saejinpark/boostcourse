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

import kr.or.connect.reservation.dto.ReservationUserComment;

import static kr.or.connect.reservation.dao.ReservationUserCommentDaoSqls.*;

@Repository
public class ReservationUserCommentDao {
	private NamedParameterJdbcTemplate jdbc;
	private RowMapper<ReservationUserComment> rowMapper = BeanPropertyRowMapper.newInstance(ReservationUserComment.class);

	public ReservationUserCommentDao(DataSource dataSource) {
		this.jdbc = new NamedParameterJdbcTemplate(dataSource);
	}

	public Integer selectCountAll() {
		return jdbc.queryForObject(RESERVATION_USER_COMMENT__SELECT_COUNT_ALL, Collections.emptyMap(), Integer.class);
	}
	
	public Integer selectCountByProductId(Integer productId) {
		Map<String, Integer> params = new HashMap<String, Integer>();
		params.put("productId", productId);
		return jdbc.queryForObject(RESERVATION_USER_COMMENT__SELECT_COUNT_BY__PRODUCT_ID, params, Integer.class);
	}
	
	public List<ReservationUserComment> selectAllLimitStart(Integer start, Integer commentCount) {
		Map<String, Integer> params = new HashMap<String, Integer>();
		params.put("start", start);
		params.put("count", commentCount);
		return jdbc.query(RESERVATION_USER_COMMENT__SELECT_ALL__LIMIT_START_COUNT, params, rowMapper);
	}
	
	public List<ReservationUserComment> selectByProductIdLimitStart(Integer productId, Integer start, Integer commentCount) {
		Map<String, Integer> params = new HashMap<String, Integer>();
		params.put("productId", productId);
		params.put("start", start);
		params.put("count", commentCount);
		return jdbc.query(RESERVATION_USER_COMMENT__SELECT_BY__PRODUCT_ID__LIMIT_START_COUNT, params, rowMapper);
	}
	

	public Float selectAvgScoreByProductId(Integer productId) {
		Map<String, Integer> params = new HashMap<String, Integer>();
		params.put("productId", productId);
		return jdbc.queryForObject(RESERVATION_USER_COMMENT__SELECT_AVG__SCORE, params, Float.class);
	}
}
