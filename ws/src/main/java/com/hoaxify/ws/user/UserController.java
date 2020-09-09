package com.hoaxify.ws.user;

import java.util.HashMap;
import java.util.Map;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.hoaxify.ws.error.ApiError;
import com.hoaxify.ws.shared.GenericResponse;

@RestController
public class UserController {

	@Autowired
	UserService userService;
	
	@PostMapping("/api/1.0/users")// @Valid ile Hibernate kısıtlamaları kontrol eder
	public GenericResponse createUser(@Valid @RequestBody User user) { // gelen json objesi User'a map edilir
	
		userService.save(user);
		return new GenericResponse("User Created"); // response da JSON'a çevrilir
	}
	
	@ExceptionHandler(MethodArgumentNotValidException.class) // Bu exception atılırsa bu metodu çalıştır
	@ResponseStatus(HttpStatus.BAD_REQUEST) // Bu olmazsa default olarak 200 OK döner
	public ApiError handleValidationException(MethodArgumentNotValidException exception) {
		
		ApiError error = new ApiError(400, "Validation Error", "/api/1.0/users");
		Map<String, String> validationErrors = new HashMap<String, String>();
		
		for(FieldError fieldError: exception.getBindingResult().getFieldErrors()) {
			validationErrors.put(fieldError.getField(), fieldError.getDefaultMessage());
		}
		
		error.setValidationErrors(validationErrors);
		return error;
	}
}
