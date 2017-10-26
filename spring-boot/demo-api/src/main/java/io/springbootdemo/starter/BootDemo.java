package io.springbootdemo.starter;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

import io.springbootdemo.starter.hello.HelloController;
import io.springbootdemo.topic.TopicController;

@SpringBootApplication
@ComponentScan(basePackageClasses = TopicController.class)
@ComponentScan(basePackageClasses = HelloController.class)
public class BootDemo {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
		SpringApplication.run(BootDemo.class, args);

	}

}
