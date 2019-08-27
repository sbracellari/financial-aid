package edu.oakland.financialaid.model;

import java.sql.Timestamp;

import org.springframework.jdbc.core.RowMapper;

public class Term {
  private String description;
  private String code;
  private Timestamp start;
  private Timestamp end;
  private boolean current;

  public Term() {}

  public Term(String description, String code, Timestamp start, Timestamp end, boolean current) {
    this.description = description;
    this.code = code;
    this.start = start;
    this.end = end;
    this.current = current;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String value) {
    this.description = value;
  }

  public String getCode() {
    return code;
  }

  public void setCode(String value) {
    this.code = value;
  }

  public Timestamp getStart() {
    return start;
  }

  public void setStart(Timestamp value) {
    this.start = value;
  }

  public Timestamp getEnd() {
    return end;
  }

  public void setEnd(Timestamp value) {
    this.end = value;
  }

  public boolean isCurrent() {
    return current;
  }

  public void setCurrent(Boolean value) {
    this.current = value;
  }

  public String toString() {
    return "TERM("
        + "\n\tTerm Description:"
        + getDescription()
        + "\n\tTerm Code:"
        + getCode()
        + "\n\tStart Date:"
        + getStart().toString()
        + "\n\tEnd Date:"
        + getEnd().toString()
        + "\n\tCurrent Term:"
        + isCurrent()
        + "\n)";
  }

  public String toString(int depth) {
    String outerPrepend = "\n";
    String innerPrepend = "\n\t";
    for (int i = 0; i < depth - 1; i++) {
      outerPrepend += "\t";
      innerPrepend += "\t";
    }
    return outerPrepend
        + "TERM("
        + innerPrepend
        + "Term Description:"
        + getDescription()
        + innerPrepend
        + "Term Code:"
        + getCode()
        + innerPrepend
        + "Start Date:"
        + getStart().toString()
        + innerPrepend
        + "End Date:"
        + getEnd().toString()
        + innerPrepend
        + "Current Term:"
        + isCurrent()
        + outerPrepend
        + ")";
  }

  public static RowMapper<Term> termMapper =
      (rs, rowNum) -> {
        Term term =
            new Term(
                rs.getString("description"),
                rs.getString("code"),
                rs.getTimestamp("state_date"),
                rs.getTimestamp("end_date"),
                rs.getBoolean("is_current_term"));

        return term;
      };
}
