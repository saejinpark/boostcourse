package org.edwith.webbe.securityReservation.controller;

import java.security.Principal;
import java.sql.SQLDataException;
import java.text.ParseException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

import org.edwith.webbe.securityReservation.dto.RegisteredReservationInfo;
import org.edwith.webbe.securityReservation.dto.User;
import org.edwith.webbe.securityReservation.service.CategoriesService;
import org.edwith.webbe.securityReservation.service.CommentsService;
import org.edwith.webbe.securityReservation.service.DisplayinfosService;
import org.edwith.webbe.securityReservation.service.PromotionsService;
import org.edwith.webbe.securityReservation.service.ReservationInfosService;
import org.edwith.webbe.securityReservation.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ReservationApiController {
	private final CategoriesService categoriesService;
	private final DisplayinfosService displayinfosService;
	private final PromotionsService promotionService;
	private final CommentsService commentsService;
	private final ReservationInfosService reservationInfosService;
	private final UserService userService;
	
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
	

    @GetMapping("/reservationInfos")
	@ApiOperation(value = "예약 정보", notes = "예약 정보 구하기")
    public HashMap<String, Object> reservationInfos(Principal principal){
        String loginId = principal.getName();
        User user = userService.getUserByEmail(loginId);
        return reservationInfosService.getReservationInfos(user.getId().intValue());
    }
    
    @ResponseBody
    @PostMapping("/reservationInfos")
	@ApiOperation(value = "예약", notes = "예약하기")
    public RegisteredReservationInfo reservation(@RequestBody HashMap<String, Object> reservationInfo) throws ParseException {
    	
    	return reservationInfosService.reservation(reservationInfo);
    }

    @ResponseBody
    @PutMapping("/reservationInfos")
	@ApiOperation(value = "예약취소", notes = "예약 취소하기")
    public HashMap<String, String> cancelReservation(@RequestBody HashMap<String, Object> cancelReservationId) {
    	HashMap<String, String> result = new HashMap<>();
    	try {
			reservationInfosService.cancelReservation((Integer) cancelReservationId.get("id"));
			result.put("result", "success");
		} catch (SQLDataException e) {
			result.put("result", "fail");
		}
		return result;
    }

}
