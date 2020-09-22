package com.hoaxify.ws.user;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;
import com.hoaxify.ws.shared.GenericResponse;
import com.hoaxify.ws.shared.Views;

@RestController
public class UserController {

	@Autowired
	UserService userService;
	
	@PostMapping("/api/1.0/users")// @Valid ile Hibernate kısıtlamaları kontrol eder
	public GenericResponse createUser(@Valid @RequestBody User user) { // gelen json objesi User'a map edilir
		userService.save(user);
		return new GenericResponse("User Created"); // response da JSON'a çevrilir
	}
	
	@GetMapping("/api/1.0/users")
	//@JsonView(Views.Base.class)
	Page<User> getUsers(Pageable page) {
		return userService.getUsers(page);
	}
}
