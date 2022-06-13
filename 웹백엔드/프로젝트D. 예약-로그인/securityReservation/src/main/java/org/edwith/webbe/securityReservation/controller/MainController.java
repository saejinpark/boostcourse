package org.edwith.webbe.securityReservation.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import io.swagger.annotations.ApiOperation;

@Controller
public class MainController {
    @GetMapping("/main")
    @ApiOperation(value = "메인", notes = "메인 페이지")
    @ResponseBody
    public String main(){
        return "main page";
    }
    
    @GetMapping("/swagger")
    @ApiOperation(value = "swagger", notes = "swagger 페이지")
    public String swagger(){
        return "swagger";
    }

    @GetMapping("/securepage")
    @ApiOperation(value = "보안 페이지", notes = "보안 페이지")
    @ResponseBody
    public String securitypage(){
        return "secure page";
    }
}