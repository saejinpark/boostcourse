package kr.or.connect.reservation.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import kr.or.connect.reservation.dao.CategoryDao;
import kr.or.connect.reservation.dao.DisplayInfoImageDao;
import kr.or.connect.reservation.dao.DisplayinfoDao;
import kr.or.connect.reservation.dao.ProductImageDao;
import kr.or.connect.reservation.dao.ProductPriceDao;
import kr.or.connect.reservation.dao.ReservationUserCommentDao;
import kr.or.connect.reservation.dto.Displayinfo;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DisplayinfosService {

	private final CategoryDao categoryDao;
	private final DisplayinfoDao displayinfoDao;
	private final ProductImageDao productImageDao;
	private final DisplayInfoImageDao displayInfoImageDao;
	private final ReservationUserCommentDao reservationUserCommentDao;
	private final ProductPriceDao productPriceDao;

	public Map<String, Object> getDisplayinfos(Integer categoryId, Integer start) {

		if (start == null)
			start = 0;
		Integer productCount = 4;
		Map<String, Object> displayinfos = new HashMap<>();
		displayinfos.put("productCount", productCount);
		if (categoryId == null) {
			displayinfos.put("totalCount", categoryDao.getCountAll());
			displayinfos.put("products", displayinfoDao.getDisplayinfos(start, productCount));
		} else {
			displayinfos.put("totalCount", categoryDao.getCountById(categoryId));
			displayinfos.put("products", displayinfoDao.getDisplayinfos(categoryId, start, productCount));
		}
		return displayinfos;
	}

	public Map<String, Object> getDisplayinfosById(Integer displayId) {
		Map<String, Object> displayinfos = new HashMap<>();
		Displayinfo product = displayinfoDao.getDisplayinfos(displayId);
		displayinfos.put("product", product);
		displayinfos.put("productImages", productImageDao.selectByProductId(product.getId()));
		displayinfos.put("displayInfoImages", displayInfoImageDao.selectByProductId(displayId));
		displayinfos.put("avgScore", reservationUserCommentDao.selectAvgScoreByProductId(product.getId()));
		displayinfos.put("productPrices", productPriceDao.selectByProductId(product.getId()));

		return displayinfos;
	}

}
