package org.edwith.webbe.reservation.controller;

import java.text.ParseException;
import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.ApiOperation;

import org.edwith.webbe.reservation.dto.RegisteredReservationInfo;
import org.edwith.webbe.reservation.service.ReservationInfosService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ReservationApiController {
	private final ReservationInfosService reservationInfosService;
//    private final UserService userService;

	@GetMapping("/reservationInfos")
	@ApiOperation(value = "예약 정보", notes = "예약 정보 구하기")
	public HashMap<String, Object> reservationInfos(HttpServletRequest request) {

		HttpSession session = request.getSession(false);
		String email = (String) session.getAttribute("email");

		return reservationInfosService.getReservationInfos(email);
	}

	@PostMapping("/reservationInfos")
	@ApiOperation(value = "예약", notes = "예약하기")
	public RegisteredReservationInfo reservation(@RequestBody HashMap<String, Object> reservationInfo)
			throws ParseException {
		return reservationInfosService.reservation(reservationInfo);
	}

}
