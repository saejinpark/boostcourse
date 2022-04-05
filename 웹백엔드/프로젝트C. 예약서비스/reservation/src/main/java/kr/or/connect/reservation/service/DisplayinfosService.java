package kr.or.connect.reservation.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.connect.reservation.dao.CategoryDao;
import kr.or.connect.reservation.dao.DisplayInfoDao;
import kr.or.connect.reservation.dao.ProductDao;
import kr.or.connect.reservation.dao.ProductImageDao;
import kr.or.connect.reservation.dto.DisplayInfo;
import kr.or.connect.reservation.dto.Product;

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
		Map<String, Object> apiDisplayinfos = new HashMap<>();

		int totalcount = 0;
		Integer productCount = 4;

		if (start == null)
			start = 0;

		List<DisplayInfo> displayInfos = displayInfoDao.selectAll();

		if (categoryId != null && categoryId != 0) {
			displayInfos = displayInfos.stream().filter(
					displayInfo -> productDao.selectById(displayInfo.getProductId()).getCategoryId().equals(categoryId))
					.collect(Collectors.toList());
		}
		totalcount = displayInfos.size();
		
		apiDisplayinfos.put("totalCount", totalcount);
		apiDisplayinfos.put("productCount", productCount);

		List<Map<String, Object>> displayinfoProducts = new ArrayList<Map<String, Object>>();
		
		for(int i=start.intValue(); i<totalcount; i++) {
			DisplayInfo displayInfo = displayInfos.get(i);
			Map<String, Object> displayinfoProduct = new HashMap<String, Object>();
			Product product = productDao.selectById(displayInfo.getProductId());
			displayinfoProduct.put("id", product.getId());
			displayinfoProduct.put("categoryId", product.getCategoryId());
			displayinfoProduct.put("displayInfoId", displayInfo.getId());
			displayinfoProduct.put("name", categoryDao.selectById(product.getCategoryId()).getName());
			displayinfoProduct.put("description", product.getDescription());
			displayinfoProduct.put("content", product.getContent());
			displayinfoProduct.put("event", product.getEvent());
			displayinfoProduct.put("openingHours", displayInfo.getOpeningHours());
			displayinfoProduct.put("placeName", displayInfo.getPlaceName());
			displayinfoProduct.put("placeLot", displayInfo.getPlaceLot());
			displayinfoProduct.put("placeStreet", displayInfo.getPlaceStreet());
			displayinfoProduct.put("tel", displayInfo.getTel());
			displayinfoProduct.put("homepage", displayInfo.getHomepage());
			displayinfoProduct.put("email", displayInfo.getEmail());
			displayinfoProduct.put("createDate", simpleDateFormat.format(product.getCreateDate()));
			displayinfoProduct.put("modifyDate", simpleDateFormat.format(product.getModifyDate()));
			displayinfoProduct.put("fileId", productImageDao.selectByProductIdTypeMa(product.getId()).getFileId());
			displayinfoProducts.add(displayinfoProduct);
			
			productCount--;
			if(productCount == 0)break;
		}

		apiDisplayinfos.put("products ", displayinfoProducts);
		return apiDisplayinfos;
	}
}
