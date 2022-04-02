package kr.or.connect.reservation.dao.impl;

import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import kr.or.connect.reservation.config.ApplicationConfig;
import kr.or.connect.reservation.dao.CategoryDao;

public class CategoryDaoTest {
	public static void main(String[] args) {
		ApplicationContext ac = new AnnotationConfigApplicationContext(ApplicationConfig.class);

		CategoryDao categorieDao = ac.getBean(CategoryDao.class);
		System.out.println(categorieDao.selectAll());
	}
}
