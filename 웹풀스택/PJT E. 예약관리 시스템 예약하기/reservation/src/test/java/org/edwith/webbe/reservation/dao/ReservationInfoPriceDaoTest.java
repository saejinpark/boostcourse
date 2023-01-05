package org.edwith.webbe.reservation.dao;


import static org.junit.Assert.assertNotNull;

import org.edwith.webbe.reservation.config.ApplicationConfig;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import lombok.RequiredArgsConstructor;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {ApplicationConfig.class})
@RequiredArgsConstructor
public class ReservationInfoPriceDaoTest {
	private final ReservationInfoPriceDao reservationInfoPriceDao;

	@Test
    public void execute() throws Exception{
		assertNotNull("getPromotions() should be not null", reservationInfoPriceDao.selectByReservationInfoId(1));
	}
}
