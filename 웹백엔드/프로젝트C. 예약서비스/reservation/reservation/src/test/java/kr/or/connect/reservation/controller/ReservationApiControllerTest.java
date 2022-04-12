package kr.or.connect.reservation.controller;

import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import kr.or.connect.reservation.config.ApplicationConfig;
import kr.or.connect.reservation.config.WebMvcContextConfiguration;
import kr.or.connect.reservation.service.CategoriesService;

@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@ContextConfiguration(classes = {WebMvcContextConfiguration.class, ApplicationConfig.class })
public class ReservationApiControllerTest {

	@InjectMocks
    private ReservationApiController reservationApiController;

	@Mock
	private CategoriesService categoriesService;

    private MockMvc mockMvc;
    
    @Before
    public void createController() {
        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(reservationApiController).build();
    }
    
    @Test
    public void TestCategories() throws Exception{
        RequestBuilder reqBuilder = MockMvcRequestBuilders.get("/api/categories").contentType(MediaType.APPLICATION_JSON);
        mockMvc.perform(reqBuilder).andExpect(status().isOk()).andDo(print());
    }

    @Test
    public void TestDisplayinfos() throws Exception{
        RequestBuilder reqBuilder1 = MockMvcRequestBuilders.get("/api/displayinfos").contentType(MediaType.APPLICATION_JSON);
        mockMvc.perform(reqBuilder1).andExpect(status().isOk()).andDo(print());
        RequestBuilder reqBuilder2 = MockMvcRequestBuilders.get("/api/displayinfos/1").contentType(MediaType.APPLICATION_JSON);
        mockMvc.perform(reqBuilder2).andExpect(status().isOk()).andDo(print());
    }
    

    @Test
    public void TestPromotions() throws Exception{
        RequestBuilder reqBuilder = MockMvcRequestBuilders.get("/api/promotions").contentType(MediaType.APPLICATION_JSON);
        mockMvc.perform(reqBuilder).andExpect(status().isOk()).andDo(print());
    }
        

    @Test
    public void TestComments() throws Exception{
        RequestBuilder reqBuilder = MockMvcRequestBuilders.get("/api/comments").contentType(MediaType.APPLICATION_JSON);
        mockMvc.perform(reqBuilder).andExpect(status().isOk()).andDo(print());
    }

}
