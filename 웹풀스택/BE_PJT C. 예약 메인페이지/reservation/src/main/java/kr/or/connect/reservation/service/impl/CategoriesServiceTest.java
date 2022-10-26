package kr.or.connect.reservation.service.impl;

import static org.junit.Assert.assertNotNull;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import kr.or.connect.reservation.config.ApplicationConfig;
import kr.or.connect.reservation.service.CategoriesService;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = { ApplicationConfig.class })
public class CategoriesServiceTest {

	@Autowired
	private CategoriesService categoriesService;

	@Test
	public void execute() throws Exception {
		assertNotNull("getCategories() should be not null", categoriesService.getCategories());
	}
}
