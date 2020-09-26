package com.hoaxify.ws.configuration;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import lombok.Data;

@Data
@Configuration
@ConfigurationProperties(prefix = "hoaxify") // properties dosyası için auto completion sağlar
public class AppConfiguration {

	private String uploadPath;
}
