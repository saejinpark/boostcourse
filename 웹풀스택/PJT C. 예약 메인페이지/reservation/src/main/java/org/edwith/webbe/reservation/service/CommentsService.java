package org.edwith.webbe.reservation.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.edwith.webbe.reservation.dao.FileInfoDao;
import org.edwith.webbe.reservation.dao.ReservationInfosDao;
import org.edwith.webbe.reservation.dao.ReservationCommentDao;
import org.edwith.webbe.reservation.dao.ReservationCommentImageDao;
import org.edwith.webbe.reservation.dto.ReservationInfo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommentsService {
	private final ReservationInfosDao reservationInfosDao;
	private final ReservationCommentDao reservationCommentDao;
	private final FileInfoDao fileInfoDao;
	private final ReservationCommentImageDao reservationCommentImageDao;

	public Map<String, Object> getComments(Integer productId, Integer start) {
		
		Map<String, Object> comments = new HashMap<>();
		final Integer commentCount = 5;
		comments.put("commentCount", commentCount);
		if (start == null)
			start = 0;
		if (productId == null) {
			comments.put("totalCount", reservationCommentDao.selectCountAll());
			comments.put("reservationComments", reservationCommentDao.getComments(start, commentCount));
		} else {
			comments.put("totalCount", reservationCommentDao.selectCountProductId(productId));
			comments.put("reservationUserComments",
					reservationCommentDao.getComments(productId, start, commentCount));
		}
		
		return comments;
	}
	
	@Transactional
	public void postComments(int reservationInfoId, int score, String email, String comment, String fileName) {
		try{
        	int pos = fileName.lastIndexOf( "." );
    		String ext = fileName.substring( pos + 1 );
    		Integer fileInfoId = 
    			fileInfoDao.insertFileInfo(
    				fileName,
    				"img/" + fileName,
    				"image/" + ext
    			);
    		ReservationInfo reservationInfo = reservationInfosDao.selectById(reservationInfoId);
    		Integer reservationCommentId = 
 			reservationCommentDao.insertReservationComment(
 				reservationInfo.getProductId(), 
 				reservationInfoId, 
  				score,
  				email,  
    			comment
   			);
  		
    		reservationCommentImageDao
    			.insertReservationCommentImage(
					reservationInfoId, 
					reservationCommentId, 
					fileInfoId
				);
        }catch(Exception ex){
            throw new RuntimeException("postcomment Error");
        }
	}
	@Transactional
	public void postComments(int reservationInfoId, int score, String email, String comment){
		
		ReservationInfo reservationInfo = reservationInfosDao.selectById(reservationInfoId);
		reservationCommentDao.insertReservationComment(
			reservationInfo.getProductId(), 
			reservationInfoId, 
			score,
			email,  
			comment
		);
	}
}
