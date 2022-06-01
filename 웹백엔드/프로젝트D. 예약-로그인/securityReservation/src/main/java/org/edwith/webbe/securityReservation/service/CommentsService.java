package org.edwith.webbe.securityReservation.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import org.edwith.webbe.securityReservation.dao.ReservationUserCommentDao;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommentsService {

	private final ReservationUserCommentDao reservationUserCommentDao;

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
}
