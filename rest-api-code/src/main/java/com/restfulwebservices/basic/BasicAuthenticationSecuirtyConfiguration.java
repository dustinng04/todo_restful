package com.restfulwebservices.basic;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class BasicAuthenticationSecuirtyConfiguration {
	// Filter chain
//	Authenticate all requests -> Basic authen
//	Disable CSRF -> stateless
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//				.requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
		http.authorizeHttpRequests(auth -> 
			auth.antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
				.anyRequest().authenticated());
		
		http.httpBasic(Customizer.withDefaults());
		
		http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
		
		http.csrf().disable();
		
		return http.build();
	}
}
