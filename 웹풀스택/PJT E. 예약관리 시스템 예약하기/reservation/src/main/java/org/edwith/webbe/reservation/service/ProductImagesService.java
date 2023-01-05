package org.edwith.webbe.reservation.service;

import java.util.List;

import org.edwith.webbe.reservation.dao.ProductImageDao;
import org.edwith.webbe.reservation.dto.ProductImage;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductImagesService {
	private final ProductImageDao productImageDao;

	public ProductImage getProductImageById(Integer id) {
		return productImageDao.selectById(id);
	}

	public List<ProductImage> getProductImagesByProductId(Integer productId) {
		return productImageDao.selectByProductId(productId);
	}

	public List<ProductImage> getProductImagesByProductIdByType(Integer productId, String type) {
		return productImageDao.selectByProductIdByType(productId, type);
	}
}
