package org.edwith.webbe.reservation.service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.edwith.webbe.reservation.dao.DisplayInfoDao;
import org.edwith.webbe.reservation.dao.FileInfoDao;
import org.edwith.webbe.reservation.dao.ReservationInfosDao;
import org.edwith.webbe.reservation.dao.ReservationCommentDao;
import org.edwith.webbe.reservation.dao.ReservationCommentImageDao;
import org.edwith.webbe.reservation.dto.DisplayInfo;
import org.edwith.webbe.reservation.dto.ReservationInfo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommentsService {

	private Logger logger = LoggerFactory.getLogger(this.getClass());

	private final ReservationInfosDao reservationInfosDao;
	private final ReservationCommentDao reservationCommentDao;
	private final FileInfoDao fileInfoDao;
	private final ReservationCommentImageDao reservationCommentImageDao;
	private final DisplayInfoDao displayInfoDao;

	public Map<String, Object> getComments(Integer displayInfoId, Integer start) {
		DisplayInfo displayInfo = displayInfoDao.getDisplayInfos(displayInfoId);

		Map<String, Object> comments = new HashMap<>();
		final Integer commentCount = 5;
		comments.put("commentCount", commentCount);
		if (displayInfoId == null) {
			comments.put("totalCount", reservationCommentDao.selectCountAll());
			comments.put("avgScore", reservationCommentDao.selectAvgScoreAll());
			comments.put("reservationComments", reservationCommentDao.getComments(start, commentCount));
		} else {
			comments.put("totalCount", reservationCommentDao.selectCountDisplayInfoId(displayInfoId));
			comments.put("avgScore", reservationCommentDao.selectAvgScoreByProductId(displayInfo.getId()));
			comments.put("reservationUserComments",
					reservationCommentDao.getComments(displayInfoId, start, commentCount));
		}

		return comments;
	}

	@Transactional
	public void postComments(int reservationInfoId, int score, String email, String comment, MultipartFile file) {
		ReservationInfo reservationInfo = reservationInfosDao.selectById(reservationInfoId);
		if (reservationInfo.getReservationEmail().equals(email)) {
			throw new SecurityException("이메일이 예약정보와 일치하지 않습니다.");
		}
		Integer reservationCommentId = reservationCommentDao.insertReservationComment(
				reservationInfo.getProductId(), reservationInfoId, score, comment);

		if (file != null) {
			try {
				String path = "/img/";
				File Folder = new File(path);
				if (!Folder.exists()) {
					try {
						Folder.mkdir();
						logger.info("폴더가 생성되었습니다.");
					} catch (Exception e) {
						e.getStackTrace();
					}
				} else {
					logger.info("이미 폴더가 생성되어 있습니다.");
				}

				try (FileOutputStream fos = new FileOutputStream(path + file.getOriginalFilename());
						InputStream is = file.getInputStream();) {
					int readCount = 0;
					byte[] buffer = new byte[1024];
					while ((readCount = is.read(buffer)) != -1) {
						fos.write(buffer, 0, readCount);
					}
					String fileName = file.getOriginalFilename();
					int pos = fileName.lastIndexOf(".");
					String ext = fileName.substring(pos + 1);
					Integer fileInfoId = fileInfoDao.insertFileInfo(fileName, "img/" + fileName, "image/" + ext);

					reservationCommentImageDao.insertReservationCommentImage(reservationInfoId, reservationCommentId,
							fileInfoId);
				} catch (Exception ex) {
					throw new Exception(ex);
				}

			} catch (Exception ex) {
				throw new RuntimeException("postcomment Error");
			}
		}
	}

}
