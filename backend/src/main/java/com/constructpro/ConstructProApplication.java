package com.constructpro;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class ConstructProApplication {
    public static void main(String[] args) {
        SpringApplication.run(ConstructProApplication.class, args);
    }
}
