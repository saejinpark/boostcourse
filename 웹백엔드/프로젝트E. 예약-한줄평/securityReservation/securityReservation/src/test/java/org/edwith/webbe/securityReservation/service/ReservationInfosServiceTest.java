package org.edwith.webbe.securityReservation.service;

import static org.junit.Assert.assertNotNull;

import org.edwith.webbe.securityReservation.config.ApplicationConfig;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = { ApplicationConfig.class })
public class ReservationInfosServiceTest {

	
	@Autowired
	private ReservationInfosService reservationInfosService;
	
	@Test
    public void execute() throws Exception{
		assertNotNull("getReservationInfos() should be not null", reservationInfosService.getReservationInfos(1));
    }
}
