package kr.or.connect.reservation.dao.impl;

import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import kr.or.connect.reservation.config.ApplicationConfig;
import kr.or.connect.reservation.dto.FileInfo;

public class FileInfoDaoTest {
	ApplicationContext ac = new AnnotationConfigApplicationContext(ApplicationConfig.class); 
	
	FileInfo fileInfo = ac.getBean(FileInfo.class);
	
	
}
