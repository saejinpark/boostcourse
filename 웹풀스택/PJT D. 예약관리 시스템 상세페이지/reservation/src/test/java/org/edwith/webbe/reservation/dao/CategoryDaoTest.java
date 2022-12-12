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
public class CategoryDaoTest {
	private final CategoryDao categoryDao;
	
	@Test
    public void execute() throws Exception{
		assertNotNull("getCountAll() should be not null", categoryDao.getCountAll());
		assertNotNull("getCountById(1) should be not null", categoryDao.getCountById(1));
		assertNotNull("getCategories() should be not null", categoryDao.getCategories());
	}
}
