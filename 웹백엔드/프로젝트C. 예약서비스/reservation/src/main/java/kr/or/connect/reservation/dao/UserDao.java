package kr.or.connect.reservation.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import kr.or.connect.reservation.dto.User;
import static kr.or.connect.reservation.dao.UserDaoSqls.*;

@Repository
public class UserDao {
	 private NamedParameterJdbcTemplate jdbc;
	    private RowMapper<User> rowMapper = BeanPropertyRowMapper.newInstance(User.class);

	    public UserDao(DataSource dataSource) {
	        this.jdbc = new NamedParameterJdbcTemplate(dataSource);
	    }
	    
	    public List<User> selectAll() {
	    		Map<String, Integer> params = new HashMap<>();
	        return jdbc.query(USER__SELECT_ALL, params, rowMapper);
	    }
}
