package kr.or.connect.reservation.dao.impl;

import java.io.FileReader;
import java.io.IOException;
import java.util.Properties;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.PropertySource;

import kr.or.connect.reservation.config.ApplicationConfig;
import kr.or.connect.reservation.dao.UserDao;
import kr.or.connect.reservation.dto.User;

public class UserDaoTest {
	public static void main(String[] args) throws IOException {
		ApplicationContext ac = new AnnotationConfigApplicationContext(ApplicationConfig.class); 
		
		UserDao userDao = ac.getBean(UserDao.class);

		System.out.println(userDao.selectAll());
	}
}
