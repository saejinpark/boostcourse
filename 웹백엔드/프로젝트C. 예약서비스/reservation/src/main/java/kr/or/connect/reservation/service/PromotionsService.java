package kr.or.connect.reservation.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.connect.reservation.dao.CategoryDao;
import kr.or.connect.reservation.dao.ProductDao;
import kr.or.connect.reservation.dao.ProductImageDao;
import kr.or.connect.reservation.dao.PromotionDao;
import kr.or.connect.reservation.dto.Product;
import kr.or.connect.reservation.dto.Promotion;

@Service
public class PromotionsService {

	@Autowired
	CategoryDao categoryDao;
	
	@Autowired
	ProductDao productDao;
	
	@Autowired
	PromotionDao promotionDao;

	@Autowired
	ProductImageDao productImageDao;
	
	public Map<String, Object> getPromotions(){
		Map<String, Object> ApiPromotions = new HashMap<String, Object>();
		List<Promotion> promotions = promotionDao.selectAll();
		ApiPromotions.put("size", promotions.size());
		List<Map<String, Object>> Items = new ArrayList<Map<String, Object>>();
		for(Promotion promotion : promotions) {
			Map<String, Object> Item = new HashMap<String, Object>();
			Product product = productDao.selectById(promotion.getProductId());
			Item.put("id", promotion.getId());
			Item.put("productId", promotion.getProductId());
			Item.put("categoryId", product.getCategoryId());
			Item.put("categoryName", categoryDao.selectById(product.getCategoryId()).getName());
			Item.put("description", product.getDescription());
			Item.put("fileId", productImageDao.selectByProductIdTypeMa(product.getId()).getFileId());
			Items.add(Item);
		}
		ApiPromotions.put("items", Items);
		return ApiPromotions;
	}
}
