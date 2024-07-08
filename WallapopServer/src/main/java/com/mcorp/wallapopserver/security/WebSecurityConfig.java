package com.mcorp.wallapopserver.security;

import com.mcorp.wallapopserver.security.jwt.JwtAuthenticationFilter;
import com.mcorp.wallapopserver.security.jwt.JwtAuthEntryPoint;
import com.mcorp.wallapopserver.security.user.WallapopUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@Configuration
@RequiredArgsConstructor
@EnableMethodSecurity(securedEnabled = true, jsr250Enabled = true, prePostEnabled = true)
public class WebSecurityConfig implements WebMvcConfigurer {

  private final WallapopUserDetailsService userDetailsService;
  private final JwtAuthEntryPoint jwtAuthEntryPoint;

  @Bean
  public JwtAuthenticationFilter authenticationTokenFilter() {
    return new JwtAuthenticationFilter();
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  public DaoAuthenticationProvider authenticationProvider() {
    var authProvider = new DaoAuthenticationProvider();
    authProvider.setUserDetailsService(userDetailsService);
    authProvider.setPasswordEncoder(passwordEncoder());
    return authProvider;
  }

  @Bean
  public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig)
      throws Exception {
    return authConfig.getAuthenticationManager();
  }

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http.csrf(AbstractHttpConfigurer::disable)
        .exceptionHandling(exception -> exception.authenticationEntryPoint(jwtAuthEntryPoint))
        .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/auth/**").permitAll()  // Public endpoints like login, register
            .requestMatchers(HttpMethod.GET, "/api/products/**", "api/users/**").permitAll()
            .requestMatchers("/images/**").permitAll()  // Allow public access to images
            .requestMatchers("/api/products/create-product", "/api/products/edit-product/**", "/api/products/delete-product/**").authenticated()  // Secured endpoints
            .anyRequest().authenticated())  // All other requests need authentication
        .authenticationProvider(authenticationProvider())
        .addFilterBefore(authenticationTokenFilter(), UsernamePasswordAuthenticationFilter.class);

    return http.build();
  }


  // File storage configuration
  @Override
  public void addResourceHandlers(ResourceHandlerRegistry registry) {
    registry.addResourceHandler("/images/**").addResourceLocations(
        "file:///D:/Development/Fullstack_Projects/Wallapop2/WallapopAssets/ProductImages/");
  }
}