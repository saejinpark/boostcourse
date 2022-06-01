package org.edwith.webbe.securityReservation.dao;

import static org.junit.Assert.assertNotNull;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.edwith.webbe.securityReservation.config.ApplicationConfig;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {ApplicationConfig.class})
public class DisplayinfoDaoTest {

	@Autowired
	private DisplayinfoDao displayinfoDao;
	

	@Test
    public void execute() throws Exception{
		assertNotNull("getDisplayinfos(1, 1) should be not null", displayinfoDao.getDisplayinfos(1, 1));
		assertNotNull("getDisplayinfos(1, 1, 1) should be not null", displayinfoDao.getDisplayinfos(1, 1, 1));
		assertNotNull("getDisplayinfos(1) should be not null", displayinfoDao.getDisplayinfos(1));
	}
}
