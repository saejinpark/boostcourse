package org.edwith.webbe.reservation.dao;

import static org.junit.Assert.assertNotNull;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import org.edwith.webbe.reservation.config.ApplicationConfig;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {ApplicationConfig.class})
public class ProductImageDaoTest {
	
	@Autowired
	ProductImageDao productImageDao;
	
	@Test
    public void execute() throws Exception{
		assertNotNull("selectByProductId(1) should be not null", productImageDao.selectByProductId(1));
	}
}
