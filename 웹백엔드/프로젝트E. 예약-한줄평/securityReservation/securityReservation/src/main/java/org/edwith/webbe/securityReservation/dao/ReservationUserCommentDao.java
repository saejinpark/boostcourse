package org.edwith.webbe.securityReservation.dao;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import org.edwith.webbe.securityReservation.dto.ReservationUserComment;
import static org.edwith.webbe.securityReservation.dao.ReservationUserCommentDaoSqls.*;

@Repository
public class ReservationUserCommentDao {
    private NamedParameterJdbcTemplate jdbc;
    private RowMapper<ReservationUserComment> rowMapper = BeanPropertyRowMapper.newInstance(ReservationUserComment.class);

    public ReservationUserCommentDao(DataSource dataSource) {
        this.jdbc = new NamedParameterJdbcTemplate(dataSource);
    }
    
    @Autowired
    ReservationUserCommentImageDao reservationUserCommentImageDao;
    
    public Integer selectAvgScoreByProductId(int productId) {
    	Map<String, Integer> params = new HashMap<>();
    	params.put("productId", productId);
    	return jdbc.queryForObject(SELECT_AVG_SCORE_BY_PRODUCTID, params, Integer.class);
    }
    

    public int selectCountAll() {
    	return jdbc.queryForObject(SELECT_COUNT_ALL, Collections.emptyMap(), int.class);
    }

    public int selectCountProductId(Integer productId) {
    	Map<String, Integer> params = new HashMap<>();
    	params.put("productId", productId);
    	return jdbc.queryForObject(SELECT_COUNT_BY_PRODUCTID, params, int.class);
    }


    public List<ReservationUserComment> getComments(Integer start, Integer count) {
    	Map<String,Integer> params = new HashMap<String, Integer>();
    	params.put("start", start);
    	params.put("count", count);
    	List<ReservationUserComment> reservationUserComments = jdbc.query(SELECT_ALL_LIMIT_START_COUNT, params, rowMapper);
    	reservationUserComments = reservationUserComments.stream().map(reservationUserComment -> {
    		reservationUserComment
    		.setReservationUserCommentImages(
				reservationUserCommentImageDao
				.selectByReservationUserCommentId(reservationUserComment.getId())
			);
			return reservationUserComment;
    	}).collect(Collectors.toList());
    	return reservationUserComments;
    }
    
    public List<ReservationUserComment> getComments(Integer productId, Integer start, Integer count) {
    	Map<String,Integer> params = new HashMap<String, Integer>();
    	params.put("productId", productId);
    	params.put("start", start);
    	params.put("count", count);
    	List<ReservationUserComment> reservationUserComments = jdbc.query(SELECT_BY_PRODUCTID_LIMIT_START_COUNT, params, rowMapper);
    	reservationUserComments = reservationUserComments.stream().map(reservationUserComment -> {
    		reservationUserComment
    		.setReservationUserCommentImages(
				reservationUserCommentImageDao
				.selectByReservationUserCommentId(productId)
			);
			return reservationUserComment;
    	}).collect(Collectors.toList());
    	return reservationUserComments;
    }
    
    public Integer insertReservationUserComment(
    		int productId, int reservationInfoId, int score, Long userId, String comment
    	) {
    	final KeyHolder holder = new GeneratedKeyHolder();
    	MapSqlParameterSource parameters = new MapSqlParameterSource();
    	parameters.addValue("productId", productId);
    	parameters.addValue("reservationInfoId", reservationInfoId);
    	parameters.addValue("userId", userId);
    	parameters.addValue("score", score);
    	parameters.addValue("comment", comment);
    	jdbc.update(INSERT_RESERVATION_INFO_COMMENT, parameters, holder, new String[] {"GENERATED_ID" } );
    	
    	Number generatedId = holder.getKey();
    	
    	return generatedId.intValue();
    	
    }
}
