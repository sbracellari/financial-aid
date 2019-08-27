package edu.oakland.financialaid.service;

import edu.oakland.financialaid.dao.Constants;
import edu.oakland.financialaid.model.Award;
import edu.oakland.financialaid.model.Hold;
import edu.oakland.financialaid.model.Term;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

@Service
public class FinancialAidDB {
  @Autowired private JdbcTemplate jdbcTemplate;

  protected final Logger logger = LoggerFactory.getLogger("financialaid");

  public List<Term> getTerms(String pidm) throws DataAccessException {
    List<Term> terms =
        jdbcTemplate.query(
            "select code, description, state_date, end_date, is_current_term from table",
            new Object[] {pidm},
            Term.termMapper);
    Collections.reverse(terms);
    return terms;
  }

  public List<String> getMessagesForTerm(String pidm, Term term) {
    try {
      return this.jdbcTemplate.queryForList(
          Constants.ADVISOR_MSG_SQL, new Object[] {pidm, term.getCode()}, String.class);
    } catch (Exception e) {
      logger.error("", e);
    }
    return new ArrayList<String>();
  }

  public List<Award> getAwards(String pidm, String termCode) {
    try {
      return this.jdbcTemplate.query(
          Constants.AWARDS_SQL, new Object[] {termCode, pidm}, Award.awardMapper);
    } catch (Exception e) {
      logger.error("", e);
    }
    return new ArrayList<Award>();
  }

  public List<Hold> getHolds(String pidm, String termCode) {
    try {
      return this.jdbcTemplate.query(
          Constants.HOLDS_SQL, new Object[] {pidm, termCode}, Hold.holdMapper);
    } catch (Exception e) {
      logger.error("", e);
    }
    return new ArrayList<Hold>();
  }

  public String getProgress(String pidm, String termCode) {
    try {
      return this.jdbcTemplate.queryForObject(
          Constants.PROGRESS_SQL, new Object[] {termCode, pidm}, String.class);
    } catch (DataAccessException e) {
      logger.error("", e);
    }
    return "Your status has not been reviewed yet.";
  }

  public Map<String, Object> generateMap(String pidm, String termCode, Term current) {
    Map<String, Object> map = new HashMap<>();
    map.put("terms", getTerms(pidm));
    map.put("messages", getMessagesForTerm(pidm, current));
    map.put("awards", getAwards(pidm, termCode));
    map.put("holds", getHolds(pidm, termCode));
    map.put("progress", getProgress(pidm, termCode));

    return map;
  }

  public Map<String, Object> generateInfoMap(String pidm, String termCode, Term current) {
    Map<String, Object> map = new HashMap<>();
    map.put("messages", getMessagesForTerm(pidm, current));
    map.put("awards", getAwards(pidm, termCode));
    map.put("holds", getHolds(pidm, termCode));
    map.put("progress", getProgress(pidm, termCode));

    return map;
  }
}
