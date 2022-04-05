package kr.or.connect.reservation.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.connect.reservation.dao.CategoryDao;
import kr.or.connect.reservation.dao.ProductDao;

@Service
public class CategoriesService {

	@Autowired
	CategoryDao categoryDao;

	@Autowired
	ProductDao productDao;

	public Map<String, Object> getCategories() {
		Map<String, Object> categories = new HashMap<>();

		categories.put("size", categoryDao.selectCountAll());

		List<Map<String, Object>> items = new ArrayList<Map<String, Object>>();
		for (kr.or.connect.reservation.dto.Category category : categoryDao.selectAll()) {
			Map<String, Object> item = new HashMap<String, Object>();
			item.put("id", category.getId());
			item.put("name", category.getName());
			item.put("count", productDao.selectCountByCategoryId(category.getId()));
			items.add(item);
		}
		categories.put("items", items);
		return categories;
	}
}
