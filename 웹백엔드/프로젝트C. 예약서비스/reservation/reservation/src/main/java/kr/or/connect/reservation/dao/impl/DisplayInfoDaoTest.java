package kr.or.connect.reservation.dao.impl;

import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.support.AbstractApplicationContext;

import kr.or.connect.reservation.config.ApplicationConfig;
import kr.or.connect.reservation.dao.DisplayInfoDao;

public class DisplayInfoDaoTest {
	public static void main(String[] args) {
		ApplicationContext ac = new AnnotationConfigApplicationContext(ApplicationConfig.class);
		DisplayInfoDao displayInfoDao = ac.getBean(DisplayInfoDao.class);
		
		System.out.println(displayInfoDao.selectById(44));
		
	    ((AbstractApplicationContext) ac).close();
	}
}
 