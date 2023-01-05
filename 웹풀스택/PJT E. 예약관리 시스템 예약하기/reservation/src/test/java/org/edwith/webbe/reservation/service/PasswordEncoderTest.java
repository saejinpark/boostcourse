package org.edwith.webbe.reservation.service;

import org.edwith.webbe.reservation.config.ApplicationConfig;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import lombok.RequiredArgsConstructor;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {ApplicationConfig.class})
@RequiredArgsConstructor
public class PasswordEncoderTest {
    private PasswordEncoder passwordEncoder;

    @Test
    public void passwordEncode() throws Exception{
        System.out.println(passwordEncoder.encode("1234"));
    }
    
    @Test
    public void passwordTest() throws Exception{
    	String encodePasswd = "$2a$10$USbExG2YOZJqu5rR9eWAqO3NqwjS6c8uI0c695cnURA2gxqRnx41O";
    	String password = "1234";
    	boolean test = passwordEncoder.matches(password, encodePasswd);
    	System.out.println(test);
    }

}