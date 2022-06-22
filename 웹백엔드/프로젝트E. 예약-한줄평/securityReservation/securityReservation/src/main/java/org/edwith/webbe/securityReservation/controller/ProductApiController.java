package org.edwith.webbe.securityReservation.controller;

import java.util.Map;

import org.edwith.webbe.securityReservation.service.DisplayinfosService;
import org.edwith.webbe.securityReservation.service.PromotionsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ProductApiController {
    private final DisplayinfosService displayinfosService;
    private final PromotionsService promotionService;

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
}
