package kr.or.connect.reservation.dao.impl;

import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.support.AbstractApplicationContext;

import kr.or.connect.reservation.config.ApplicationConfig;
import kr.or.connect.reservation.dao.PromotionDao;

public class PromotionDaoTest {
	public static void main(String[] args) {
		ApplicationContext ac = new AnnotationConfigApplicationContext(ApplicationConfig.class); 
		PromotionDao promotionDao = ac.getBean(PromotionDao.class);

		System.out.println(promotionDao.selectAll());

	    ((AbstractApplicationContext) ac).close();
	}
}
