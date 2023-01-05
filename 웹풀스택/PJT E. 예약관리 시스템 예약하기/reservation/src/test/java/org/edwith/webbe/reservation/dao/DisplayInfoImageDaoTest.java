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
public class DisplayInfoImageDaoTest {
	private final DisplayInfoImageDao displayInfoImageDao;
	
	@Test
    public void execute() throws Exception{
		assertNotNull("selectByProductId(1) should be not null", displayInfoImageDao.selectByProductId(1));
	}
}
