package org.edwith.webbe.securityReservation.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import org.edwith.webbe.securityReservation.dao.CategoryDao;
import org.edwith.webbe.securityReservation.dto.Category;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CategoriesService {
	private final CategoryDao categoryDao;

	public Map<String, Object> getCategories() {
		
		Map<String, Object> categories = new HashMap<>();
		List<Category> items = categoryDao.getCategories();
		
		categories.put("size", items.size());
		categories.put("items", items);
		
		return categories;
	}
}
