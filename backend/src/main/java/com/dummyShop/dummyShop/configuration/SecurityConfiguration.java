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
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    @Autowired
    private JWTAuthenticationMiddleware jwtAuthenticationMiddleware;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception{
        return httpSecurity
                .csrf(AbstractHttpConfigurer::disable)
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
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
                                    .requestMatchers(HttpMethod.GET,"/api/user/top-sellers").permitAll()
                                    .requestMatchers(HttpMethod.GET,"/product/**").permitAll()
                                    .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
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

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOriginPatterns(List.of("http://localhost:7000","http://192.168.1.100:7000"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);
        config.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config); // Apply to all paths
        return source;
    }
}

