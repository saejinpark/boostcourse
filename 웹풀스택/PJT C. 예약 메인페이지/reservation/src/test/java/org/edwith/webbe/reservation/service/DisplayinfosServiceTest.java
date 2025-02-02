package org.edwith.webbe.reservation.service;

import static org.junit.Assert.assertNotNull;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import org.edwith.webbe.reservation.config.ApplicationConfig;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = { ApplicationConfig.class })
public class DisplayinfosServiceTest {
	
	@Autowired
	private DisplayinfosService displayinfosService;
	
	@Test
	public void execute() throws Exception {
		assertNotNull("getDisplayinfos( 1, 1 ) should be not null", displayinfosService.getDisplayinfos(1, 1));
		assertNotNull("getDisplayinfosById( 1 ) should be not null", displayinfosService.getDisplayinfosById(1));
	}
}
