package com.hoaxify.ws.shared;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor // parametre alan constructor
public class GenericResponse {
	
	private String message;
}
