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
	ProductPriceDao ProductPriceDao;

	public Map<String, Object> getDisplayinfosByDisplayId(Integer displayId) {
		Map<String, Object> displayinfosByDisplayId = new HashMap<String, Object>();
		Map<String, Object> apiProduct = new HashMap<String, Object>();
		
		Product product = productDao.selectByProductId(displayId);
		DisplayInfo displayInfo = displayInfoDao.selectByProductId(product.getId());
		kr.or.connect.reservation.dto.Category category = categoryDao.selectById(product.getCategory_id());
		ProductImage productImageTypeMa = productImageDao.selectByProductIdTypeMa(product.getId());
		List<ProductImage> productImages = productImageDao.selectByProductId(product.getId());
		List<DisplayInfoImage> displayInfoImages = displayInfoImageDao.selectByDisplayInfoId(displayInfo.getId());
		List<ProductPrice> productPrices = ProductPriceDao.selectByProductId(product.getId());
		
		apiProduct.put("id", product.getId());
		apiProduct.put("categoryId", product.getCategory_id());
		apiProduct.put("displayInfoId", displayInfo.getId());
		apiProduct.put("name", category.getName());
		apiProduct.put("description", product.getDescription());
		apiProduct.put("content", product.getContent());
		apiProduct.put("event", product.getEvent());
		apiProduct.put("openingHours", displayInfo.getOpening_hours());
		apiProduct.put("placeName", displayInfo.getPlace_name());
		apiProduct.put("placeLot", displayInfo.getPlace_lot());
		apiProduct.put("placeStreet", displayInfo.getPlace_street());
		apiProduct.put("tel", displayInfo.getTel());
		apiProduct.put("homepage", displayInfo.getHomepage());
		apiProduct.put("email", displayInfo.getEmail());
		apiProduct.put("createDate", simpleDateFormat.format(displayInfo.getCreate_date()));
		apiProduct.put("modifyDate", simpleDateFormat.format(displayInfo.getModify_date()));
		apiProduct.put("fileId", productImageTypeMa.getProduct_id());

		displayinfosByDisplayId.put("product", apiProduct);

		List<Map<String, Object>> apiProductImages = new ArrayList<Map<String, Object>>();

		for (ProductImage productImage : productImages) {
			Map<String, Object> apiProductImage = new HashMap<String, Object>();
			FileInfo fileInfo = fileInfoDao.selectByFileId(productImage.getFile_id());
			apiProductImage.put("productId", product.getId());
			apiProductImage.put("productImageId", productImage.getId());
			apiProductImage.put("type", productImage.getType());
			apiProductImage.put("fileInfoId", fileInfo.getId());
			apiProductImage.put("fileName", fileInfo.getFile_name());
			apiProductImage.put("saveFileName", fileInfo.getSave_file_name());
			apiProductImage.put("contentType", fileInfo.getContent_type());
			apiProductImage.put("deleteFlag", fileInfo.getDelete_flag());
			apiProductImage.put("createDate", simpleDateFormat.format(fileInfo.getCreate_date()));
			apiProductImage.put("modifyDate", simpleDateFormat.format(fileInfo.getModify_date()));

			apiProductImages.add(apiProductImage);
		}

		displayinfosByDisplayId.put("productImages", apiProductImages);

		List<Map<String, Object>> apiDisplayInfoImages = new ArrayList<Map<String, Object>>();

		for (DisplayInfoImage displayInfoImage : displayInfoImages) {
			Map<String, Object> apiDisplayInfoImage = new HashMap<String, Object>();
			FileInfo fileInfo = fileInfoDao.selectByFileId(displayInfoImage.getFile_id());
			apiDisplayInfoImage.put("id", displayInfoImage.getId());
			apiDisplayInfoImage.put("displayInfoId", displayInfoImage.getDisplay_info_id());
			apiDisplayInfoImage.put("fileId", displayInfoImage.getFile_id());
			apiDisplayInfoImage.put("fileName", fileInfo.getFile_name());
			apiDisplayInfoImage.put("saveFileName", fileInfo.getSave_file_name());
			apiDisplayInfoImage.put("contentType", fileInfo.getContent_type());
			apiDisplayInfoImage.put("deleteFlag", fileInfo.getDelete_flag());
			apiDisplayInfoImage.put("createDate", simpleDateFormat.format(fileInfo.getCreate_date()));
			apiDisplayInfoImage.put("modifyDate", simpleDateFormat.format(fileInfo.getModify_date()));

			apiDisplayInfoImages.add(apiDisplayInfoImage);
		}

		displayinfosByDisplayId.put("displayInfoImages", apiDisplayInfoImages);
		displayinfosByDisplayId.put("avgScore", (int)reservationUserCommentDao.selectAvgScoreByProductId(product.getId()));
		List<Map<String, Object>> apiProductPrices = new ArrayList<Map<String,Object>>();
		for(ProductPrice productPrice : productPrices) {
			Map<String, Object> apiProductPrice = new HashMap<String, Object>();
			
			apiProductPrice.put("id", productPrice.getId());
			apiProductPrice.put("productId", productPrice.getProduct_id());
			apiProductPrice.put("priceTypeName", productPrice.getPrice_type_name());
			apiProductPrice.put("price", productPrice.getPrice());
			apiProductPrice.put("discountRate", productPrice.getDiscount_rate());
			apiProductPrice.put("createDate", simpleDateFormat.format(productPrice.getCreate_date()));
			apiProductPrice.put("modifyDate", simpleDateFormat.format(productPrice.getDiscount_rate()));
			
			apiProductPrices.add(apiProductPrice);
		}
		displayinfosByDisplayId.put("productPrices", apiProductPrices);
		
		return displayinfosByDisplayId;
	}
}
