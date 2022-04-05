package kr.or.connect.reservation.dao.impl;

import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.support.AbstractApplicationContext;

import kr.or.connect.reservation.config.ApplicationConfig;
import kr.or.connect.reservation.dao.ReservationUserCommentImageDao;

public class ReservationUserCommentImageDaoTest {
	public static void main(String[] args) {
		ApplicationContext ac = new AnnotationConfigApplicationContext(ApplicationConfig.class);
		ReservationUserCommentImageDao reservationUserCommentImageDao = ac
				.getBean(ReservationUserCommentImageDao.class);

		System.out.println(reservationUserCommentImageDao.selectByReservationUserCommentId(2));

		((AbstractApplicationContext) ac).close();
	}
}
