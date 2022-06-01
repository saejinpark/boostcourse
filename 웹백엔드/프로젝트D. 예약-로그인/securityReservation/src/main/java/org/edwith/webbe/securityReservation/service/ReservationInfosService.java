package org.edwith.webbe.securityReservation.service;

import java.sql.SQLDataException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import org.edwith.webbe.securityReservation.dao.ReservationInfoPriceDao;
import org.edwith.webbe.securityReservation.dao.ReservationInfosDao;
import org.edwith.webbe.securityReservation.dto.RegisteredReservationInfo;
import org.edwith.webbe.securityReservation.dto.ReservationInfo;
import org.edwith.webbe.securityReservation.dto.ReservationInfoPrice;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReservationInfosService {
	
	private final ReservationInfosDao reservationInfosDao;
	private final ReservationInfoPriceDao reservationInfoPriceDao;
	
	public HashMap<String, Object> getReservationInfos(Integer userId) {
		HashMap<String, Object> ReservationInfos = new HashMap<>();
		List<ReservationInfo> items = reservationInfosDao.selectByUserId(userId);
		ReservationInfos.put("size", items.size());
		ReservationInfos.put("items", items);
		return ReservationInfos;
	}
	
	public RegisteredReservationInfo reservation(
			HashMap<String, Object> registerReservationInfo) throws ParseException{
		
		HashMap<String, Object> RRI = registerReservationInfo;

        SimpleDateFormat sDate = new SimpleDateFormat("yyyy.MM.dd");
        Date now = new Date();
        Integer reservationInfoId = reservationInfosDao.insertReservationInfo(
			(Integer) RRI.get("productId"), 
			(Integer) RRI.get("displayInfoId"),
			(Integer) RRI.get("userId"),
			sDate.parse((String) RRI.get("reservationYearMonthDay")),
			now,
			now
		);
        @SuppressWarnings("unchecked")
		List<HashMap<String, Object>> prices = (List<HashMap<String, Object>>) RRI.get("prices");
        for(HashMap<String, Object> price : prices) {
        	reservationInfosDao.insertReservationInfoPrice(
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
        registeredReservationInfo.setCancelFlag(tempReservationInfo.getCancelFlag());
        registeredReservationInfo.setDisplayInfoId(tempReservationInfo.getDisplayInfoId());
        registeredReservationInfo.setUserId(tempReservationInfo.getUserId());
        registeredReservationInfo.setReservationDate(fDate.parse(tempReservationInfo.getReservationDate()));
        registeredReservationInfo.setCreateDate(fDate.parse(tempReservationInfo.getCreateDate()));
        registeredReservationInfo.setModifyDate(fDate.parse(tempReservationInfo.getModifyDate()));
        registeredReservationInfo.setPrices(tempReservationInfoPrices);      
        
		return registeredReservationInfo;
	}
	
	public void cancelReservation(Integer id) throws SQLDataException{
		try {
			ReservationInfo reservationInfos = reservationInfosDao.selectById(id);
			if(reservationInfos.getCancelFlag() == 0) {
				reservationInfosDao.cancel(id);
			} else {
				throw new SQLDataException(); 
			}
		}catch(EmptyResultDataAccessException e) {
			throw new SQLDataException();
		}
	}
}
