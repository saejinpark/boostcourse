package org.edwith.webbe.reservation.dao;

import static org.junit.Assert.assertNotNull;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import lombok.RequiredArgsConstructor;

import org.edwith.webbe.reservation.config.ApplicationConfig;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {ApplicationConfig.class})
@RequiredArgsConstructor
public class DisplayInfoDaoTest {

	private final DisplayInfoDao displayinfoDao;
	

	@Test
    public void execute() throws Exception{
		assertNotNull("getDisplayinfos(1, 1) should be not null", displayinfoDao.getDisplayInfos(1, 1));
		assertNotNull("getDisplayinfos(1, 1, 1) should be not null", displayinfoDao.getDisplayInfos(1, 1, 1));
		assertNotNull("getDisplayinfos(1) should be not null", displayinfoDao.getDisplayInfos(1));
	}
}
