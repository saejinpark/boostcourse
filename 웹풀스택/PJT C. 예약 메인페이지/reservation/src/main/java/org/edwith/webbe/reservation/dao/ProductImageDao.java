package org.edwith.webbe.reservation.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import org.edwith.webbe.reservation.dto.ProductImage;

import static org.edwith.webbe.reservation.dao.ProductImageDaoSqls.*;

@Repository
public class ProductImageDao {
	private NamedParameterJdbcTemplate jdbc;
	private RowMapper<ProductImage> rowMapper = BeanPropertyRowMapper.newInstance(ProductImage.class);

	public ProductImage selectById(Integer id) {
		Map<String, Integer> params = new HashMap<>();
		params.put("id", id);
		return jdbc.queryForObject(SELECT_BY_ID, params, rowMapper);
	}

	public ProductImageDao(DataSource dataSource) {
		this.jdbc = new NamedParameterJdbcTemplate(dataSource);
	}

	public List<ProductImage> selectByProductId(Integer productId) {
		Map<String, Integer> params = new HashMap<>();
		params.put("productId", productId);
		return jdbc.query(SELECT_BY_PRODUCTID, params, rowMapper);
	}
	
	public List<ProductImage> selectByProductIdByType(Integer productId, String type) {
		Map<String, Object> params = new HashMap<>();
		params.put("productId", productId);
		params.put("type", type);
		return jdbc.query(SELECT_BY_PRODUCTID_BY_TYPE, params, rowMapper);
	}
}
