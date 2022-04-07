package kr.or.connect.reservation.dao.impl;

import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.support.AbstractApplicationContext;

import kr.or.connect.reservation.config.ApplicationConfig;
import kr.or.connect.reservation.dao.FileInfoDao;

public class FileInfoDaoTest {
	public static void main(String[] args) {
		ApplicationContext ac = new AnnotationConfigApplicationContext(ApplicationConfig.class);
		FileInfoDao fileInfoDao = ac.getBean(FileInfoDao.class);

		System.out.println(fileInfoDao.selectByFileId(1));
		
	    ((AbstractApplicationContext) ac).close();
	}
}
