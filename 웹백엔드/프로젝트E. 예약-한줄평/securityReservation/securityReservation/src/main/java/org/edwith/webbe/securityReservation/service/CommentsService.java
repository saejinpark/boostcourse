package org.edwith.webbe.securityReservation.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.edwith.webbe.securityReservation.dao.FileInfoDao;
import org.edwith.webbe.securityReservation.dao.ReservationInfosDao;
import org.edwith.webbe.securityReservation.dao.ReservationUserCommentDao;
import org.edwith.webbe.securityReservation.dao.ReservationUserCommentImageDao;
import org.edwith.webbe.securityReservation.dto.ReservationInfo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommentsService {
	private final ReservationInfosDao reservationInfosDao;
	private final ReservationUserCommentDao reservationUserCommentDao;
	private final FileInfoDao fileInfoDao;
	private final ReservationUserCommentImageDao reservationUserCommentImageDao;

	public Map<String, Object> getComments(Integer productId, Integer start) {
		Map<String, Object> comments = new HashMap<>();
		final Integer commentCount = 5;
		comments.put("commentCount", commentCount);
		if (start == null)
			start = 0;
		if (productId == null) {
			comments.put("totalCount", reservationUserCommentDao.selectCountAll());
			comments.put("reservationUserComments", reservationUserCommentDao.getComments(start, commentCount));
		} else {
			comments.put("totalCount", reservationUserCommentDao.selectCountProductId(productId));
			comments.put("reservationUserComments",
					reservationUserCommentDao.getComments(productId, start, commentCount));
		}
		return comments;
	}
	@Transactional
	public void postComments(int reservationInfoId, int score, Long userId, String comment, String fileName) {
		
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
    		Integer reservationUserCommentId = 
 			reservationUserCommentDao.insertReservationUserComment(
 				reservationInfo.getProductId(), 
 				reservationInfoId, 
  				score,
  				userId,  
    			comment
   			);
  		
    		reservationUserCommentImageDao
    			.insertReservationUserCommentImage(
					reservationInfoId, 
					reservationUserCommentId, 
					fileInfoId
				);
        }catch(Exception ex){
            throw new RuntimeException("file Save Error");
        }
	}
}
