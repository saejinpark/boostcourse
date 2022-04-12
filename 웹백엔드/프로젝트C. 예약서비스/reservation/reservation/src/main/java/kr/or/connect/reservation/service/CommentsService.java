package kr.or.connect.reservation.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import kr.or.connect.reservation.dao.ReservationUserCommentDao;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommentsService {

	private final ReservationUserCommentDao reservationUserCommentDao;

	public Map<String, Object> getComments(Integer productId, Integer start) {
		Map<String, Object> comments = new HashMap<>();
		Integer commentCount = 5;
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
