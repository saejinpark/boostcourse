package org.edwith.webbe.reservation.dao;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.sql.DataSource;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import org.edwith.webbe.reservation.dto.ReservationComment;

import static org.edwith.webbe.reservation.dao.ReservationCommentDaoSqls.*;

@Repository
public class ReservationCommentDao {
	private final ReservationCommentImageDao reservationCommentImageDao;
	private final NamedParameterJdbcTemplate jdbc;
	private RowMapper<ReservationComment> rowMapper = BeanPropertyRowMapper.newInstance(ReservationComment.class);

	public ReservationCommentDao(ReservationCommentImageDao reservationCommentImageDao, DataSource dataSource) {
		this.reservationCommentImageDao = reservationCommentImageDao;
		this.jdbc = new NamedParameterJdbcTemplate(dataSource);
	}
	
	public Float selectAvgScoreAll() {
		Map<String, Integer> params = new HashMap<>();
		return jdbc.queryForObject(SELECT_AVG_SCORE_ALL, params, Float.class);
	}

	public Float selectAvgScoreByProductId(int productId) {
		Map<String, Integer> params = new HashMap<>();
		params.put("productId", productId);
		return jdbc.queryForObject(SELECT_AVG_SCORE_BY_PRODUCTID, params, Float.class);
	}

	public int selectCountAll() {
		return jdbc.queryForObject(SELECT_COUNT_ALL, Collections.emptyMap(), int.class);
	}

	public int selectCountDisplayInfoId(Integer productId) {
		Map<String, Integer> params = new HashMap<>();
		params.put("productId", productId);
		return jdbc.queryForObject(SELECT_COUNT_BY_PRODUCTID, params, int.class);
	}

	public List<ReservationComment> getComments(Integer start, Integer count) {
		Map<String, Integer> params = new HashMap<String, Integer>();
		params.put("start", start);
		params.put("count", count);
		List<ReservationComment> reservationComments = jdbc.query(SELECT_ALL_LIMIT_START_COUNT, params, rowMapper);
		reservationComments = reservationComments.stream().map(reservationComment -> {
			reservationComment.setReservationCommentImages(
					reservationCommentImageDao.selectByReservationCommentId(reservationComment.getId()));
			return reservationComment;
		}).collect(Collectors.toList());
		return reservationComments;
	}

	public List<ReservationComment> getComments(Integer productId, Integer start, Integer count) {
		Map<String, Integer> params = new HashMap<String, Integer>();
		params.put("productId", productId);
		params.put("start", start);
		params.put("count", count);
		List<ReservationComment> reservationComments = jdbc.query(SELECT_BY_PRODUCTID_LIMIT_START_COUNT, params,
				rowMapper);
		reservationComments = reservationComments.stream().map(reservationComment -> {
			reservationComment.setReservationCommentImages(
					reservationCommentImageDao.selectByReservationCommentId(reservationComment.getId()));
			return reservationComment;
		}).collect(Collectors.toList());
		return reservationComments;
	}

	public Integer insertReservationComment(int productId, int reservationInfoId, int score, String comment) {
		final KeyHolder holder = new GeneratedKeyHolder();
		MapSqlParameterSource parameters = new MapSqlParameterSource();
		parameters.addValue("productId", productId);
		parameters.addValue("reservationInfoId", reservationInfoId);
		parameters.addValue("score", score);
		parameters.addValue("comment", comment);
		jdbc.update(INSERT_RESERVATION_INFO_COMMENT, parameters, holder, new String[] { "GENERATED_ID" });

		Number generatedId = holder.getKey();

		return generatedId.intValue();

	}

}
