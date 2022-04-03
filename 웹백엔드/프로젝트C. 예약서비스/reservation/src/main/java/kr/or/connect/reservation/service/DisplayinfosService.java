package kr.or.connect.reservation.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import kr.or.connect.reservation.dao.CategoryDao;
import kr.or.connect.reservation.dao.DisplayInfoDao;
import kr.or.connect.reservation.dao.ProductDao;
import kr.or.connect.reservation.dao.ProductImageDao;
import kr.or.connect.reservation.dto.DisplayInfo;
import kr.or.connect.reservation.dto.Product;
import kr.or.connect.reservation.dto.ProductImage;

@Service
public class DisplayinfosService {

	@Autowired
	CategoryDao categoryDao;

	@Autowired
	ProductDao productDao;

	@Autowired
	DisplayInfoDao displayInfoDao;

	@Autowired
	ProductImageDao productImageDao;
	
	String pattern = "yyyy-MM-dd HH:mm:ss.S";
	SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);

	public Map<String, Object> getDisplayinfos(Integer categoryId, Integer start) {
		Map<String, Object> displayinfos = new HashMap<>();
		Integer productCount = 4;
		if (start == null)
			start = 0;

		List<Product> products;
		if (categoryId == null) {
			products = productDao.selectLimitStart(start, productCount);
		} else {
			products = productDao.selectByCategoryIdLimitStart(categoryId, start, productCount);
		}
		displayinfos.put("totalCount ", productDao.countCategoryId(categoryId));
		displayinfos.put("productCount ", productCount);
		List<Map<String, Object>> displayinfoProducts = new ArrayList<Map<String, Object>>();
		for (Product product : products) {
			Map<String, Object> displayinfoProduct = new HashMap<String, Object>();
			DisplayInfo displayInfo = displayInfoDao.selectByProductId(product.getId());
			displayinfoProduct.put("id", product.getId());
			displayinfoProduct.put("categoryId", product.getCategory_id());
			displayinfoProduct.put("displayInfoId", displayInfo.getId());
			displayinfoProduct.put("name", categoryDao.selectById(categoryId).getName());
			displayinfoProduct.put("description", product.getDescription());
			displayinfoProduct.put("content", product.getContent());
			displayinfoProduct.put("event", product.getEvent());
			displayinfoProduct.put("openingHours", displayInfo.getOpening_hours());
			displayinfoProduct.put("placeName", displayInfo.getPlace_name());
			displayinfoProduct.put("placeLot", displayInfo.getPlace_lot());
			displayinfoProduct.put("placeStreet", displayInfo.getPlace_street());
			displayinfoProduct.put("tel", displayInfo.getTel());
			displayinfoProduct.put("homepage", displayInfo.getHomepage());
			displayinfoProduct.put("email", displayInfo.getEmail());
			displayinfoProduct.put("createDate", simpleDateFormat.format(product.getCreate_date()));
			displayinfoProduct.put("modifyDate", simpleDateFormat.format(product.getModify_date()));
			List<Integer> fileIds = new ArrayList<Integer>();
			for(ProductImage fileId : productImageDao.selectByProductId(product.getId())) {
				fileIds.add(fileId.getFile_id());
			}
			displayinfoProduct.put("fileId", fileIds);
			displayinfoProducts.add(displayinfoProduct);
		}
		displayinfos.put("products ", displayinfoProducts);
		return displayinfos;
	}
}
