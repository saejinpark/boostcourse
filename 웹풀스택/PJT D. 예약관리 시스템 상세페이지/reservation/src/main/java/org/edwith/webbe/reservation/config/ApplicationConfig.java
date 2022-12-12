package org.edwith.webbe.reservation.config;
import javax.sql.DataSource;

import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.TransactionManagementConfigurer;

@Configuration
@ComponentScan(basePackages = {"org.edwith.webbe.reservation.dao", "org.edwith.webbe.reservation.service"})
@EnableTransactionManagement
@PropertySource("classpath:application.properties")
public class ApplicationConfig implements TransactionManagementConfigurer {

	@Value("${spring.datasource.driver-class-name}")
	private String driverClassName;

	@Value("${spring.datasource.url}")
	private String url;

	@Value("${spring.datasource.username}")
	private String username;

	@Value("${spring.datasource.password}")
	private String password;
    
    @Bean
    public DataSource dataSource() {
    	BasicDataSource dataSource = new BasicDataSource();
    	dataSource.setDriverClassName(driverClassName);
    	dataSource.setUrl(url);
    	dataSource.setUsername(username);
    	dataSource.setPassword(password);
    	
    	return dataSource;
    }
    
    @Bean
    public PlatformTransactionManager transactionManager() {
    	return new DataSourceTransactionManager(dataSource());
    }
    
	@Override
	public TransactionManager annotationDrivenTransactionManager() {
		return transactionManager();
	}

}
