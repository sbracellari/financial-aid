package edu.oakland.financialaid.model;

import lombok.Data;
import org.springframework.jdbc.core.RowMapper;

@Data
public class Award {

  private String status;
  private String fund;
  private String offer;
  private String paid;

  public Award() {}

  public Award(String status, String fund, String offer, String paid) {
    this.status = status;
    this.fund = fund;
    this.offer = offer;
    this.paid = paid;
  }

  public static RowMapper<Award> awardMapper =
      (rs, rowNum) -> {
        Award award =
            new Award(
                rs.getString("status"),
                rs.getString("fund"),
                rs.getString("offer"),
                rs.getString("paid"));

        return award;
      };
}
