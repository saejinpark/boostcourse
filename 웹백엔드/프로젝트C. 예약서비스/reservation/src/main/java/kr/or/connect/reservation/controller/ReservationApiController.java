package kr.or.connect.reservation.controller;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import kr.or.connect.reservation.dao.CategoryDao;
import kr.or.connect.reservation.dao.ProductDao;
import kr.or.connect.reservation.dto.Category;
import kr.or.connect.reservation.service.CategoriesService;
import kr.or.connect.reservation.service.DisplayinfosService;

@RestController
@RequestMapping("/api")
public class ReservationApiController {

	@Autowired
	CategoriesService categoriesService;

	@Autowired
	DisplayinfosService displayinfosService;

	@GetMapping("/categories")
	public Map<String, Object> categories() {
		return categoriesService.getCategories();
	}

	@GetMapping("/displayinfos")
	public Map<String, Object> displayinfos(@RequestParam(value = "categoryId", required = false) Integer categoryId, @RequestParam(value = "start", required = false) Integer start) {
		return displayinfosService.getDisplayinfos(categoryId, start);
	}
}
