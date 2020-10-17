package com.hoaxify.ws.user;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long>{//Long--> id tipi
	
	User findByUsername(String username); // Spring Data kendisi işlemi yapıyor
	
	Page<User> findByUsernameNot(String username, Pageable page);
	
	@Transactional
	void deleteByUsername(String username);
}
