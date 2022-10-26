package kr.or.connect.reservation.dao;

import static org.junit.Assert.assertNotNull;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import kr.or.connect.reservation.config.ApplicationConfig;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {ApplicationConfig.class})
public class ProductPriceDaoTest {

	@Autowired
	private ProductPriceDao productPriceDao;

	@Test
    public void execute() throws Exception{
		assertNotNull("selectByProductId(1) should be not null", productPriceDao.selectByProductId(1));
	}
}
