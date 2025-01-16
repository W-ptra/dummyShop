package com.dummyShop.dummyShop.configuration;

import com.dummyShop.dummyShop.middleware.JWTAuthenticationMiddleware;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    @Autowired
    private JWTAuthenticationMiddleware jwtAuthenticationMiddleware;

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
                                    .requestMatchers(HttpMethod.GET,"/api/product/user").hasRole("SELLER")
                                    .requestMatchers(HttpMethod.POST,"/api/product").hasRole("SELLER")
                                    .requestMatchers(HttpMethod.PUT,"/api/product/**").hasRole("SELLER")
                                    .requestMatchers(HttpMethod.DELETE,"/api/product/**").hasRole("SELLER");

                            // buyer
                            // - cart
                            authorize
                                    .requestMatchers(HttpMethod.POST,"/api/cart").hasRole("BUYER")
                                    .requestMatchers(HttpMethod.PUT,"/api/cart/**").hasRole("BUYER")
                                    .requestMatchers(HttpMethod.DELETE,"/api/cart/**").hasRole("BUYER");

                            // - transaction
                            authorize
                                    .requestMatchers(HttpMethod.GET,"/api/transaction").hasRole("BUYER")
                                    .requestMatchers(HttpMethod.POST,"/api/transaction").hasRole("BUYER");

                            // - review
                            authorize
                                    .requestMatchers(HttpMethod.POST,"/api/review").hasRole("BUYER");

                            // public
                            authorize
                                    .requestMatchers(HttpMethod.GET,"/api/product","/api/product/**").permitAll()
                                    .requestMatchers(HttpMethod.GET,"/api/tag").permitAll()
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

//    @Bean
//    public CorsFilter corsFilter() {
//        CorsConfiguration corsConfiguration = new CorsConfiguration();
//        corsConfiguration.addAllowedOrigin("http://localhost:7000/"); // Allow all origins (use specific URLs in production)
//        corsConfiguration.addAllowedHeader("*"); // Allow all headers
//        corsConfiguration.addAllowedMethod("GET"); // Allow all HTTP methods (GET, POST, etc.)
//        corsConfiguration.addAllowedMethod("POST");
//
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", corsConfiguration); // Apply to all endpoints
//
//        return new CorsFilter(source);
//    }
}

