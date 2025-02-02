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
public class CategoriesServiceTest {
	private final CategoriesService categoriesService;

	@Test
	public void execute() throws Exception {
		assertNotNull("getCategories() should be not null", categoriesService.getCategories());
	}
}
