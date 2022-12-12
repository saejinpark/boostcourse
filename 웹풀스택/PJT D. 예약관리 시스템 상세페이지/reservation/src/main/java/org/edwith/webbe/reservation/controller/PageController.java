package org.edwith.webbe.reservation.controller;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.edwith.webbe.reservation.argumentresolver.HeaderInfo;
import org.edwith.webbe.reservation.service.CategoriesService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("/")
@RequiredArgsConstructor
public class PageController {
	private Logger logger = LoggerFactory.getLogger(this.getClass());
	private final CategoriesService categoriesService;

	@GetMapping("")
	public String main(Model model, HeaderInfo headerInfo) {
		logger.info("메인 페이지 호출");
		model.addAttribute("categories", categoriesService.getCategories());
		return "main";
	}

	@GetMapping("bookinglogin")
	public String bookinglogin() {
		return "bookinglogin";
	}

	@PostMapping("bookinglogin")
	public String bookinglogin(HttpServletRequest request) {
		String email = request.getParameter("resrv_email");
		String regex = "^[_a-z0-9-]+(.[_a-z0-9-]+)*@(?:\\w+\\.)+\\w+$";
		Pattern p = Pattern.compile(regex);
		Matcher m = p.matcher(email);
		if (m.matches()) {
			HttpSession session = request.getSession();
			session.setAttribute("email", email);
		}
		return "redirect:/";
	}

	@GetMapping("detail")
	public String detail() {
		return "detail";
	}

	@GetMapping("review")
	public String review() {
		return "review";
	}

	@GetMapping("swagger")
	@ApiOperation(value = "swagger", notes = "swagger 페이지")
	public String swagger() {
		return "swagger";
	}
}