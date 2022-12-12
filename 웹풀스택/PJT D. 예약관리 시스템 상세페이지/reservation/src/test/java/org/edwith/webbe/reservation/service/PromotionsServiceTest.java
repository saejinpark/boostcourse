package org.edwith.webbe.reservation.service;

import static org.junit.Assert.assertNotNull;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import lombok.RequiredArgsConstructor;

import org.edwith.webbe.reservation.config.ApplicationConfig;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = { ApplicationConfig.class })
@RequiredArgsConstructor
public class PromotionsServiceTest {
	private final PromotionsService promotionsService;
	
	@Test
    public void execute() throws Exception{
		assertNotNull("getPromotions() should be not null", promotionsService.getPromotions());
    }
}
