package kr.or.connect.reservation.dao;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import kr.or.connect.reservation.dto.Category;
import static kr.or.connect.reservation.dao.CategoryDaoSqls.*;

@Repository
public class CategoryDao {
	private NamedParameterJdbcTemplate jdbc;
    private RowMapper<Category> rowMapper = BeanPropertyRowMapper.newInstance(Category.class);

    public CategoryDao(DataSource dataSource) {
        this.jdbc = new NamedParameterJdbcTemplate(dataSource);
    }
    
    public List<Category> selectAll() {
    		Map<String, Integer> params = new HashMap<>();
        return jdbc.query(CATEGORY__SELECT_ALL, params, rowMapper);
    }
    
    public int selrctCount() {
        return jdbc.queryForObject(CATEGORY__SELECT_COUNT, Collections.emptyMap(), Integer.class);
    }
}
