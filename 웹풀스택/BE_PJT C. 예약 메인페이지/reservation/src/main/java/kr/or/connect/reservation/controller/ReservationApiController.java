package kr.or.connect.reservation.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import kr.or.connect.reservation.service.CategoriesService;
import kr.or.connect.reservation.service.CommentsService;
import kr.or.connect.reservation.service.DisplayinfosService;
import kr.or.connect.reservation.service.PromotionsService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ReservationApiController {
	private final CategoriesService categoriesService;
	private final DisplayinfosService displayinfosService;
	private final PromotionsService promotionService;
	private final CommentsService commentsService;

	@GetMapping("/categories")
	@ApiOperation(value = "카테고리 목록", notes = "카테고리 목록 구하기")
	public Map<String, Object> categories() {
		return categoriesService.getCategories();
	}

	@GetMapping("/displayinfos")
	@ApiOperation(value = "상품 목록", notes = "상품 목록 구하기")
	public Map<String, Object> displayinfos(
			@ApiParam(value = "카테고리 아이디") @RequestParam(required = false) Integer categoryId,
			@ApiParam(value = "시작지점") @RequestParam(required = false) Integer start) {
		return displayinfosService.getDisplayinfos(categoryId, start);
	}

	@GetMapping("/promotions")
	@ApiOperation(value = "프로모션 목록", notes = "프로모션 목록 구하기")
	public Map<String, Object> promotions() {
		return promotionService.getPromotions();
	}

	@GetMapping("/displayinfos/{displayId}")
	@ApiOperation(value = "카테고리 전시 정보", notes = "카테고리 전시 정보 구하기")
	public Map<String, Object> displayinfosDisplayId(@PathVariable Integer displayId) {
		return displayinfosService.getDisplayinfosById(displayId);
	}

	@GetMapping("/comments")
	@ApiOperation(value = "댓글 목록", notes = "댓글 목록 구하기")
	public Map<String, Object> comments(@ApiParam(value = "프로덕트 아이디") @RequestParam(required = false) Integer productId,
			@ApiParam(value = "시작지점") @RequestParam(required = false) Integer start) {
		return commentsService.getComments(productId, start);
	}

}
