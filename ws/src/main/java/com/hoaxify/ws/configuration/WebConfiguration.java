package com.hoaxify.ws.configuration;

import java.io.File;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.CacheControl;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfiguration implements WebMvcConfigurer{
	
	@Autowired
	AppConfiguration appConfiguration;
	
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		
		// http://localhost:4000/images/ ile başlayan isteklerde devreye girer
		registry.addResourceHandler("/images/**")
		.addResourceLocations("file:./" + appConfiguration.getUploadPath() + "/") // Gelen isteği burada arar ve serve eder
		.setCacheControl(CacheControl.maxAge(365, TimeUnit.DAYS)); // Bu fotoğraf 365 gün boyunca browser'da cachlensin
	}
	
	@Bean
	CommandLineRunner createStorageDirectories() {
		return(args) -> {
			createFolder(appConfiguration.getUploadPath());
			createFolder(appConfiguration.getProfileStoragePath());
			createFolder(appConfiguration.getAttachmentStoragePath());
		};
	}

	private void createFolder(String path) {
		File folder = new File(path);
		
		boolean folderExist = folder.exists() && folder.isDirectory();
		
		if(!folderExist) {
			folder.mkdir();
		}
	}
}
