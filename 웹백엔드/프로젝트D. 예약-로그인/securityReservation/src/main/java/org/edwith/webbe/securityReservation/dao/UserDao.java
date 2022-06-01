package org.edwith.webbe.securityReservation.dao;


import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import org.edwith.webbe.securityReservation.dto.User;
import static org.edwith.webbe.securityReservation.dao.UserDaoSqls.*;

import javax.sql.DataSource;
import java.util.HashMap;
import java.util.Map;

@Repository
public class UserDao {
	private NamedParameterJdbcTemplate jdbc;
	
	private RowMapper<User> rowMapper = BeanPropertyRowMapper.newInstance(User.class);

	public UserDao(DataSource dataSource){
		this.jdbc = new NamedParameterJdbcTemplate(dataSource);
	}

	public User getUserByEmail(String email){
		Map<String, Object> map = new HashMap<>();
		map.put("email", email);

		return jdbc.queryForObject(SELECT_BY_EMAIL, map, rowMapper);
	}

	public void addUser(User user) {
		Map<String, Object> params = new HashMap<>();
		params.put("name", user.getName());
		params.put("password", user.getPassword());
		params.put("email", user.getEmail());
		params.put("phone", user.getPhone());
		params.put("createDate", user.getCreateDate());
		params.put("modifyDate", user.getModifyDate());
		
		jdbc.update(INSERT_USER, params);
		
	}
}