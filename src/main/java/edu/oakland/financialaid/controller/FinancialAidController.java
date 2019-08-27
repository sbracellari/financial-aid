package edu.oakland.financialaid.controller;

import edu.oakland.financialaid.model.Award;
import edu.oakland.financialaid.model.Hold;
import edu.oakland.financialaid.model.Term;
import edu.oakland.financialaid.service.FinancialAidDB;
import edu.oakland.soffit.auth.AuthService;
import edu.oakland.soffit.auth.SoffitAuthException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import javax.servlet.http.HttpServletRequest;

import com.auth0.jwt.exceptions.JWTVerificationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1")
public class FinancialAidController {

  protected final Logger log = LoggerFactory.getLogger("financialaid");

  @Autowired private FinancialAidDB financialAidDB;
  @Autowired private AuthService authorizer;

  @ResponseStatus(value = HttpStatus.UNAUTHORIZED, reason = "Invalid JWT")
  @ExceptionHandler(JWTVerificationException.class)
  public void verificationError(Exception e) {
    log.error("Throwing Invalid JWT Error");
    log.error("", e);
  }

  @ResponseStatus(value = HttpStatus.BAD_REQUEST, reason = "Illegal Arguments given")
  @ExceptionHandler({IllegalArgumentException.class, DataAccessException.class})
  public void illegalArgumentError(Exception e) {
    log.error("Throwing Illegal Argument or Data Access error");
    log.error("", e);
  }

  @ResponseStatus(value = HttpStatus.UNAUTHORIZED, reason = "Invalid JWT")
  @ExceptionHandler(SoffitAuthException.class)
  public void soffitError(SoffitAuthException e) {
    log.error("Invalid JWT");
    log.error("", e);
  }

  @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR, reason = "Unspecified exception")
  @ExceptionHandler(Exception.class)
  public void generalError(Exception e) {
    log.error("Unspecified exception");
    log.error("", e);
  }

  @GetMapping("status-check")
  public boolean statusCheck() {
    return true;
  }

  @GetMapping("terms-messages")
  @ResponseStatus(HttpStatus.OK)
  public Map<String, Object> termsAndMessages(HttpServletRequest request)
      throws SoffitAuthException {
    String pidm = authorizer.getClaimFromJWE(request, "pidm").asString();

    Map<String, Object> termsAndMessages = new HashMap<>();
    List<Term> terms = financialAidDB.getTerms(pidm);
    Term current = terms.get(0);
    for (Term t : terms) {
      if (t.isCurrent()) {
        current = t;
        break;
      }
    }

    termsAndMessages.put("terms", terms);
    termsAndMessages.put("messages", financialAidDB.getMessagesForTerm(pidm, current));
    return termsAndMessages;
  }

  @GetMapping("awards")
  @ResponseStatus(HttpStatus.OK)
  public Map<String, List<Award>> awards(
      @RequestParam(required = true) String termCode, HttpServletRequest request)
      throws SoffitAuthException {
    String pidm = authorizer.getClaimFromJWE(request, "pidm").asString();
    Map<String, List<Award>> awards = new HashMap<>();

    if (Objects.equals(termCode, null)) {
      throw new NullPointerException();
    }

    awards.put("awards", financialAidDB.getAwards(pidm, termCode));
    return awards;
  }

  @GetMapping("holds")
  @ResponseStatus(HttpStatus.OK)
  public Map<String, List<Hold>> holds(
      @RequestParam(required = true) String termCode, HttpServletRequest request)
      throws SoffitAuthException {
    String pidm = authorizer.getClaimFromJWE(request, "pidm").asString();
    Map<String, List<Hold>> holds = new HashMap<>();

    if (Objects.equals(termCode, null)) {
      throw new NullPointerException();
    }

    holds.put("holds", financialAidDB.getHolds(pidm, termCode));
    return holds;
  }

  @GetMapping("progress")
  @ResponseStatus(value = HttpStatus.OK)
  public Map<String, String> progress(
      @RequestParam(required = true) String termCode, HttpServletRequest request)
      throws SoffitAuthException {
    String pidm = authorizer.getClaimFromJWE(request, "pidm").asString();

    Map<String, String> progress = new HashMap<>();

    if (Objects.equals(termCode, null)) {
      throw new NullPointerException();
    }

    progress.put("progress", financialAidDB.getProgress(pidm, termCode));
    return progress;
  }

  @GetMapping("financial-info")
  @ResponseStatus(HttpStatus.OK)
  public Map<String, Object> getFinaid(HttpServletRequest request) throws SoffitAuthException {
    String pidm = authorizer.getClaimFromJWE(request, "pidm").asString();
    List<Term> terms = financialAidDB.getTerms(pidm);

    Term current = terms.get(0);
    for (Term t : terms) {
      if (t.isCurrent()) {
        current = t;
        break;
      }
    }
    return financialAidDB.generateMap(pidm, current.getCode(), current);
  }

  @GetMapping("current-term")
  @ResponseStatus(HttpStatus.OK)
  public Map<String, Object> getTerm(
      @RequestParam(required = true) String termCode, HttpServletRequest request)
      throws SoffitAuthException {
    String pidm = authorizer.getClaimFromJWE(request, "pidm").asString();
    List<Term> terms = financialAidDB.getTerms(pidm);

    Term current = terms.get(0);
    for (Term t : terms) {
      if (t.isCurrent()) {
        current = t;
        break;
      }
    }

    return financialAidDB.generateInfoMap(pidm, termCode, current);
  }
}
