package com.hoaxify.ws.user;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

	//@Autowired yerine constructor injection ile nesne oluşturulur.
	UserRepository userRepository;
	
	PasswordEncoder passwordEncoder;
	
	//@Autowired --> Birden fazla constructor olmadığı için Autowired'a gerek yok
	public UserService(UserRepository userRepository) {
		this.userRepository = userRepository;
		this.passwordEncoder = new BCryptPasswordEncoder();
	}

	public void save(User user) {
		user.setPassword(this.passwordEncoder.encode(user.getPassword()));
		userRepository.save(user);
	}
}
