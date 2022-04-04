package kr.or.connect.reservation.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Locale.Category;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.connect.reservation.dao.CategoryDao;
import kr.or.connect.reservation.dao.DisplayInfoDao;
import kr.or.connect.reservation.dao.ProductDao;
import kr.or.connect.reservation.dao.ProductImageDao;
import kr.or.connect.reservation.dto.DisplayInfo;
import kr.or.connect.reservation.dto.Product;
import kr.or.connect.reservation.dto.ProductImage;

@Service
public class DisplayinfosDisplayIdService {

	@Autowired
	CategoryDao categoryDao;

	@Autowired
	ProductDao productDao;

	@Autowired
	DisplayInfoDao displayInfoDao;

	@Autowired
	ProductImageDao productImageDao;

	public Map<String, Object> getDisplayinfosDisplayId(Integer displayId) {
		Map<String, Object> displayinfosDisplayId = new HashMap<String, Object>();
		Map<String, Object> ApiProduct = new HashMap<String, Object>();
		Product product = productDao.selectByProductId(displayId);
		DisplayInfo displayInfo = displayInfoDao.selectByProductId(product.getId());
		ProductImage productImage = productImageDao.selectByProductIdTypeMa(product.getId());
		kr.or.connect.reservation.dto.Category category = categoryDao.selectById(product.getCategory_id());

		ApiProduct.put("id", product.getId());
		ApiProduct.put("categoryId", product.getCategory_id());
		ApiProduct.put("displayInfoId", displayInfo.getId());
		ApiProduct.put("name", category.getName());
		ApiProduct.put("description", product.getDescription());
		ApiProduct.put("content", product.getContent());
		ApiProduct.put("event", product.getEvent());
		ApiProduct.put("openingHours", displayInfo.getOpening_hours());
		ApiProduct.put("placeName", displayInfo.getPlace_name());
		ApiProduct.put("placeLot", displayInfo.getPlace_lot());
		ApiProduct.put("placeStreet", displayInfo.getPlace_street());
		ApiProduct.put("tel", displayInfo.getTel());
		ApiProduct.put("homepage", displayInfo.getHomepage());
		ApiProduct.put("email", displayInfo.getEmail());
		ApiProduct.put("createDate", displayInfo.getCreate_date());
		ApiProduct.put("modifyDate", displayInfo.getModify_date());
		ApiProduct.put("fileId", productImage.getProduct_id());

		displayinfosDisplayId.put("product", ApiProduct);

		List<Map<String, Object>> ApiProductImages = new ArrayList<Map<String, Object>>();
		Map<String, Object> ApiProductImage = new HashMap<String, Object>();

		ApiProductImage.put("productId", product.getId());
		ApiProductImage.put("productImageId", productImage.getId());
		ApiProductImage.put("type", productImage.getType());
		ApiProductImage.put("fileInfoId", productImage.getFile_id());

		ApiProductImages.add(ApiProductImage);
		displayinfosDisplayId.put("productImages", ApiProductImages);

		return displayinfosDisplayId;
	}
}
