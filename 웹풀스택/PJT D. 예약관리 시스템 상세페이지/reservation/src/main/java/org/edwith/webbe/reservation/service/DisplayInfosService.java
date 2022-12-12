package org.edwith.webbe.reservation.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import org.edwith.webbe.reservation.dao.CategoryDao;
import org.edwith.webbe.reservation.dao.DisplayInfoImageDao;
import org.edwith.webbe.reservation.dao.DisplayInfoDao;
import org.edwith.webbe.reservation.dao.ProductImageDao;
import org.edwith.webbe.reservation.dao.ProductPriceDao;
import org.edwith.webbe.reservation.dao.ReservationCommentDao;
import org.edwith.webbe.reservation.dto.DisplayInfo;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DisplayInfosService {

	private final CategoryDao categoryDao;
	private final DisplayInfoDao displayInfoDao;
	private final ProductImageDao productImageDao;
	private final DisplayInfoImageDao displayInfoImageDao;
	private final ReservationCommentDao reservationUserCommentDao;
	private final ProductPriceDao productPriceDao;

	public Map<String, Object> getDisplayinfos(Integer categoryId, Integer start) {

		if (start == null)
			start = 0;
		final Integer productCount = 4;
		Map<String, Object> displayinfos = new HashMap<>();
		displayinfos.put("productCount", productCount);
		if (categoryId == null) {
			displayinfos.put("totalCount", categoryDao.getCountAll());
			displayinfos.put("products", displayInfoDao.getDisplayInfos(start, productCount));
		} else {
			displayinfos.put("totalCount", categoryDao.getCountById(categoryId));
			displayinfos.put("products", displayInfoDao.getDisplayInfos(categoryId, start, productCount));
		}
		return displayinfos;
	}

	public Map<String, Object> getProductsById(Integer displayId) {
		Map<String, Object> displayinfos = new HashMap<>();
		DisplayInfo product = displayInfoDao.getDisplayInfos(displayId);
		displayinfos.put("product", product);
		displayinfos.put("productImages", productImageDao.selectByProductId(product.getId()));
		displayinfos.put("displayInfoImages", displayInfoImageDao.selectByProductId(displayId));
		displayinfos.put("productPrices", productPriceDao.selectByProductId(product.getId()));

		return displayinfos;
	}

}
