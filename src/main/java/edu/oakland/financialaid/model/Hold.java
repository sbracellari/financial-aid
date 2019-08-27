package edu.oakland.financialaid.model;

import lombok.Data;
import org.springframework.jdbc.core.RowMapper;

@Data
public class Hold {

  private String requirement;
  private String url;

  public Hold() {}

  public Hold(String requirement, String url) {
    this.requirement = requirement;
    this.url = url;
  }

  public static RowMapper<Hold> holdMapper =
      (rs, rowNum) -> {
        Hold hold = new Hold(rs.getString("req"), rs.getString("url"));

        return hold;
      };
}
