package com.dummyShop.dummyShop.configuration;

import com.dummyShop.dummyShop.middleware.JWTAuthenticationMiddleware;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private JWTAuthenticationMiddleware jwtAuthenticationMiddleware;

    @Autowired
    private UserDetailsService userDetailsService;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception{
        return httpSecurity
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(authorize -> {
                            // authentication
                            authorize
                                    .requestMatchers(HttpMethod.POST,"/api/auth/**").permitAll();

                            // seller
                            // - prroduct
                            authorize
                                    .requestMatchers(HttpMethod.POST,"/api/product").hasRole("SELLER")
                                    .requestMatchers(HttpMethod.PUT,"/api/product/**").hasRole("SELLER")
                                    .requestMatchers(HttpMethod.DELETE,"/api/product/**").hasRole("SELLER");

                            // buyer
                            // - cart
                            authorize
                                    .requestMatchers(HttpMethod.POST,"/api/cart").hasRole("BUYER")
                                    .requestMatchers(HttpMethod.PUT,"/api/cart/**").hasRole("BUYER")
                                    .requestMatchers(HttpMethod.DELETE,"/api/cart/**").hasRole("BUYER");

                            // - review
                            authorize
                                    .requestMatchers(HttpMethod.POST,"/api/review").hasRole("BUYER");

                            // public
                            authorize
                                    .requestMatchers(HttpMethod.GET,"/api/product","/api/product/**").permitAll()
                                    .requestMatchers("/error").permitAll();

                            // fallback for other request
                            authorize
                                    .anyRequest().authenticated();

                        }
                )
                .httpBasic(AbstractHttpConfigurer::disable)
                .formLogin(AbstractHttpConfigurer::disable)
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .addFilterBefore(jwtAuthenticationMiddleware,UsernamePasswordAuthenticationFilter.class)
                .build();
    }
}
