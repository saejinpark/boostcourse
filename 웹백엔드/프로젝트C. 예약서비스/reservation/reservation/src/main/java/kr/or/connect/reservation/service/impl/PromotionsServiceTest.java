package kr.or.connect.reservation.service.impl;

import static org.junit.Assert.assertNotNull;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import kr.or.connect.reservation.config.ApplicationConfig;
import kr.or.connect.reservation.service.PromotionsService;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = { ApplicationConfig.class })
public class PromotionsServiceTest {
	
	@Autowired
	private PromotionsService promotionsService;
	
	@Test
    public void execute() throws Exception{
		assertNotNull("getPromotions() should be not null", promotionsService.getPromotions());
    }
}
