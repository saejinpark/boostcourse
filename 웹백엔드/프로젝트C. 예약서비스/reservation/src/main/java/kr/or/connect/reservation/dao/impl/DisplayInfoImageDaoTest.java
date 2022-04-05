package kr.or.connect.reservation.dao.impl;

import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.support.AbstractApplicationContext;

import kr.or.connect.reservation.config.ApplicationConfig;
import kr.or.connect.reservation.dao.DisplayInfoImageDao;

public class DisplayInfoImageDaoTest {
	public static void main(String[] args) {
		ApplicationContext ac = new AnnotationConfigApplicationContext(ApplicationConfig.class);
		DisplayInfoImageDao displayInfoImageDao = ac.getBean(DisplayInfoImageDao.class);
		
		System.out.println(displayInfoImageDao.selectByDisplayInfoId(40));
		
	    ((AbstractApplicationContext) ac).close();
	}
}
