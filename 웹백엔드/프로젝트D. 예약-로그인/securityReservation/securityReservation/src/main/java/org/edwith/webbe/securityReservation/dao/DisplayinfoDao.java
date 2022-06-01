package org.edwith.webbe.securityReservation.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import org.edwith.webbe.securityReservation.dto.Displayinfo;

import static org.edwith.webbe.securityReservation.dao.DisplayinfoDaoSqls.*;

@Repository
public class DisplayinfoDao {
    private NamedParameterJdbcTemplate jdbc;
    private RowMapper<Displayinfo> rowMapper = BeanPropertyRowMapper.newInstance(Displayinfo.class);

    public DisplayinfoDao(DataSource dataSource) {
        this.jdbc = new NamedParameterJdbcTemplate(dataSource);
    }
    
    public List<Displayinfo> getDisplayinfos(Integer start, Integer productCount) {
    	Map<String, Integer> params = new HashMap<>();
    	params.put("start", start);
    	params.put("productCount", productCount);
    	return jdbc.query(SELECT_ALL_LIMIT, params, rowMapper);
    }
    
    public List<Displayinfo> getDisplayinfos(Integer categoryId, Integer start, Integer productCount) {
    	Map<String, Integer> params = new HashMap<>();
    	params.put("categoryId", categoryId);
    	params.put("start", start);
    	params.put("productCount", productCount);
    	return jdbc.query(SELECT_BY_CATEGORYID_LIMIT, params, rowMapper);
    }

    public Displayinfo getDisplayinfos(Integer id) {
    	Map<String, Integer> params = new HashMap<>();
    	params.put("id", id);
    	return jdbc.queryForObject(SELECT_BY_ID, params, rowMapper);
    }

}
