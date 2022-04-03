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

import kr.or.connect.reservation.dto.Product;

import static kr.or.connect.reservation.dao.ProductDaoSqls.*;

@Repository
public class ProductDao {
	private NamedParameterJdbcTemplate jdbc;
	private RowMapper<Product> rowMapper = BeanPropertyRowMapper.newInstance(Product.class);

	public ProductDao(DataSource dataSource) {
		this.jdbc = new NamedParameterJdbcTemplate(dataSource);
	}

	public List<Product> selectAll() {
		Map<String, Integer> params = new HashMap<>();
		return jdbc.query(PRODUCT__SELECT_ALL, params, rowMapper);
	}

	public int countCategoryId(Integer category_id) {
		Map<String, Integer> params = new HashMap<>();
		params.put("category_id", category_id);
		return jdbc.queryForObject(PRODUCT__SELECT_COUNT_BY__CATEGORY_ID, params, Integer.class);
	}

	public List<Product> selectLimitStart(Integer start, Integer productCount) {
		Map<String, Integer> params = new HashMap<>();
		params.put("start", start);
		params.put("productCount", productCount);
		return jdbc.query(PRODUCT__SELECT__LIMIT_START, params, rowMapper);
	}
	public List<Product> selectByCategoryIdLimitStart(Integer category_id, Integer start, Integer productCount) {
		Map<String, Integer> params = new HashMap<>();
		params.put("category_id", category_id);
		params.put("start", start);
		params.put("productCount", productCount);
		return jdbc.query(PRODUCT__SELECT_BY__CATEGORY_ID__LIMIT_START, params, rowMapper);
	}
}
