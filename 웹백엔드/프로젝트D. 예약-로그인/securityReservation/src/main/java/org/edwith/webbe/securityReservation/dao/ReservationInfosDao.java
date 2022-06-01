package org.edwith.webbe.securityReservation.dao;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import static org.edwith.webbe.securityReservation.dao.ReservationInfosDaoSqls.*;

import org.edwith.webbe.securityReservation.dto.ReservationInfo;

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
    
    public List<ReservationInfo> selectByUserId(Integer userId) {
    	Map<String, Integer> params = new HashMap<>();
    	params.put("userId", userId);
    	return jdbc.query(SELECT_BY_USER_ID, params, rowMapper);
    }
    
    public Integer insertReservationInfo(
    		Integer productId, Integer displayInfoId, Integer userId, 
    		Date reservationDate, Date createDate, Date modifyDate) {
    	
    	final KeyHolder holder = new GeneratedKeyHolder();
    	
    	MapSqlParameterSource parameters = new MapSqlParameterSource();
    	
    	parameters.addValue("productId", productId);
    	parameters.addValue("displayInfoId", displayInfoId);
    	parameters.addValue("userId", userId);
    	parameters.addValue("reservationDate", reservationDate);
    	parameters.addValue("cancelFlag", 0);
    	parameters.addValue("createDate", createDate);
    	parameters.addValue("modifyDate", modifyDate);
    	
    	jdbc.update(INSERT_RESERVATION_INFO, parameters, holder, new String[] {"GENERATED_ID" } );
    	
    	Number generatedId = holder.getKey();
    	
    	return generatedId.intValue();
	}
    

    
    public Integer insertReservationInfoPrice(
    		Integer reservationInfoId, Integer productPriceId, Integer count
    		) {
    	
    	final KeyHolder holder = new GeneratedKeyHolder();
    	
    	MapSqlParameterSource parameters = new MapSqlParameterSource();
    	
    	parameters.addValue("reservationInfoId", reservationInfoId);
    	parameters.addValue("productPriceId", productPriceId);
    	parameters.addValue("count", count);
    	
    	jdbc.update(INSERT_RESERVATION_INFO_PRICE, parameters, holder, new String[] {"GENERATED_ID" } );
    	
    	Number generatedId = holder.getKey();
    	
    	return generatedId.intValue();
	}
    
    public void cancel(Integer id) {
    	Map<String, Integer> params = new HashMap<>();
    	params.put("id", id);
    	jdbc.update(UPDATE_CANCEL_FLAG, params);
    }

}
