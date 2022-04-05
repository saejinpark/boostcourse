package kr.or.connect.reservation.dao.impl;

import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import kr.or.connect.reservation.config.ApplicationConfig;
import kr.or.connect.reservation.dao.ReservationUserCommentDao;

public class ReservationUserCommentDaoTest {

	public static void main(String[] args) {
		ApplicationContext ac = new AnnotationConfigApplicationContext(ApplicationConfig.class);
		ReservationUserCommentDao reservationUserCommentDao = ac.getBean(ReservationUserCommentDao.class);
		
		System.out.println(reservationUserCommentDao.selectByProductIdLimitStart(1, 1, 1));
		
	}
}
