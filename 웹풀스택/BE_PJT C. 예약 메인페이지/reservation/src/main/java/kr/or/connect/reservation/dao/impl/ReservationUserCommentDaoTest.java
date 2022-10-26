package kr.or.connect.reservation.dao.impl;

import static org.junit.Assert.assertNotNull;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import kr.or.connect.reservation.config.ApplicationConfig;
import kr.or.connect.reservation.dao.ReservationUserCommentDao;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {ApplicationConfig.class})
public class ReservationUserCommentDaoTest {

	@Autowired
	ReservationUserCommentDao reservationUserCommentDao;

	@Test
    public void execute() throws Exception{
		assertNotNull("getComments(1, 1) should be not null", reservationUserCommentDao.getComments(1, 1));
		assertNotNull("getComments(1, 1, 1) should be not null", reservationUserCommentDao.getComments(1, 1, 1));
		assertNotNull("selectAvgScoreByProductId(1) should be not null", reservationUserCommentDao.selectAvgScoreByProductId(1));
		assertNotNull("selectCountAll() should be not null", reservationUserCommentDao.selectCountAll());
		assertNotNull("selectCountProductId(1) should be not null", reservationUserCommentDao.selectCountProductId(1));
	}
}
