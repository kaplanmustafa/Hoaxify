package com.hoaxify.ws.auth;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.hoaxify.ws.user.User;

import lombok.Data;

@Entity
@Data
public class Token {

	@Id
	private String token;
	
	@ManyToOne // 1 user 1'den fazla client'da login olabilir
	private User user;
}
