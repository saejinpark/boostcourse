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
public class CommentsServiceTest {
	private final CommentsService commentsService;

	@Test
	public void execute() throws Exception {
		assertNotNull("getComments(1, 1) should be not null", commentsService.getComments(1, 1));
	}
}
