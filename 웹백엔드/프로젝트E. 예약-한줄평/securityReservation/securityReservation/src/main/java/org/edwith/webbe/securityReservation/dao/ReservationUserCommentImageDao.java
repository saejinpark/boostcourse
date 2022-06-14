package org.edwith.webbe.securityReservation.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import org.edwith.webbe.securityReservation.dto.ReservationUserCommentImage;

import static org.edwith.webbe.securityReservation.dao.ReservationUserCommentImageDaoSqls.*;

@Repository
public class ReservationUserCommentImageDao {
    private NamedParameterJdbcTemplate jdbc;
    private RowMapper<ReservationUserCommentImage> rowMapper = BeanPropertyRowMapper.newInstance(ReservationUserCommentImage.class);

    public ReservationUserCommentImageDao(DataSource dataSource) {
        this.jdbc = new NamedParameterJdbcTemplate(dataSource);
    }
    
    public List<ReservationUserCommentImage> selectByReservationUserCommentId(Integer reservationUserCommentId) {
    	Map<String, Integer> params = new HashMap<>();
    	params.put("reservationUserCommentId", reservationUserCommentId);
    	return jdbc.query(SELECT_BY_RESERVATION_USER_COMMENT_ID, params, rowMapper);
    }
    
    public void insertReservationUserCommentImage(
		Integer reservationInfoId,
		Integer reservationUserCommentId,
		Integer fileId
		) {
    	Map<String, Integer> params = new HashMap<>();
    	params.put("reservationInfoId", reservationInfoId);
    	params.put("reservationUserCommentId", reservationUserCommentId);
    	params.put("fileId", fileId);
    	jdbc.update(INSERT_RESERVATION_USER_COMMENT_IMAGE, params);
    }
    
}
