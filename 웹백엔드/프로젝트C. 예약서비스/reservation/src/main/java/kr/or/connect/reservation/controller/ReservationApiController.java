package kr.or.connect.reservation.controller;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.or.connect.reservation.dao.CategoryDao;
import kr.or.connect.reservation.dao.ProductDao;

@RestController
@RequestMapping("/api")
public class ReservationApiController {

	private CategoryDao categoryDao;
	private ProductDao productDao;
	
	@GetMapping("/categories")
	public Map<String, Object> categories(){
		Map<String, Object> categories = new HashMap<>();
		categories.put("count", categoryDao.selrctCount());
		return categories;
	}
}
