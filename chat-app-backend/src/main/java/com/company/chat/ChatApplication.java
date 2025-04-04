package com.company.chat;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

@SpringBootApplication
public class ChatApplication {
	private static final Logger logger = LoggerFactory.getLogger(ChatApplication.class);

	public static void main(String[] args) {
		loadEnvVariables();
		SpringApplication.run(ChatApplication.class, args);
	}

	private static void loadEnvVariables() {
		Properties env = new Properties();
		try (FileInputStream fis = new FileInputStream(".env")) {
			env.load(fis);
			env.forEach((key, value) -> System.setProperty(key.toString(), value.toString()));
			logger.info(".env file loaded successfully.");
		} catch (IOException e) {
			logger.error("Failed to load .env file: {}", e.getMessage());
		}
	}
}
