package kr.or.connect.reservation.dao;

import static org.junit.Assert.assertNotNull;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import kr.or.connect.reservation.config.ApplicationConfig;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {ApplicationConfig.class})
public class PromotionDaoTest {
	
	@Autowired
	PromotionDao promotionDao;

	@Test
    public void execute() throws Exception{
		assertNotNull("getPromotions() should be not null", promotionDao.getPromotions());
	}
}
