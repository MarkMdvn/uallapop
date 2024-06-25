package com.mcorp.wallapopserver.security;

import java.util.Arrays;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@Configuration
@EnableWebMvc
public class CorsConfig {

  private static final Long MAX_AGE = 3600L; // 1 hour
  private static final int CORS_FILTER_ORDER = -102;

  @Bean
  public FilterRegistrationBean<CorsFilter> corsFilter() {
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    CorsConfiguration config = new CorsConfiguration();
    config.setAllowCredentials(true);

    // Allowing multiple specific origins or all for development
    config.setAllowedOrigins(Arrays.asList(
        "http://localhost:3000", // React development server
        "http://localhost:5173"  // Another possible frontend server
    ));
    // To allow all origins (not recommended for production):
    // config.setAllowedOrigins(Arrays.asList("*"));

    // Set allowed methods for CORS
    config.setAllowedMethods(Arrays.asList(
        "GET", "POST", "PUT", "DELETE", "OPTIONS"
    ));

    // Allowing all headers for simplification in development
    config.setAllowedHeaders(Arrays.asList("*"));

    // Optional: Expose specific headers
    config.setExposedHeaders(Arrays.asList(
        "Authorization", "Content-Type", "Accept"
    ));

    config.setMaxAge(MAX_AGE);
    source.registerCorsConfiguration("/**", config);

    FilterRegistrationBean<CorsFilter> bean = new FilterRegistrationBean<>(new CorsFilter(source));
    bean.setOrder(CORS_FILTER_ORDER);
    return bean;
  }
}
