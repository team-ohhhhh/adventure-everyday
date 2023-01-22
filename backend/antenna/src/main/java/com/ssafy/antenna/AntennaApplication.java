package com.ssafy.antenna;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class AntennaApplication {

	public static void main(String[] args) {
		SpringApplication.run(AntennaApplication.class, args);
	}

}
