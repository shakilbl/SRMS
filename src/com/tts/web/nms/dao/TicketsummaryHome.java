package com.tts.web.nms.dao;
// Generated Jun 1, 2016 3:21:45 PM by Hibernate Tools 5.1.0.Alpha1

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.tts.web.nms.model.Issuesolutioncategorymap;
import com.tts.web.nms.model.Ticketsummary;
import com.tts.web.nms.model.Usergroup;
import com.tts.web.nms.model.Tickethops;

/**
 * Home object for domain model class Ticketsummary.
 * 
 * @see GEN.Ticketsummary
 * @author Hibernate Tools
 */
@Repository
@Transactional
public class TicketsummaryHome {

	private static final Log log = LogFactory.getLog(TicketsummaryHome.class);

	@PersistenceContext
	private EntityManager entityManager;

	@Autowired
	private HttpSession httpSession;
	
	public int persist(Ticketsummary transientInstance) {
		log.debug("persisting Ticketsummary instance");
		try {
			entityManager.persist(transientInstance);
			entityManager.flush();
			int ticketSummaryId = transientInstance.getTicketSummaryId();
			log.debug("persist successful");
			return ticketSummaryId;
		} catch (RuntimeException re) {
			log.error("persist failed", re);
			throw re;
		}
	}

	public void remove(Ticketsummary persistentInstance) {
		log.debug("removing Ticketsummary instance");
		try {
			entityManager.remove(persistentInstance);
			log.debug("remove successful");
		} catch (RuntimeException re) {
			log.error("remove failed", re);
			throw re;
		}
	}

	public Ticketsummary merge(Ticketsummary detachedInstance) {
		log.debug("merging Ticketsummary instance");
		try {
			Ticketsummary result = entityManager.merge(detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	public Ticketsummary findById(Integer id) {
		log.debug("getting Ticketsummary instance with id: " + id);
		try {
			Ticketsummary instance = entityManager.find(Ticketsummary.class, id);
			log.debug("get successful");
			return instance;
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}

	public List<Ticketsummary> findAll() {
		try {
			Query query = entityManager.createQuery("SELECT e FROM Ticketsummary e");
			return query.getResultList();
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}

	public List<Ticketsummary> findByCustomerNumber(String customerNumber) {
		log.debug("getting Ticketsummary instance with number: " + customerNumber);
		try {
			Query query = entityManager.createQuery(
					"SELECT e FROM Ticketsummary e where e.customerNumber=:customerNumber", Ticketsummary.class);
			query.setParameter("customerNumber", customerNumber);
			return (List<Ticketsummary>) query.getResultList();
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}

	public List<Ticketsummary> findBySeverity(String severity) {
		log.debug("getting Ticketsummary instance with severity: " + severity);
		try {
			Query query = entityManager.createQuery("SELECT e FROM Ticketsummary e where e.severity=:severity",
					Ticketsummary.class);
			query.setParameter("severity", severity);
			return (List<Ticketsummary>) query.getResultList();
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}
	/*
	 * public List<Ticketsummary> findBySearch(String ticketNumber,String
	 * severity,String status,String problemComponent ){ log.debug(
	 * "getting Ticketsummary instance with severity: " + problemComponent);
	 * String sev; String tn; String st; String ct;
	 * 
	 * if(ticketNumber.equals("undefined")){ tn=" ";
	 * 
	 * }
	 * 
	 * else if(severity.equals("undefined") && status.equals("undefined") &&
	 * problemComponent.equals("undefined")){ tn="e.ticketNumber=:ticketNumber "
	 * ;
	 * 
	 * }
	 * 
	 * 
	 * 
	 * else { tn="e.ticketNumber=:ticketNumber and";
	 * 
	 * }
	 * 
	 * 
	 * 
	 * if(severity.equals("undefined")){ sev=" ";
	 * 
	 * } else if(status.equals("undefined") &&
	 * problemComponent.equals("undefined")){ sev="e.severity=:severity ";
	 * 
	 * }
	 * 
	 * else{ sev="e.severity=:severity and";
	 * 
	 * }
	 * 
	 * if(status.equals("undefined")){ st=" "; }
	 * 
	 * else if (problemComponent.equals("undefined")){
	 * 
	 * st="e.status=:status "; } else { st="e.status=:status and"; }
	 * 
	 * 
	 * if(problemComponent.equals("undefined")){ ct=" "; }
	 * 
	 * else { ct="e.problemComponent=:problemComponent "; }
	 * 
	 * 
	 * 
	 * 
	 * 
	 * try{ Query query = entityManager.createNativeQuery(
	 * "select ts.TicketNumber,ts.Severity,ug.Name, ts.FaultEscalationtDate,ts.Status, "
	 * +
	 * "th.GroupSLAInHour,concat(isc.Name,'-',iss.Name) as Iscm  from ticketsummary ts join issuesolutioncategorymap "
	 * +
	 * "iscm on iscm.IssueSolutionCategoryMapID = ts.IssueSolutionCategoryMapID"
	 * +
	 * "	join issuesolutioncategory isc on isc.IssueSolutionCategoryID = iscm.IssueSolutionCategoryID	join issuesolution iss "
	 * + "on iss.IssueSolutionID = iscm.IssueSolutionID " +
	 * "join tickethops th on th.TicketSummaryID = ts.TicketSummaryID join usergroup ug on "
	 * + "ug.UserGroupID = th.NextUserGroupID	where " +tn+sev); Query query =
	 * entityManager.createQuery( "SELECT e FROM Ticketsummary e where "+tn+ " "
	 * +sev+ " "+st+ " "+ct,Ticketsummary.class);
	 * 
	 * 
	 * if(!ticketNumber.equals("undefined")) query.setParameter("ticketNumber",
	 * ticketNumber); if(!severity.equals("undefined"))
	 * query.setParameter("severity", severity); if(!status.equals("undefined"))
	 * query.setParameter("status", status);
	 * if(!problemComponent.equals("undefined"))
	 * query.setParameter("problemComponent", problemComponent);
	 * 
	 * 
	 * List<Ticketsummary> ticketSummaryRegurnVal = query.getResultList();
	 * return ticketSummaryRegurnVal;
	 * 
	 * } catch(RuntimeException re){ throw re; }
	 * 
	 * }
	 */

	@SuppressWarnings("unchecked")
	public List<Ticketsummary> findBySearch(String ticketNumber, String issueSolutionCategoryMapId, String severity,
			String status, String componentType, String userGroupId, String faultEscalationDate, String targetDate) {

		log.debug("getting issueSolutionCategoryMapId instance: " + issueSolutionCategoryMapId);

		StringBuffer condtionString = new StringBuffer();

		try {

			if (!ticketNumber.equals("undefined") && !ticketNumber.equals("null")) {
				condtionString.append(" ts.TicketNumber = '" + ticketNumber + "' and ");
			}

			if (!issueSolutionCategoryMapId.equals("undefined") && !issueSolutionCategoryMapId.equals("null")) {
				condtionString.append(" ts.IssueSolutionCategoryMapID = " + issueSolutionCategoryMapId + " and ");
			}

			if (!severity.equals("undefined") && !severity.equals("null")) {
				condtionString.append(" ts.Severity= '" + severity + "' and ");
			}

			if (!status.equals("undefined") && !status.equals("null")) {
				condtionString.append(" ts.Status = '" + status + "' and ");
			}

			if (!componentType.equals("undefined") && !componentType.equals("null")) {
				condtionString.append(" ts.problemComponent = '" + componentType + "' and ");
			}
			
			if (!faultEscalationDate.equals("undefined") && !faultEscalationDate.equals("null")) {
				condtionString.append(" date(ts.faultEscalationtDate) = '" + faultEscalationDate + "' and ");
			}

			if ((!targetDate.equals("undefined") && !targetDate.equals("null")) && (!userGroupId.equals("undefined") && !userGroupId.equals("null"))) {
				String subQuery = "";
				if (status == "Open") {
					subQuery = " ts.TicketNumber IN ( " + "SELECT DISTINCT(th.TicketNumber) FROM tickethops th "
							+ "WHERE date(th.groupSladate)='" + targetDate + "' and th.NextUserGroupID=" + userGroupId + " "
							+ "AND (th.Status='Open' || th.Status='Reopen' || th.Status='RequestForCloser'))";
					condtionString.append(subQuery + " and ");
				} else if (status == "Closed") {
					subQuery = " ts.TicketNumber IN ( " + "SELECT DISTINCT(th.TicketNumber) FROM tickethops th "
							+ "WHERE date(th.groupSladate)='" + targetDate + "' and th.NextUserGroupID=" + userGroupId + " "
							+ "AND (th.Status='Done'))";
					condtionString.append(subQuery + " and ");
				} else {
					subQuery = " ts.TicketNumber IN ( " + "SELECT DISTINCT(th.TicketNumber) FROM tickethops th "
							+ "WHERE date(th.groupSladate)='" + targetDate + "' and th.NextUserGroupID=" + userGroupId + " "
							+ "AND (th.Status='Open' || th.Status='Reopen' || th.Status='Done' "
							+ "|| th.Status='Rollback' || th.Status='RequestForCloser'))";
					condtionString.append(subQuery + " and ");
				}
			}else if (!userGroupId.equals("undefined") && !userGroupId.equals("null")) {
				String subQuery = "";
				if (status == "Open") {
					subQuery = " ts.TicketNumber IN ( " + "SELECT DISTINCT(th.TicketNumber) FROM tickethops th "
							+ "WHERE th.NextUserGroupID=" + userGroupId + " "
							+ "AND (th.Status='Open' || th.Status='Reopen' || th.Status='RequestForCloser'))";
					condtionString.append(subQuery + " and ");
				} else if (status == "Closed") {
					subQuery = " ts.TicketNumber IN ( " + "SELECT DISTINCT(th.TicketNumber) FROM tickethops th "
							+ "WHERE th.NextUserGroupID=" + userGroupId + " " + "AND (th.Status='Done'))";
					condtionString.append(subQuery + " and ");
				} else {
					subQuery = " ts.TicketNumber IN ( " + "SELECT DISTINCT(th.TicketNumber) FROM tickethops th "
							+ "WHERE th.NextUserGroupID=" + userGroupId + " "
							+ "AND (th.Status='Open' || th.Status='Reopen' || th.Status='Done' "
							+ "|| th.Status='Rollback' || th.Status='RequestForCloser'))";
					condtionString.append(subQuery + " and ");
				}
			}else if (!targetDate.equals("undefined") && !targetDate.equals("null")) {
				String subQuery = "";
				if (status == "Open") {
					subQuery = " ts.TicketNumber IN ( " + "SELECT DISTINCT(th.TicketNumber) FROM tickethops th "
							+ "WHERE date(th.groupSladate)='" + targetDate + "' "
							+ "AND (th.Status='Open' || th.Status='Reopen' || th.Status='RequestForCloser'))";
					condtionString.append(subQuery + " and ");
				} else if (status == "Closed") {
					subQuery = " ts.TicketNumber IN ( " + "SELECT DISTINCT(th.TicketNumber) FROM tickethops th "
							+ "WHERE date(th.groupSladate)='" + targetDate + "' " + "AND (th.Status='Done'))";
					condtionString.append(subQuery + " and ");
				} else {
					subQuery = " ts.TicketNumber IN ( " + "SELECT DISTINCT(th.TicketNumber) FROM tickethops th "
							+ "WHERE date(th.groupSladate)='" + targetDate + "' "
							+ "AND (th.Status='Open' || th.Status='Reopen' || th.Status='Done' "
							+ "|| th.Status='Rollback' || th.Status='RequestForCloser'))";
					condtionString.append(subQuery + " and ");
				}
			}

			int inderOfStartAnd = condtionString.lastIndexOf(" and ");
			int lastIndexOfCondString = condtionString.length();

			if (inderOfStartAnd != -1) {
				condtionString.delete(inderOfStartAnd, lastIndexOfCondString);
			}

			String qs = "SELECT * FROM ticketsummary ts " + "WHERE ts.BusinessProcessID IN (6,7,9) AND  "
					+ condtionString.toString();

			Query query = entityManager.createNativeQuery(qs, Ticketsummary.class);

			List<Ticketsummary> ticketSummaryReturnVal = new ArrayList<Ticketsummary>();
			ticketSummaryReturnVal = (List<Ticketsummary>) query.getResultList();
			return ticketSummaryReturnVal;

		} catch (RuntimeException re) {
			throw re;
		}
	}

	public List<Ticketsummary> findByTicketNumber(String ticketNumber) {
		log.debug("getting Ticketsummary instance with number: " + ticketNumber);
		try {
			Query query = entityManager.createQuery("SELECT e FROM Ticketsummary e where e.ticketNumber=:ticketNumber",
					Ticketsummary.class);
			query.setParameter("ticketNumber", ticketNumber);
			return (List<Ticketsummary>) query.getResultList();
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}

	public Ticketsummary findByTicketNumberSingle(String ticketNumber) {
		log.debug("getting Ticketsummary instance with number: " + ticketNumber);
		try {
			Query query = entityManager.createQuery("SELECT e FROM Ticketsummary e where e.businessprocess.businessProcessId=19 and e.ticketNumber=:ticketNumber",
					Ticketsummary.class);
			query.setParameter("ticketNumber", ticketNumber);
			return (Ticketsummary) query.getSingleResult();
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}
	
	@SuppressWarnings("unchecked")
	public boolean isTicketNumberExist(String ticketNumber) {
		log.debug("getting Ticketsummary instance with number: " + ticketNumber);
		List<Ticketsummary> ts = new ArrayList<>();
		//ticketNumber = "SRMS01201700001631";
		try {
			Query query = entityManager.createQuery("SELECT e FROM Ticketsummary e where e.ticketNumber=:ticketNumber",
					Ticketsummary.class);
			query.setParameter("ticketNumber", ticketNumber);
			
			try{
				ts = (List<Ticketsummary>) query.getResultList();
			}
			catch(Exception ex){
				return false;
			}
			
			if(ts.size() != 0){
				return true;
			}
			return false;
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}

	public List<Object> getDuplicateValue(int iscmId, String problemComponent) {
		Query query = entityManager.createNativeQuery("SELECT * FROM ticketsummary WHERE IssueSolutionCategoryMapID = "
				+ iscmId + " AND STATUS = 'Open' AND '"+problemComponent.trim()+"' like concat('%',ProblemComponent,'%')");
		return query.getResultList();
	}

	/*
	 * public boolean isNewServiceRequest(String customerNumber, int
	 * issueSolutionCategoryMapId) { log.debug(
	 * "getting Ticketsummary instance with number: " + customerNumber); try {
	 * Query query = entityManager.createQuery(
	 * "SELECT e FROM Ticketsummary e where e.customerNumber=:customerNumber " +
	 * " and e.issuesolutioncategorymap.issueSolutionCategoryMapId=:issueSolutionCategoryMapId and e.status='Open'"
	 * , Ticketsummary.class); query.setParameter("customerNumber",
	 * customerNumber); query.setParameter("issueSolutionCategoryMapId",
	 * issueSolutionCategoryMapId); boolean isNew = false; if
	 * (query.getResultList().isEmpty()) { isNew = true; } return isNew; } catch
	 * (RuntimeException re) { log.error("get failed", re); throw re; } }
	 */

	public List<Ticketsummary> isNewServiceRequest(String customerNumber, int issueSolutionCategoryMapId) {
		log.debug("getting Ticketsummary instance with number: " + customerNumber);
		try {
			Query query = entityManager.createQuery(
					"SELECT e FROM Ticketsummary e where e.customerNumber=:customerNumber "
							+ " and e.issuesolutioncategorymap.issueSolutionCategoryMapId=:issueSolutionCategoryMapId and e.status='Open'",
					Ticketsummary.class);
			query.setParameter("customerNumber", customerNumber);
			query.setParameter("issueSolutionCategoryMapId", issueSolutionCategoryMapId);

			List<Ticketsummary> ticketSummaryRegurnVal = query.getResultList();
			if (!ticketSummaryRegurnVal.isEmpty()) {
				return ticketSummaryRegurnVal;
			} else {
				return ticketSummaryRegurnVal;
			}
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}

	}

	public String generateTicketNumber() {
		try {
			Query query = entityManager.createNativeQuery("SELECT " + " IFNULL( "
					+ " CONCAT('SRMS',LPAD(MONTH(CURDATE()),2,'0'),YEAR(CURDATE()),LPAD(CAST((MAX(CAST(SUBSTRING(TicketNumber,-8) AS UNSIGNED)) +1) AS CHAR),8,0)) , "
					+ " CONCAT('SRMS',LPAD(MONTH(CURDATE()),2,'0'),YEAR(CURDATE()),LPAD(1,8,0))) AS id "
					+ " FROM ticketsummary "
					+ " WHERE SUBSTRING(TicketNumber,1,10) = CONCAT('SRMS',LPAD(MONTH(CURDATE()),2,'0'),YEAR(CURDATE()))");
			return (String) query.getSingleResult();
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}
	
	
	public String generateTicketNumberFromTicketNumber() {
		try {
			Query query = entityManager.createNativeQuery("SELECT " + " IFNULL( "
					+ " CONCAT('SRMS',LPAD(MONTH(CURDATE()),2,'0'),YEAR(CURDATE()),LPAD(CAST((MAX(CAST(SUBSTRING(TicketNumber,-8) AS UNSIGNED)) +1) AS CHAR),8,0)) , "
					+ " CONCAT('SRMS',LPAD(MONTH(CURDATE()),2,'0'),YEAR(CURDATE()),LPAD(1,8,0))) AS id "
					+ " FROM ticketNumber "
					+ " WHERE SUBSTRING(TicketNumber,1,10) = CONCAT('SRMS',LPAD(MONTH(CURDATE()),2,'0'),YEAR(CURDATE()))");
			return (String) query.getSingleResult();
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}

	public List<Object> findTicketHistory(String ticketNumber) {
		Query query = entityManager.createNativeQuery(
				"select " + "ts.TicketNumber, " + "isc.name as category," + "iss.name as issues," + "ts.CustomerNumber,"
						+ "ug.Name as usergroup," + "th.Status," + "th.DivisionE2ESLADate," + "th.GroupSLADate,"
						+ "CONCAT('General comments: ',tc.Comments,' :::= given by:',tc.Createdby) as comments,"
						+ "th.TaskCreationDate, th.TaskCreatedBy, th.TaskCompletionDate " + "from " + "tickethops th "
						+ "join ticketsummary ts on th.TicketSummaryID = ts.TicketSummaryID "
						+ "join issuesolutioncategorymap iscm on th.IssueSolutionCategoryMapID = iscm.IssueSolutionCategoryMapID "
						+ "join issuesolution iss on iss.IssueSolutionID = iscm.IssueSolutionID "
						+ "join issuesolutioncategory isc on isc.IssueSolutionCategoryID = iscm.IssueSolutionCategoryID "
						+ "join usergroup ug on (ug.UserGroupID = th.NextUserGroupID) "
						+ "left join ticketcomments tc on tc.TicketHopsID = th.TicketHopsID "
						+ "where ts.TicketNumber=:ticketNumber " +

						"union all " +

						"select " + "ts.TicketNumber, " + "isc.name as category, " + "iss.name as issues, "
						+ "ts.CustomerNumber," + "'' as usergroup," + "ts.Status as status,"
						+ "'' as DivisionE2ESLADate," + "'' as GroupSLADate,"
						+ "CONCAT('Repeated comments: ',rt.Comments,' :::= given by:',rt.Createdby) as comments,"
						+ "rt.Createddate, rt.Createdby, '' " + "from " + "ticketsummary ts "
						+ "join issuesolutioncategorymap iscm on ts.IssueSolutionCategoryMapID = iscm.IssueSolutionCategoryMapID "
						+ "join issuesolution iss on iss.IssueSolutionID = iscm.IssueSolutionID "
						+ "join issuesolutioncategory isc on isc.IssueSolutionCategoryID = iscm.IssueSolutionCategoryID "
						+ "join repeatedticket rt on rt.TicketSummaryID = ts.TicketSummaryID "
						+ "where ts.TicketNumber=:ticketNumber " +

						"order by 10 desc")
				.setParameter("ticketNumber", ticketNumber.trim());
		return query.getResultList();
	}

	
	public List<Object> findTicketHistorySAW(String ticketNumber) {
		try {
			Query query = entityManager
					.createNativeQuery(
							" SELECT ts.TicketNumber, ug.NAME AS usergroup, ts.tickettype, th.STATUS, ts.componenttype, CONCAT(ts.Comment,' :::= given by:',th.taskcreatedby) AS comments "
									+ "FROM  tickethops th     "
									+ "LEFT JOIN ticketsummary ts ON th.TicketSummaryID = ts.TicketSummaryID "
									+ "JOIN issuesolutioncategorymap iscm ON th.IssueSolutionCategoryMapID = iscm.IssueSolutionCategoryMapID "
									+ "JOIN issuesolution iss ON iss.IssueSolutionID = iscm.IssueSolutionID    "
									+ "JOIN issuesolutioncategory isc ON isc.IssueSolutionCategoryID = iscm.IssueSolutionCategoryID "
									+ "JOIN usergroup ug ON (ug.UserGroupID = th.PreviousUserGroupID)    "
									+ "WHERE ts.TicketNumber=:ticketNumber  "
									+ "and th.TicketHopsID = (select min(th.TicketHopsID) as TicketHopsID from tickethops th where th.TicketNumber =:ticketNumber) "
									+ "union all "
									+ "SELECT ts.TicketNumber, ug.NAME AS usergroup, ts.tickettype, th.STATUS, ts.componenttype, CONCAT(tc.Comments,' :::= given by:',tc.Createdby) AS comments "
									+ "FROM  tickethops th     "
									+ "LEFT JOIN ticketsummary ts ON th.TicketSummaryID = ts.TicketSummaryID "
									+ "JOIN issuesolutioncategorymap iscm ON th.IssueSolutionCategoryMapID = iscm.IssueSolutionCategoryMapID "
									+ "JOIN issuesolution iss ON iss.IssueSolutionID = iscm.IssueSolutionID    "
									+ "JOIN issuesolutioncategory isc ON isc.IssueSolutionCategoryID = iscm.IssueSolutionCategoryID "
									+ "JOIN usergroup ug ON (ug.UserGroupID = th.NextUserGroupID)   "
									+ "LEFT JOIN ticketcomments tc ON tc.TicketHopsID = th.TicketHopsID   "
									+ "WHERE ts.TicketNumber=:ticketNumber")
					.setParameter("ticketNumber", ticketNumber.trim());
			return query.getResultList();
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return null;
	}
	
	public List<Tickethops> fetchAllEditableTicket() {
		// TODO Auto-generated method stub
		Query query = null;
		if (httpSession.getAttribute("section") != null) {
			String section = httpSession.getAttribute("section").toString();
			String userGroup = httpSession.getAttribute("groupName").toString();
			if (section.toLowerCase().contains("soc")) {
				// rw.setMessage("SOC");
				if (userGroup.toLowerCase().contains("cmpm")) {
					query = entityManager.createQuery(
							"select e from Tickethops e where (e.ticketsummary.businessprocess.businessProcessId = 6) and e.status='Open'");
				} else if (userGroup.toLowerCase().contains("csm")) {
					query = entityManager.createQuery(
							"select e from Tickethops e where (e.ticketsummary.businessprocess.businessProcessId = 7) and e.status='Open'");
				} else if (userGroup.toLowerCase().contains("rnbm")) {
					query = entityManager.createQuery(
							"select e from Tickethops e where (e.ticketsummary.businessprocess.businessProcessId = 9) and e.status='Open'");
				}
			} else if (section.toLowerCase().contains("assurance")) {
				// rw.setMessage("Assurance");
				query = entityManager.createQuery(
						"select e from Tickethops e where (e.ticketsummary.businessprocess.businessProcessId = 14) and e.status='Open'");
			}
		}
		return query.getResultList();
	}
	
	public List<Object> reportDS(String ticketNumber, String issueSolutionCategoryMapID, String ticketCreatedBy, 
			String companyBSCode, String collectionMode, String deliveryNumber) {
		
		StringBuilder conditionString = new StringBuilder();
		
		try {
			
			if(!ticketNumber.equals("undefined") && !ticketNumber.equals("null"))
			{
				conditionString.append(" AND t.TicketNumber='"+ ticketNumber +"' AND ");
			}
			if(!issueSolutionCategoryMapID.equals("undefined") && !issueSolutionCategoryMapID.equals("null"))
			{
				conditionString.append(" AND  t.issueSolutionCategoryMapID="+ issueSolutionCategoryMapID +" AND ");
			}			
			if(!ticketCreatedBy.equals("undefined") && !ticketCreatedBy.equals("null"))
			{
				conditionString.append(" AND  t.ticketCreatedBy='"+ ticketCreatedBy +"' AND ");
			}			
			if(!companyBSCode.equals("undefined") && !companyBSCode.equals("null"))
			{
				conditionString.append(" AND  t.companyBSCode='"+ companyBSCode +"' AND ");
			}			
			if(!collectionMode.equals("undefined") && !collectionMode.equals("null"))
			{
				conditionString.append(" AND  t.collectionMode='"+ collectionMode +"' AND ");
			}
			if(!deliveryNumber.equals("undefined") && !deliveryNumber.equals("null"))
			{
				conditionString.append(" AND  t.deliveryNumber='"+ deliveryNumber +"' AND ");
			}
			
			int inderOfStartAnd = conditionString.lastIndexOf(" AND ");
			int lastIndexOfCondString = conditionString.length();

			if (inderOfStartAnd != -1) {
				conditionString.delete(inderOfStartAnd, lastIndexOfCondString);
			}

			if(!conditionString.toString().equals(""))
			{
				String qs = "SELECT t.TicketNumber, ic.Name AS Category, iss.Name AS Subcategory, t.TicketCreationDate, t.TicketCreatedBy, t.DeliveryNumber, t.DepositeBankName, " + 
							"t.CollectionMode, t.CollectionAmount, t.CompanyBSCode, t.TicketCloseDate  " +
							"FROM ticketsummary t,  " +
							"issuesolutioncategorymap im, issuesolutioncategory ic, issuesolution iss " +
							"WHERE im.IssueSolutionCategoryID=ic.IssueSolutionCategoryID AND " +
							"im.IssueSolutionID=iss.IssueSolutionID AND  " +
							"im.IssueSolutionCategoryMapID=t.IssueSolutionCategoryMapID AND " + 
							"t.BusinessProcessID=19 " + conditionString.toString();
				Query query = entityManager
						.createNativeQuery(qs);
				
				return query.getResultList();
			}
			
			
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return null;
	}	

	public List<Object> reportDSbyDate(String fromDate, String toDate) {
		
		StringBuilder conditionString = new StringBuilder();
		
		try {
			
			if(!fromDate.equals("undefined") && !fromDate.equals("null") && !toDate.equals("undefined") && !toDate.equals("null"))
			{
				conditionString.append(" DATE(t.TicketCreationDate) BETWEEN '" + fromDate + "' AND '" + toDate + "' ");
			}
			else
			{
				conditionString.append("  DATE(t.TicketCreationDate) BETWEEN  NOW() AND NOW() ");
			}			
			
			String qs = "SELECT t.TicketNumber, ic.Name AS Category, iss.Name AS Subcategory, t.TicketCreationDate, t.TicketCreatedBy, t.DeliveryNumber, t.DepositeBankName, " + 
						"t.CollectionMode, t.CollectionAmount, t.CompanyBSCode, t.TicketCloseDate  " +
						"FROM ticketsummary t,  " +
						"issuesolutioncategorymap im, issuesolutioncategory ic, issuesolution iss " +
						"WHERE im.IssueSolutionCategoryID=ic.IssueSolutionCategoryID AND " +
						"im.IssueSolutionID=iss.IssueSolutionID AND  " +
						"im.IssueSolutionCategoryMapID=t.IssueSolutionCategoryMapID AND " + 
						"t.BusinessProcessID=19 AND " + conditionString.toString();
			Query query = entityManager
					.createNativeQuery(qs);
			
			return query.getResultList();
			
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return null;
	}	
	// Edit by Shakil
		// Date:06-05-2017	
		public String generateMonthYearForTicketNumber() {
			try {
				Query query = entityManager.createNativeQuery("SELECT " + " IFNULL( "
						+ " CONCAT('SRMS',LPAD(MONTH(CURDATE()),2,'0'),YEAR(CURDATE())) , "
						+ " CONCAT('SRMS',LPAD(MONTH(CURDATE()),2,'0'),YEAR(CURDATE()))) AS id ");
				String monyear = (String) query.getSingleResult(); 
				
				return monyear;

			} catch (RuntimeException re) {
				log.error("get failed", re);
				throw re;
			}
		}

}
