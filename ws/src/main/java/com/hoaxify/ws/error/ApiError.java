package com.hoaxify.ws.error;

import java.util.Date;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonView;
import com.hoaxify.ws.shared.Views;

import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL) // Null olmayanları ekle
public class ApiError {
	
	@JsonView(Views.Base.class)
	private int status;
	
	@JsonView(Views.Base.class)
	private String message;
	
	@JsonView(Views.Base.class)
	private String path;
	
	@JsonView(Views.Base.class)
	private long timestamp = new Date().getTime();
	
	private Map<String, String> validationErrors;

	public ApiError(int status, String message, String path) {
		super();
		this.status = status;
		this.message = message;
		this.path = path;
	}
}