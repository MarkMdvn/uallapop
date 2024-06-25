package com.mcorp.wallapopserver.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

  @Override
  public void addResourceHandlers(ResourceHandlerRegistry registry) {
    // Serve all subdirectories under ProductImages
    registry.addResourceHandler("/images/**")
        .addResourceLocations(
            "file:///D:/Development/Fullstack_Projects/Wallapop2/WallapopAssets/ProductImages/");
  }
}