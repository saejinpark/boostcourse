package kr.or.connect.reservation.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.connect.reservation.dao.CategoryDao;
import kr.or.connect.reservation.dao.DisplayInfoDao;
import kr.or.connect.reservation.dao.DisplayInfoImageDao;
import kr.or.connect.reservation.dao.FileInfoDao;
import kr.or.connect.reservation.dao.ProductDao;
import kr.or.connect.reservation.dao.ProductImageDao;
import kr.or.connect.reservation.dao.ReservationUserCommentDao;
import kr.or.connect.reservation.dao.ProductPriceDao;
import kr.or.connect.reservation.dto.Category;
import kr.or.connect.reservation.dto.DisplayInfo;
import kr.or.connect.reservation.dto.DisplayInfoImage;
import kr.or.connect.reservation.dto.FileInfo;
import kr.or.connect.reservation.dto.Product;
import kr.or.connect.reservation.dto.ProductImage;
import kr.or.connect.reservation.dto.ProductPrice;

@Service
public class DisplayinfosByDisplayIdService {

	String pattern = "yyyy-MM-dd HH:mm:ss.S";
	SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);

	@Autowired
	CategoryDao categoryDao;

	@Autowired
	ProductDao productDao;

	@Autowired
	DisplayInfoDao displayInfoDao;

	@Autowired
	ProductImageDao productImageDao;

	@Autowired
	FileInfoDao fileInfoDao;

	@Autowired
	DisplayInfoImageDao displayInfoImageDao;

	@Autowired
	ReservationUserCommentDao reservationUserCommentDao;
	
	@Autowired
	ProductPriceDao productPriceDao;

	public Map<String, Object> getDisplayinfosByDisplayId(Integer displayId) {
		Map<String, Object> displayinfosByDisplayId = new HashMap<String, Object>();
		Map<String, Object> apiProduct = new HashMap<String, Object>();
		DisplayInfo displayInfo = displayInfoDao.selectById(displayId);
		Product product = productDao.selectById(displayInfo.getProductId());
		Category category = categoryDao.selectById(product.getCategoryId());
		apiProduct.put("id", product.getId());
		apiProduct.put("categoryId", category.getId());
		apiProduct.put("displayInfoId", displayId);
		apiProduct.put("name", category.getName());
		apiProduct.put("id", product.getId());
		apiProduct.put("categoryId", product.getCategoryId());
		apiProduct.put("displayInfoId", displayInfo.getId());
		apiProduct.put("name", category.getName());
		apiProduct.put("description", product.getDescription());
		apiProduct.put("content", product.getContent());
		apiProduct.put("event", product.getEvent());
		apiProduct.put("openingHours", displayInfo.getOpeningHours());
		apiProduct.put("placeName", displayInfo.getPlaceName());
		apiProduct.put("placeLot", displayInfo.getPlaceLot());
		apiProduct.put("placeStreet", displayInfo.getPlaceStreet());
		apiProduct.put("tel", displayInfo.getTel());
		apiProduct.put("homepage", displayInfo.getHomepage());
		apiProduct.put("email", displayInfo.getEmail());
		apiProduct.put("createDate", simpleDateFormat.format(displayInfo.getCreateDate()));
		apiProduct.put("modifyDate", simpleDateFormat.format(displayInfo.getModifyDate()));
		apiProduct.put("fileId", productImageDao.selectByProductIdTypeMa(product.getId()).getFileId());
		displayinfosByDisplayId.put("product", apiProduct);
		
		List<Map<String, Object>> apiProductImages = new ArrayList<Map<String, Object>>();
		
		List<ProductImage> productImages = productImageDao.selectByProductId(product.getId());
		
		for (ProductImage productImage : productImages) {
			Map<String, Object> apiProductImage = new HashMap<String, Object>();
			FileInfo fileInfo = fileInfoDao.selectByFileId(productImage.getFileId());
			apiProductImage.put("productId", product.getId());
			apiProductImage.put("productImageId", productImage.getId());
			apiProductImage.put("type", productImage.getType());
			apiProductImage.put("fileInfoId", fileInfo.getId());
			apiProductImage.put("fileName", fileInfo.getFileName());
			apiProductImage.put("saveFileName", fileInfo.getSaveFileName());
			apiProductImage.put("contentType", fileInfo.getContentType());
			apiProductImage.put("deleteFlag", fileInfo.getDeleteFlag());
			apiProductImage.put("createDate", simpleDateFormat.format(fileInfo.getCreateDate()));
			apiProductImage.put("modifyDate", simpleDateFormat.format(fileInfo.getModifyDate()));

			apiProductImages.add(apiProductImage);
		}

		displayinfosByDisplayId.put("productImages", apiProductImages);

		List<Map<String, Object>> apiDisplayInfoImages = new ArrayList<Map<String, Object>>();
		
		List<DisplayInfoImage> displayInfoImages = displayInfoImageDao.selectByDisplayInfoId(displayId);
		
		for (DisplayInfoImage displayInfoImage : displayInfoImages) {
			Map<String, Object> apiDisplayInfoImage = new HashMap<String, Object>();
			FileInfo fileInfo = fileInfoDao.selectByFileId(displayInfoImage.getFileId());
			apiDisplayInfoImage.put("id", displayInfoImage.getId());
			apiDisplayInfoImage.put("displayInfoId", displayInfoImage.getDisplayInfoId());
			apiDisplayInfoImage.put("fileId", displayInfoImage.getFileId());
			apiDisplayInfoImage.put("fileName", fileInfo.getFileName());
			apiDisplayInfoImage.put("saveFileName", fileInfo.getSaveFileName());
			apiDisplayInfoImage.put("contentType", fileInfo.getContentType());
			apiDisplayInfoImage.put("deleteFlag", fileInfo.getDeleteFlag());
			apiDisplayInfoImage.put("createDate", simpleDateFormat.format(fileInfo.getCreateDate()));
			apiDisplayInfoImage.put("modifyDate", simpleDateFormat.format(fileInfo.getModifyDate()));

			apiDisplayInfoImages.add(apiDisplayInfoImage);
		}

		displayinfosByDisplayId.put("displayInfoImages", apiDisplayInfoImages);
		
		Float avgScore = reservationUserCommentDao.selectAvgScoreByProductId(product.getId());
		
		if(avgScore == null)displayinfosByDisplayId.put("avgScore", 0);
		else displayinfosByDisplayId.put("avgScore", reservationUserCommentDao.selectAvgScoreByProductId(product.getId()).intValue());
		
		List<ProductPrice> productPrices = productPriceDao.selectByProductId(displayId);
		List<Map<String, Object>> apiProductPrices = new ArrayList<Map<String,Object>>();
		for(ProductPrice productPrice : productPrices) {
			Map<String, Object> apiProductPrice = new HashMap<String, Object>();
			apiProductPrice.put("id", productPrice.getId());
			apiProductPrice.put("productId", productPrice.getProductId());
			apiProductPrice.put("priceTypeName", productPrice.getPriceTypeName());
			apiProductPrice.put("price", productPrice.getPrice());
			apiProductPrice.put("discountRate", productPrice.getDiscountRate());
			apiProductPrice.put("createDate", simpleDateFormat.format(productPrice.getCreateDate()));
			apiProductPrice.put("modifyDate", simpleDateFormat.format(productPrice.getDiscountRate()));
			
			apiProductPrices.add(apiProductPrice);
		}
		displayinfosByDisplayId.put("productPrices", apiProductPrices);
		
		return displayinfosByDisplayId;
	}
}
