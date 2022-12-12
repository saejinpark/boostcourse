package org.edwith.webbe.reservation.service;

import static org.junit.Assert.assertNotNull;

import org.edwith.webbe.reservation.config.ApplicationConfig;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import lombok.RequiredArgsConstructor;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = { ApplicationConfig.class })
@RequiredArgsConstructor
public class ReservationInfosServiceTest {
	private final ReservationInfosService reservationInfosService;
	
	@Test
    public void execute() throws Exception{
		assertNotNull("getReservationInfos() should be not null", reservationInfosService.getReservationInfos("kimjinsu@connect.co.kr"));
    }
}
