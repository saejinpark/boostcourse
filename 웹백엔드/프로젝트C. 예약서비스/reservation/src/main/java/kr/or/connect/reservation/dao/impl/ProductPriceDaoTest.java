package kr.or.connect.reservation.dao.impl;

import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import kr.or.connect.reservation.config.ApplicationConfig;
import kr.or.connect.reservation.dao.ProductPriceDao;

public class ProductPriceDaoTest {
	public static void main(String[] args) {
		ApplicationContext ac = new AnnotationConfigApplicationContext(ApplicationConfig.class);
		ProductPriceDao productPriceDao = ac.getBean(ProductPriceDao.class);
		
		System.out.println(productPriceDao.selectByProductId(1));
		
	}
}
