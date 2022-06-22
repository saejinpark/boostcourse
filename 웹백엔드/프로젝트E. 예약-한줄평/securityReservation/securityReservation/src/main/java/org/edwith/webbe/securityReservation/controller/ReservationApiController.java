package org.edwith.webbe.securityReservation.controller;


import java.security.Principal;
import java.sql.SQLDataException;
import java.text.ParseException;
import java.util.HashMap;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.ApiOperation;

import org.edwith.webbe.securityReservation.dto.RegisteredReservationInfo;
import org.edwith.webbe.securityReservation.dto.User;
import org.edwith.webbe.securityReservation.service.ReservationInfosService;
import org.edwith.webbe.securityReservation.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ReservationApiController {
    private final ReservationInfosService reservationInfosService;
    private final UserService userService;
    
    @GetMapping("/reservationInfos")
    @ApiOperation(value = "예약 정보", notes = "예약 정보 구하기")
    public HashMap<String, Object> reservationInfos(Principal principal){
    	
        String loginId = principal.getName();
        User user = userService.getUserByEmail(loginId);
        
        return reservationInfosService.getReservationInfos(user.getId().intValue());
    }
    
    @PostMapping("/reservationInfos")
    @ApiOperation(value = "예약", notes = "예약하기")
    public RegisteredReservationInfo reservation(@RequestBody HashMap<String, Object> reservationInfo) throws ParseException {
        return reservationInfosService.reservation(reservationInfo);
    }

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
