package org.edwith.webbe.securityReservation.controller;

import org.edwith.webbe.securityReservation.dto.User;
import org.edwith.webbe.securityReservation.service.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

import java.security.Principal;

@Controller
@RequestMapping(path = "/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    
    @GetMapping("/loginform")
    public String loginform(){
        return "user/loginform";
    }

    @GetMapping("/joinform")
    public String joinform(){
        return "user/joinform";
    }

    @PostMapping("/join")
    public String join(@ModelAttribute User user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userService.addUser(user, false);
        return "redirect:/user/welcome";
    }
    
    @PostMapping("/loginerror")
    @ApiOperation(value = "로그인 실패", notes = "로그인 실패 페이지")
    public String loginerror(@RequestParam("login_error")String loginError){
        return "user/loginerror";
    }

    @GetMapping("/welcome")
    public String welcome(){
        return "user/welcome";
    }

    @GetMapping("/memberinfo")
    public String memberInfo(Principal principal, ModelMap modelMap){
        String userId = principal.getName();
        User user = userService.getUserByEmail(userId);
        modelMap.addAttribute("user", user);

        return "user/memberinfo";
    }
}