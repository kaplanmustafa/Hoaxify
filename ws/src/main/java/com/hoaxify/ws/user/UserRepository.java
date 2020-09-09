package com.hoaxify.ws.user;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long>{//Long--> id tipi
	
	User findByUsername(String username); // Spring Data kendisi işlemi yapıyor
}
