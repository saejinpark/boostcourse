package kr.or.connect.reservation.dao.impl;


import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import kr.or.connect.reservation.config.ApplicationConfig;
import kr.or.connect.reservation.dao.UserDao;

public class UserDaoTest {
	public static void main(String[] args) {
		ApplicationContext ac = new AnnotationConfigApplicationContext(ApplicationConfig.class); 
		
		UserDao userDao = ac.getBean(UserDao.class);

		System.out.println(userDao.selectById(1));
	}
}
