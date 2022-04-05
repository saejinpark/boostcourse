package kr.or.connect.reservation.dao;



import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import kr.or.connect.reservation.dto.ReservationUserCommentImage;
import static kr.or.connect.reservation.dao.ReservationUserCommentImageDaoSqls.*;


@Repository
public class ReservationUserCommentImageDao {
	private NamedParameterJdbcTemplate jdbc;
	private RowMapper<ReservationUserCommentImage> rowMapper = BeanPropertyRowMapper.newInstance(ReservationUserCommentImage.class);

	public ReservationUserCommentImageDao(DataSource dataSource) {
		this.jdbc = new NamedParameterJdbcTemplate(dataSource);
	}

	public List<ReservationUserCommentImage> selectByReservationUserCommentId(Integer reservationUserCommentId) {
		Map<String, Integer> params = new HashMap<String, Integer>();
		params.put("reservationUserCommentId", reservationUserCommentId);
		return jdbc.query(RESERVATION_USER_COMMENT_IMAGE__SELECT_BY__RESERVATION_USER_COMMENT_ID, params, rowMapper);
	}
}
