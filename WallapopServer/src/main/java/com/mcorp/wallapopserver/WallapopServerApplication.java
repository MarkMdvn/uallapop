package com.mcorp.wallapopserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class WallapopServerApplication {

  public static void main(String[] args) {
    SpringApplication.run(WallapopServerApplication.class, args);
  }

}
