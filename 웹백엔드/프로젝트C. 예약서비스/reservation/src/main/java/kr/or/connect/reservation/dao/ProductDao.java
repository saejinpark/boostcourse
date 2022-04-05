package kr.or.connect.reservation.dao;

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
	
	public Product selectById(Integer productId) {
		Map<String, Integer> params = new HashMap<>();
		params.put("productId", productId);
		return jdbc.queryForObject(PRODUCT__SELECT_BY__PRODUCT_ID, params, rowMapper);
	}

	public Integer selectCountByCategoryId(Integer categoryId) {
		Map<String, Integer> params = new HashMap<String, Integer>();
		params.put("categoryId", categoryId);
		return jdbc.queryForObject(PRODUCT__SELECT_COUNT_ALL__CATEGORY_ID, params, Integer.class);
	}
	
}
