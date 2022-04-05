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

import kr.or.connect.reservation.dto.ProductPrice;

import static kr.or.connect.reservation.dao.ProductPriceDaoSqls.*;

@Repository
public class ProductPriceDao {
	private NamedParameterJdbcTemplate jdbc;
	private RowMapper<ProductPrice> rowMapper = BeanPropertyRowMapper.newInstance(ProductPrice.class);

	public ProductPriceDao(DataSource dataSource) {
		this.jdbc = new NamedParameterJdbcTemplate(dataSource);
	}
	
	public List<ProductPrice> selectByProductId(Integer productId) {
		Map<String, Integer> params = new HashMap<String, Integer>();
		params.put("productId", productId);
		return jdbc.query(PRODUCT_PRICE__SELECT_BY__PRODUCT_ID, params, rowMapper);
	}
}
