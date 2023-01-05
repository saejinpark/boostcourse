package org.edwith.webbe.reservation.controller;

import java.text.ParseException;
import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.ApiOperation;

import org.edwith.webbe.reservation.dto.RegisteredReservationInfo;
import org.edwith.webbe.reservation.service.ReservationInfosService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ReservationApiController {
	private Logger logger = LoggerFactory.getLogger(this.getClass());
	
	private final ReservationInfosService reservationInfosService;

	@GetMapping("/reservations")
	@ApiOperation(value = "예약 정보", notes = "예약 정보 구하기")
	public HashMap<String, Object> reservationInfos(HttpServletRequest request) {

		HttpSession session = request.getSession(false);
		String email = (String) session.getAttribute("email");

		return reservationInfosService.getReservationInfos(email);
	}

	@PostMapping("/reservations")
	@ApiOperation(value = "예약", notes = "예약하기")
	public RegisteredReservationInfo reservation(@RequestBody HashMap<String, Object> reservationInfo) throws ParseException
			{
		return reservationInfosService.reservation(reservationInfo);
	}
	
	@DeleteMapping("/reservation/{id}")
	@ApiOperation(value = "예약취소하기", notes = "예약취소하기")
	public HashMap<String, String> cancel(@PathVariable Integer id) {
		HashMap<String, String> result = new HashMap<>();
		try {
			reservationInfosService.cancel(id);
			result.put("result", "success");
		}catch(Exception e) {
			result.put("result", "fail");
		}
		return result;
	}

}
