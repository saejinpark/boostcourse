package org.edwith.webbe.reservation.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import org.edwith.webbe.reservation.dto.ReservationCommentImage;

import static org.edwith.webbe.reservation.dao.ReservationCommentImageDaoSqls.*;

@Repository
public class ReservationCommentImageDao {
	private NamedParameterJdbcTemplate jdbc;
	private RowMapper<ReservationCommentImage> rowMapper = BeanPropertyRowMapper
			.newInstance(ReservationCommentImage.class);

	public ReservationCommentImageDao(DataSource dataSource) {
		this.jdbc = new NamedParameterJdbcTemplate(dataSource);
	}

	public List<ReservationCommentImage> selectByReservationCommentId(Integer reservationCommentId) {
		Map<String, Integer> params = new HashMap<>();
		params.put("reservationUserCommentId", reservationCommentId);
		return jdbc.query(SELECT_BY_RESERVATION_COMMENT_ID, params, rowMapper);
	}

	public void insertReservationCommentImage(Integer reservationInfoId, Integer reservationUserCommentId,
			Integer fileId) {
		Map<String, Integer> params = new HashMap<>();
		params.put("reservationInfoId", reservationInfoId);
		params.put("reservationUserCommentId", reservationUserCommentId);
		params.put("fileId", fileId);
		jdbc.update(INSERT_RESERVATION_COMMENT_IMAGE, params);
	}

}
