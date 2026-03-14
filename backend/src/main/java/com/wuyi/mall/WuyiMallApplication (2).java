package com.wuyi.mall;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.wuyi.mall.mapper")
public class WuyiMallApplication {

	public static void main(String[] args) {
		SpringApplication.run(WuyiMallApplication.class, args);
	}

}
