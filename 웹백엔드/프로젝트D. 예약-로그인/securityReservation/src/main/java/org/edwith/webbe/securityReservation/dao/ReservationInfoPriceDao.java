package org.edwith.webbe.securityReservation.dao;

import static org.edwith.webbe.securityReservation.dao.ReservationInfoPriceDaoSqls.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.edwith.webbe.securityReservation.dto.ReservationInfoPrice;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

@Repository
public class ReservationInfoPriceDao {
	private NamedParameterJdbcTemplate jdbc;
    private RowMapper<ReservationInfoPrice> rowMapper = BeanPropertyRowMapper.newInstance(ReservationInfoPrice.class);

    public ReservationInfoPriceDao(DataSource dataSource) {
        this.jdbc = new NamedParameterJdbcTemplate(dataSource);
    }
    
    public List<ReservationInfoPrice> selectByReservationInfoId(Integer reservationInfoId){
    	Map<String, Integer> params = new HashMap<>();
    	params.put("reservationInfoId", reservationInfoId);
    	return jdbc.query(SELECT_BY_RESERVATION_INFO_ID, params, rowMapper);
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
    
    
}
