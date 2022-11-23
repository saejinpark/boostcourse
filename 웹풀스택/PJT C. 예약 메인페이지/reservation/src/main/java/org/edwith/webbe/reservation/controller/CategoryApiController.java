package org.edwith.webbe.reservation.controller;

import java.util.Map;
import org.edwith.webbe.reservation.service.CategoriesService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class CategoryApiController {
    private final CategoriesService categoriesService;
    
    @GetMapping("/categories")
    @ApiOperation(value = "카테고리 목록", notes = "카테고리 목록 구하기")
    public Map<String, Object> categories() {
        return categoriesService.getCategories();
    }

}
