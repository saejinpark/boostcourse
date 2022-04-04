package kr.or.connect.reservation.dao.impl;

import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import kr.or.connect.reservation.config.ApplicationConfig;
import kr.or.connect.reservation.dao.ProductDao;

public class ProductDaoTest {
	public static void main(String[] args) {
		ApplicationContext ac = new AnnotationConfigApplicationContext(ApplicationConfig.class);

		ProductDao productDao = ac.getBean(ProductDao.class);

//		System.out.println(productDao.selectAll());
//		System.out.println(productDao.countCategoryId());
//		System.out.println(productDao.countCategoryId(1));
		System.out.println(productDao.selectAllLimitStart(30, 4).size());
	}
}
