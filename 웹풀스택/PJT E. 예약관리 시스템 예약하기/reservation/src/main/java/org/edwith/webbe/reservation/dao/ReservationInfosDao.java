package org.edwith.webbe.reservation.dao;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.sql.DataSource;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import static org.edwith.webbe.reservation.dao.ReservationInfosDaoSqls.*;

import org.edwith.webbe.reservation.dto.ReservationInfo;

@Repository
public class ReservationInfosDao {
	private NamedParameterJdbcTemplate jdbc;
	private RowMapper<ReservationInfo> rowMapper = BeanPropertyRowMapper.newInstance(ReservationInfo.class);

	public ReservationInfosDao(DataSource dataSource) {
		this.jdbc = new NamedParameterJdbcTemplate(dataSource);
	}

	public ReservationInfo selectById(Integer id) {
		Map<String, Integer> params = new HashMap<>();
		params.put("id", id);
		return jdbc.queryForObject(SELECT_BY_ID, params, rowMapper);
	}

	public List<ReservationInfo> selectByEmail(String email) {
		Map<String, String> params = new HashMap<>();
		params.put("email", email);
		return jdbc.query(SELECT_BY_RESERVATION_EMAIL, params, rowMapper);
	}

	public Integer insertReservationInfo(ReservationInfo reservationInfo, Date reservationDate) {

		final KeyHolder holder = new GeneratedKeyHolder();
		
		MapSqlParameterSource parameters = new MapSqlParameterSource();
		
		parameters.addValue("productId", reservationInfo.getProductId());
		parameters.addValue("displayInfoId", reservationInfo.getDisplayInfoId());
		parameters.addValue("reservationName", reservationInfo.getReservationName());
		parameters.addValue("reservationTel", reservationInfo.getReservationName());
		parameters.addValue("reservationEmail", reservationInfo.getReservationEmail());
		parameters.addValue("reservationDate", reservationDate);

		jdbc.update(INSERT_RESERVATION_INFO, parameters, holder, new String[] { "GENERATED_ID" });

		Number generatedId = holder.getKey();

		return generatedId.intValue();
	}
	
	public void cancel(Integer id) {
		Map<String, Integer> params = new HashMap<>();
		params.put("id", id);
		jdbc.update(CANCEL, params);
	}

}
