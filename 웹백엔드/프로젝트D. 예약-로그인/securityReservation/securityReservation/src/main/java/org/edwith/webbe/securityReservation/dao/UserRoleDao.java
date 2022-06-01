package org.edwith.webbe.securityReservation.dao;

import org.edwith.webbe.securityReservation.dto.UserRole;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import static org.edwith.webbe.securityReservation.dao.UserRoleDaoSqls.*;

import javax.sql.DataSource;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Repository
public class UserRoleDao {
	private NamedParameterJdbcTemplate jdbc;
	
	private RowMapper<UserRole> rowMapper = BeanPropertyRowMapper.newInstance(UserRole.class);

	public UserRoleDao(DataSource dataSource){
		this.jdbc = new NamedParameterJdbcTemplate(dataSource);
	}

	public List<UserRole> getRolesByEmail(String email){
		Map<String, Object> map = new HashMap<>();
		map.put("email", email);

		return jdbc.query(SELECT_BY_EMAIL, map, rowMapper);
	}

	public void addAdminRole(Long userId) {
		Map<String, Object> params = Collections.singletonMap("userId", userId);
		jdbc.update(INSERT_ADMIN_ROLE, params);
	}

	public void addUserRole(Long userId) {
		Map<String, Object> params = Collections.singletonMap("userId", userId);
		jdbc.update(INSERT_USER_ROLE, params);
	}
}