package org.edwith.webbe.reservation.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import org.edwith.webbe.reservation.dao.ReservationInfoPriceDao;
import org.edwith.webbe.reservation.dao.ReservationInfosDao;
import org.edwith.webbe.reservation.dto.RegisteredReservationInfo;
import org.edwith.webbe.reservation.dto.ReservationInfo;
import org.edwith.webbe.reservation.dto.ReservationInfoPrice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReservationInfosService {
	
	private final ReservationInfosDao reservationInfosDao;
	private final ReservationInfoPriceDao reservationInfoPriceDao;
	
	public HashMap<String, Object> getReservationInfos(String emil) {
		
		HashMap<String, Object> ReservationInfos = new HashMap<>();
		List<ReservationInfo> items = reservationInfosDao.selectByEmail(emil);
		ReservationInfos.put("size", items.size());
		ReservationInfos.put("items", items);
		
		return ReservationInfos;
	}
	@Transactional
	public RegisteredReservationInfo reservation(
			HashMap<String, Object> registerReservationInfo) throws ParseException
		{
		
        SimpleDateFormat sDate = new SimpleDateFormat("yyyy.MM.dd");
        Date now = new Date();
        
        Integer reservationInfoId = reservationInfosDao.insertReservationInfo(
			(Integer) registerReservationInfo.get("productId"), 
			(Integer) registerReservationInfo.get("displayInfoId"),
			(String) registerReservationInfo.get("reservationName"),
			(String) registerReservationInfo.get("reservationTel"),
			(String) registerReservationInfo.get("reservationEmail"),
			sDate.parse((String) registerReservationInfo.get("reservationDate")),
			now,
			now
		);
        
        @SuppressWarnings("unchecked")
		List<HashMap<String, Object>> prices = (List<HashMap<String, Object>>) registerReservationInfo.get("prices");
        
        for(HashMap<String, Object> price : prices) {
        	reservationInfoPriceDao.insertReservationInfoPrice(
					reservationInfoId, 
					(Integer) price.get("productPriceId"), 
					(Integer) price.get("count")
    			);
        }
        
        SimpleDateFormat fDate = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
        
        ReservationInfo tempReservationInfo = reservationInfosDao.selectById(reservationInfoId);
        List<ReservationInfoPrice> tempReservationInfoPrices = reservationInfoPriceDao.selectByReservationInfoId(reservationInfoId);
        
        RegisteredReservationInfo registeredReservationInfo = new RegisteredReservationInfo();
        registeredReservationInfo.setId(tempReservationInfo.getId());
        registeredReservationInfo.setProductId(tempReservationInfo.getProductId());
        registeredReservationInfo.setDisplayInfoId(tempReservationInfo.getDisplayInfoId());
        registeredReservationInfo.setReservationName(tempReservationInfo.getReservationName());
        registeredReservationInfo.setReservationTel(tempReservationInfo.getReservationTel());
        registeredReservationInfo.setReservationEmail(tempReservationInfo.getReservationEmail());
        registeredReservationInfo.setReservationDate(fDate.parse(tempReservationInfo.getReservationDate()));
        registeredReservationInfo.setCreateDate(fDate.parse(tempReservationInfo.getCreateDate()));
        registeredReservationInfo.setModifyDate(fDate.parse(tempReservationInfo.getModifyDate()));
        registeredReservationInfo.setPrices(tempReservationInfoPrices);      
        
		return registeredReservationInfo;
	}
}
