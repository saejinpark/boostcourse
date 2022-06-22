package org.edwith.webbe.securityReservation.config;

import org.edwith.webbe.securityReservation.service.security.CustomUserDetailsService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    private final CustomUserDetailsService customUserDetailsService;

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers(
                "/webjars/**");
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(customUserDetailsService);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .authorizeRequests()
                .antMatchers(
                        "/", 
                        "/main", 
                        "/user/joinform", 
                        "/user/join", 
                        "/user/welcome",
                        "/user/loginerror",
                        "/api/**",
                        "/swagger",
                        "/swagger-ui.html",
                        "/api/v2/**",
                        "/swagger/**",
                        "/v2/api-docs",
                        "/swagger-resources/**"
                		)
                .permitAll()
                .antMatchers(HttpMethod.GET, "/api/comments")
                .permitAll()
                .antMatchers(
                        "/securepage", 
                        "/user/**",
                        "/api/reservationInfos"
                		)
                .hasRole("USER")
                .antMatchers(HttpMethod.POST, "/api/comments")
                .hasRole("USER")
                .anyRequest().authenticated()
                .and()
                    .formLogin()
                    .loginPage("/user/loginform")
                    .usernameParameter("email")
                    .passwordParameter("password")
                    .loginProcessingUrl("/authenticate")
                    .failureForwardUrl("/user/loginerror?login_error=1")
                    .defaultSuccessUrl("/",true)
                    .permitAll()
                .and()
                    .logout()
                    .logoutUrl("/logout")
                    .logoutSuccessUrl("/");
    }

    @Bean
    public PasswordEncoder encoder() {
        return new BCryptPasswordEncoder();
    }
}