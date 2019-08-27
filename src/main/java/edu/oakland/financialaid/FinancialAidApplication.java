package edu.oakland.financialaid;

import org.apereo.portal.soffit.renderer.SoffitApplication;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SoffitApplication
@SpringBootApplication
@ComponentScan({"edu.oakland.soffit.auth", "edu.oakland.financialaid"})
public class FinancialAidApplication {

  public static void main(String[] args) {
    SpringApplication.run(FinancialAidApplication.class, args);
  }
}
