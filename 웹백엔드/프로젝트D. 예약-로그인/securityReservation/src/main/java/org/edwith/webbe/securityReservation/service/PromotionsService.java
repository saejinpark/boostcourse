package org.edwith.webbe.securityReservation.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import org.edwith.webbe.securityReservation.dao.PromotionDao;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PromotionsService {

	private final PromotionDao promotionDao;
	
	public Map<String, Object> getPromotions() {
		
		Map<String, Object> promotions = new HashMap<String, Object>();
		promotions.put("size", promotionDao.selectCount());
		promotions.put("items", promotionDao.getPromotions());
		return promotions;
	}
}
