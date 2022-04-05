package kr.or.connect.reservation.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.connect.reservation.dao.ReservationUserCommentDao;
import kr.or.connect.reservation.dao.ReservationUserCommentImageDao;
import kr.or.connect.reservation.dao.UserDao;
import kr.or.connect.reservation.dto.ReservationUserComment;
import kr.or.connect.reservation.dto.ReservationUserCommentImage;
import kr.or.connect.reservation.dto.User;

@Service
public class CommentsService {
	
	@Autowired
	UserDao userDao;
	
	@Autowired
	ReservationUserCommentDao reservationUserCommentDao;

	@Autowired
	ReservationUserCommentImageDao reservationUserCommentImageDao;
	
	public Map<String, Object> getComments(Integer productId, Integer start) {
		
		Map<String, Object> Comments = new HashMap<String, Object>();

		String pattern = "yyyy-MM-dd HH:mm:ss.S";
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
		
		Integer commentCount = 5;
		
		if(start == null)start = 0;
		
		List<ReservationUserComment> reservationUserComments;
		Integer totalCount;
		
		if(productId == null) {
			totalCount = reservationUserCommentDao.selectCountAll();
			reservationUserComments = reservationUserCommentDao.selectAllLimitStart(start, commentCount);
		} else {
			totalCount = reservationUserCommentDao.selectCountByProductId(productId);
			reservationUserComments = reservationUserCommentDao.selectByProductIdLimitStart(productId, start, commentCount);
		}
		
		Comments.put("totalCount", totalCount);
		Comments.put("commentCount", commentCount);
		
		List<Map<String, Object>> apiReservationUserComments = new ArrayList<Map<String,Object>>();
		
		for(ReservationUserComment reservationUserComment : reservationUserComments) {
			Map<String, Object> apiReservationUserComment = new HashMap<String, Object>();
			apiReservationUserComment.put("id", reservationUserComment.getId());
			apiReservationUserComment.put("productId", reservationUserComment.getProduct_id());
			apiReservationUserComment.put("reservationInfoId", reservationUserComment.getReservation_info_id());
			apiReservationUserComment.put("score", reservationUserComment.getScore());
			User user = userDao.selectById(reservationUserComment.getUser_id());
			apiReservationUserComment.put("reservationEmail", user.getEmail());
			apiReservationUserComment.put("comment", reservationUserComment.getComment());
			apiReservationUserComment.put("createDate", simpleDateFormat.format(reservationUserComment.getCreate_date()));
			apiReservationUserComment.put("modifyDate", simpleDateFormat.format(reservationUserComment.getModify_date()));
			
			List<ReservationUserCommentImage> reservationUserCommentImages = //
					reservationUserCommentImageDao.selectByReservationUserCommentId(reservationUserComment.getId());
			List<Map<String, Object>> apiReservationUserCommentImages = new ArrayList<Map<String,Object>>();
			
			for(ReservationUserCommentImage reservationUserCommentImage : reservationUserCommentImages) {
				Map<String, Object> apiReservationUserCommentImage = new HashMap<String, Object>();
				apiReservationUserCommentImage.put("id", reservationUserCommentImage.getId());
				apiReservationUserCommentImage.put("reservationInfoId", reservationUserCommentImage.getReservation_info_id());
				apiReservationUserCommentImage.put("reservationUserCommentId", reservationUserCommentImage.getReservation_user_comment_id());
				apiReservationUserCommentImage.put("fileId", reservationUserCommentImage.getFile_id());
				
				apiReservationUserCommentImages.add(apiReservationUserCommentImage);
			}
			
			apiReservationUserComment.put("reservationUserCommentImages", apiReservationUserCommentImages);
			
			
			apiReservationUserComments.add(apiReservationUserComment);
		}
		
		Comments.put("reservationUserComments", apiReservationUserComments);
		
		
		return Comments;
	}
}
