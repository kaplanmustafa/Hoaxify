package com.hoaxify.ws;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.hoaxify.ws.user.User;
import com.hoaxify.ws.user.UserService;

@SpringBootApplication
public class WsApplication {

	public static void main(String[] args) {
		SpringApplication.run(WsApplication.class, args);
	}

	@Bean
	CommandLineRunner createInitialUsers(final UserService userService) {
		return new CommandLineRunner() {
			public void run(String... args) throws Exception {
					
					User user = new User();
					user.setUsername("user1");
					user.setDisplayName("display1");
					user.setPassword("P4ssword");
					
					userService.save(user);
					
				}
		};
		
	}
}
