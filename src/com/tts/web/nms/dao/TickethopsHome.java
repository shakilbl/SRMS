package com.tts.web.nms.dao;
// Generated May 12, 2016 4:24:30 PM by Hibernate Tools 5.1.0.Alpha1

import java.util.Date;
import java.util.HashMap;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.tts.web.nms.model.Issuesolutioncategorymap;
import com.tts.web.nms.model.Tickethops;
import com.tts.web.nms.model.Ticketsummary;
import com.tts.web.nms.model.Usergroup;
import com.tts.web.nms.model.Wfheader;
import com.tts.web.nms.model.Wfline;

/**
 * Home object for domain model class Tickethops.
 * 
 * @see GEN.Tickethops
 * @author Hibernate Tools
 */
@Repository
@Transactional
public class TickethopsHome {

	private static final Log log = LogFactory.getLog(TickethopsHome.class);

	@PersistenceContext
	private EntityManager entityManager;

	public int persist(Tickethops transientInstance) {
		log.debug("persisting Tickethops instance");
		try {
			entityManager.persist(transientInstance);
			entityManager.flush();
			int tickethopsId = transientInstance.getTicketHopsId();
			log.debug("persist successful");
			return tickethopsId;
		} catch (RuntimeException re) {
			log.error("persist failed", re);
			throw re;
		}
	}

	public void remove(Tickethops persistentInstance) {
		log.debug("removing Tickethops instance");
		try {
			entityManager.remove(persistentInstance);
			log.debug("remove successful");
		} catch (RuntimeException re) {
			log.error("remove failed", re);
			throw re;
		}
	}

	public Tickethops merge(Tickethops detachedInstance) {
		log.debug("merging Tickethops instance");
		try {
			Tickethops result = entityManager.merge(detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	public void updateStatus(Tickethops tickethops, String actionType, String userName) {
		try {
			Ticketsummary ticketsummary = tickethops.getTicketsummary();
			// If ticket is closed, close summary entry as well
			if (StringUtils.equalsIgnoreCase(actionType, "closed")) {
				ticketsummary.setStatus(actionType);
				ticketsummary.setTicketCloseBy(userName);
				ticketsummary.setTicketCloseDate(new Date());
			}
			entityManager.merge(ticketsummary);
			// Update existing ticket status as "done"
			tickethops.setStatus(actionType);
			tickethops.setTaskCompletedby(userName);
			tickethops.setTaskCompletionDate(new Date());
			entityManager.merge(tickethops);
		} catch (RuntimeException re) {
			throw re;
		}
	}

	public int updateLockedBy(long ticketId, String lockedBy, String isLocked) {
		try {
			Query query = entityManager
					.createQuery("UPDATE Tickethops e SET e.isLocked = :isLocked, e.lockedBy= :lockedBy "
							+ "WHERE e.ticketHopsId = :ticketId");
			query.setParameter("isLocked", isLocked);
			query.setParameter("lockedBy", lockedBy);
			query.setParameter("ticketId", (int) ticketId);
			return query.executeUpdate();
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	public void updateStatusAndInsertTickethops(Tickethops tickethops, Usergroup usergroup, String actionType,
			String userName, Date groupSla, Date divisionSla) {
		boolean setDivisionLevelSla = false;
		try {
			Tickethops newTickethops = new Tickethops(tickethops);
//			// To Update DivisionLevelSla or not
//			if (!StringUtils.equalsIgnoreCase(tickethops.getUsergroupByNextUserGroupId().getDivision(),
//					usergroup.getDivision())) {
//				setDivisionLevelSla = true;
//			}
			// Update existing ticket status as "done"
			tickethops.setTaskCompletedby(userName);
			tickethops.setTaskCompletionDate(new Date());
			tickethops.setStatus("Done");
			entityManager.merge(tickethops);
			// Insert this ticket again changing "usergroupByNextUserGroupId"
			newTickethops.setTicketHopsId(0);
			newTickethops.setIsLocked("No");
			newTickethops.setLockedBy(null);
			newTickethops.setTaskCompletedby(null);
			newTickethops.setTaskCompletionDate(null);
			newTickethops.setGroupSlastatus(null);
			newTickethops.setUsergroupByPreviousUserGroupId(tickethops.getUsergroupByNextUserGroupId());
			newTickethops.setUsergroupByNextUserGroupId(usergroup);
			newTickethops.setStatus(actionType);
			// Update SLA
			newTickethops.setGroupSladate(groupSla);
			newTickethops.setDivisionE2esladate(divisionSla);
//			if (setDivisionLevelSla) {
//				newTickethops.setDivisionE2esladate(divisionSla);
//			}
			// If its rfc, reset wflineno
			if (StringUtils.equalsIgnoreCase(actionType, "requestforcloser")) {
				newTickethops.setWflineNo(null);
			}
			newTickethops.setTaskCreatedBy(userName);
			newTickethops.setTaskCreationDate(new Date());
			entityManager.merge(newTickethops);
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	// For fixed workflow from landingpage
	public void updateStatusAndInsertTickethopsByWFLine(Tickethops tickethops, Wfline wfline, String actionType,
			String userName, Date groupSla, Date divisionSla) {
		boolean setDivisionLevelSla = false;
		try {
			Usergroup usergroupByPreviousUserGroupId = tickethops.getUsergroupByNextUserGroupId();

			Tickethops newTickethops = new Tickethops(tickethops);
			// To Update DivisionLevelSla or not
//			if (!StringUtils.equalsIgnoreCase(tickethops.getUsergroupByNextUserGroupId().getDivision(),
//					wfline.getUsergroup().getDivision())) {
//				setDivisionLevelSla = true;
//			}
			// Update existing ticket status as "done"
			tickethops.setTaskCompletedby(userName);
			tickethops.setTaskCompletionDate(new Date());
			tickethops.setStatus("Done");
			entityManager.merge(tickethops);

			// Insert this ticket again changing "usergroupByNextUserGroupId"
			newTickethops.setTicketHopsId(0);
			newTickethops.setIsLocked("No");
			newTickethops.setLockedBy(null);
			newTickethops.setTaskCompletedby(null);
			newTickethops.setTaskCompletionDate(null);
			newTickethops.setGroupSlastatus(null);
			newTickethops.setUsergroupByNextUserGroupId(wfline.getUsergroup());
			newTickethops.setUsergroupByPreviousUserGroupId(usergroupByPreviousUserGroupId);
			newTickethops.setStatus(actionType);
			newTickethops.setTaskCreatedBy(userName);
			// Update SLA
			newTickethops.setGroupSladate(groupSla);
			newTickethops.setDivisionE2esladate(divisionSla);
//			if (setDivisionLevelSla) {
//				newTickethops.setDivisionE2esladate(divisionSla);
//			}
			newTickethops.setTaskCreationDate(new Date());
			newTickethops.setWfline(wfline);
			newTickethops.setWflineNo(wfline.getLineNo());
			// Need to insert sla column values also
			entityManager.merge(newTickethops);
			return;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	public void updateSlaStatus(Tickethops tickethops, String groupSlastatus) {
		try {
			tickethops.setGroupSlastatus(groupSlastatus);
			entityManager.merge(tickethops);
		} catch (RuntimeException re) {
			re.printStackTrace();
			throw re;
		}
	}

	public Tickethops findById(Integer id) {
		log.debug("getting Tickethops instance with id: " + id);
		try {
			Tickethops instance = entityManager.find(Tickethops.class, id);
			log.debug("get successful");
			return instance;
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}

	public Tickethops findByHopsId(Integer id) {
		try {
			Query query = entityManager.createQuery("SELECT e FROM Tickethops e where e.ticketHopsId=:id "
					+ "and LOWER(e.status) NOT IN ('done','closed')", Tickethops.class);
			query.setParameter("id", id);
			return (Tickethops) query.getSingleResult();
		} catch (RuntimeException re) {
			throw re;
		}
	}
	public Tickethops findByHopsIdVoCM(Integer id) {
		try {
			Query query = entityManager.createQuery("SELECT e FROM Tickethops e where e.ticketHopsId=:id "
					+ "and LOWER(e.status) NOT IN ('done')", Tickethops.class);
			query.setParameter("id", id);
			return (Tickethops) query.getSingleResult();
		} catch (RuntimeException re) {
			throw re;
		}
	}
	

	public Tickethops findFirstHopsByTicketnumber(String ticketNumber) {
		try {
			Query query = entityManager.createQuery(
					"SELECT e FROM Tickethops e where e.ticketNumber=:ticketNumber order by e.ticketHopsId",
					Tickethops.class);
			query.setParameter("ticketNumber", ticketNumber);
			query.setMaxResults(1);
			return (Tickethops) query.getSingleResult();
		} catch (RuntimeException re) {
			throw re;
		}
	}

	public Tickethops getFirstHopsByTicketnumber(String ticketNumber) {
		try {
			Query query = entityManager.createQuery(
					"SELECT e FROM Tickethops e where e.ticketNumber=:ticketNumber order by e.ticketHopsId",
					Tickethops.class);
			query.setParameter("ticketNumber", ticketNumber);
			return (Tickethops) query.getSingleResult();
		} catch (RuntimeException re) {
			throw re;
		}
	}
	
	
	
	public Tickethops findFirstHopsByTicketnumberAndDivision(String ticketNumber, String division) {
		try {
			Query query = entityManager.createQuery(
					"SELECT e FROM Tickethops e where e.ticketNumber=:ticketNumber "
							+ "and lower(e.usergroupByNextUserGroupId.division)=:division order by e.ticketHopsId",
					Tickethops.class);
			query.setParameter("ticketNumber", ticketNumber);
			query.setParameter("division", division.toLowerCase());
			query.setMaxResults(1);
			return (Tickethops) query.getSingleResult();
		} catch (RuntimeException re) {
			throw re;
		}
	}
	

	public List<Tickethops> findByUsergroupsAndFilteredStatus(List<Usergroup> usergroups, String status,
			String workflowType, String onlyMasstag) {
		try {
			Query query = null;
			// Check if WorkflowType and only Masstag is sent
			if (workflowType == null && onlyMasstag == null) {
				// If status is "Open" or "RequestForCloser" we need to fetch
				// all data with status "Open" and "RequestForCloser"
				if (StringUtils.equalsIgnoreCase(status, "open")) {
					query = entityManager.createQuery(
							"SELECT e FROM Tickethops e where LOWER(e.status) in ('requestforcloser',:status) "
									+ "and e.usergroupByNextUserGroupId IN :usergroups",
							Tickethops.class);
				} else if (StringUtils.equalsIgnoreCase(status, "requestforcloser")) {
					// New Requirement: for requestforcloser action load reopen
					// ticket also
					query = entityManager.createQuery(
							"SELECT e FROM Tickethops e where LOWER(e.status) in ('open','reopen',:status) "
									+ "and e.usergroupByNextUserGroupId IN :usergroups",
							Tickethops.class);
				} else {
					query = entityManager.createQuery("SELECT e FROM Tickethops e where LOWER(e.status)=:status "
							+ "and e.usergroupByNextUserGroupId IN :usergroups", Tickethops.class);
				}
			} else if (workflowType != null && onlyMasstag != null) {
				// If status is "Open" or "RequestForCloser" we need to fetch
				// all data with status "Open" and "RequestForCloser"
				if (StringUtils.equalsIgnoreCase(status, "open")) {
					query = entityManager.createQuery(
							"SELECT e FROM Tickethops e where LOWER(e.status) in ('requestforcloser',:status) and LOWER(e.wfheader.type)=:workflowType and e.massTag IS NOT NULL"
									+ " and e.usergroupByNextUserGroupId IN :usergroups",
							Tickethops.class);
				} else if (StringUtils.equalsIgnoreCase(status, "requestforcloser")) {
					query = entityManager.createQuery(
							"SELECT e FROM Tickethops e where LOWER(e.status) in ('open','reopen',:status) and LOWER(e.wfheader.type)=:workflowType and e.massTag IS NOT NULL"
									+ " and e.usergroupByNextUserGroupId IN :usergroups",
							Tickethops.class);
				} else {
					query = entityManager.createQuery("SELECT e FROM Tickethops e where "
							+ "LOWER(e.status)=:status and LOWER(e.wfheader.type)=:workflowType and e.massTag IS NOT NULL"
							+ " and e.usergroupByNextUserGroupId IN :usergroups", Tickethops.class);
				}

				query.setParameter("workflowType", workflowType.toLowerCase());
			} else if (workflowType != null) {
				// If status is "Open" or "RequestForCloser" we need to fetch
				// all data with status "Open" and "RequestForCloser"
				if (StringUtils.equalsIgnoreCase(status, "open")) {
					query = entityManager.createQuery(
							"SELECT e FROM Tickethops e where LOWER(e.status) in ('requestforcloser',:status) and LOWER(e.wfheader.type)=:workflowType"
									+ " and e.usergroupByNextUserGroupId IN :usergroups",
							Tickethops.class);
				} else if (StringUtils.equalsIgnoreCase(status, "requestforcloser")) {
					query = entityManager.createQuery(
							"SELECT e FROM Tickethops e where LOWER(e.status) in ('open','reopen',:status) and LOWER(e.wfheader.type)=:workflowType"
									+ " and e.usergroupByNextUserGroupId IN :usergroups",
							Tickethops.class);
				} else {
					query = entityManager.createQuery("SELECT e FROM Tickethops e where "
							+ "LOWER(e.status)=:status and LOWER(e.wfheader.type)=:workflowType"
							+ " and e.usergroupByNextUserGroupId IN :usergroups", Tickethops.class);
				}

				query.setParameter("workflowType", workflowType.toLowerCase());
			} else if (onlyMasstag != null) {
				// If status is "Open" or "RequestForCloser" we need to fetch
				// all data with status "Open" and "RequestForCloser"
				if (StringUtils.equalsIgnoreCase(status, "open")) {
					query = entityManager.createQuery(
							"SELECT e FROM Tickethops e where LOWER(e.status) in ('requestforcloser',:status) and e.massTag IS NOT NULL"
									+ " and e.usergroupByNextUserGroupId IN :usergroups",
							Tickethops.class);
				} else if (StringUtils.equalsIgnoreCase(status, "requestforcloser")) {
					query = entityManager.createQuery(
							"SELECT e FROM Tickethops e where LOWER(e.status) in ('open','reopen',:status) and e.massTag IS NOT NULL"
									+ " and e.usergroupByNextUserGroupId IN :usergroups",
							Tickethops.class);
				} else {
					query = entityManager.createQuery(
							"SELECT e FROM Tickethops e where " + "LOWER(e.status)=:status and e.massTag IS NOT NULL"
									+ " and e.usergroupByNextUserGroupId IN :usergroups",
							Tickethops.class);
				}
			}

			query.setParameter("status", status.toLowerCase());
			query.setParameter("usergroups", usergroups);
			return (List<Tickethops>) query.getResultList();
		} catch (RuntimeException re) {
			throw re;
		}
	}

	public List<Tickethops> findByUsergroupsAndStatus(List<Usergroup> usergroups, String status, String workflowType,
			String onlyMasstag) {
		try {

			Query query = null;
			// Check if WorkflowType and onlyMasstag is sent
			// If it is either of them is sent, fetch data filtering with them
			if (workflowType == null && onlyMasstag == null) {
				query = entityManager.createQuery("SELECT e FROM Tickethops e where LOWER(e.status)=:status "
						+ "and e.usergroupByNextUserGroupId IN :usergroups", Tickethops.class);
			} else if (workflowType != null && onlyMasstag != null) {
				query = entityManager.createQuery(
						"SELECT e FROM Tickethops e where LOWER(e.status)=:status and LOWER(e.wfheader.type)=:workflowType and e.massTag IS NOT NULL "
								+ "and e.usergroupByNextUserGroupId IN :usergroups",
						Tickethops.class);
				query.setParameter("workflowType", workflowType.toLowerCase());
			} else if (workflowType != null) {
				query = entityManager.createQuery(
						"SELECT e FROM Tickethops e where LOWER(e.status)=:status and LOWER(e.wfheader.type)=:workflowType "
								+ "and e.usergroupByNextUserGroupId IN :usergroups",
						Tickethops.class);
				query.setParameter("workflowType", workflowType.toLowerCase());
			} else if (onlyMasstag != null) {
				query = entityManager.createQuery(
						"SELECT e FROM Tickethops e where LOWER(e.status)=:status and e.massTag IS NOT NULL "
								+ "and e.usergroupByNextUserGroupId IN :usergroups",
						Tickethops.class);
			}
			query.setParameter("status", status.toLowerCase());
			query.setParameter("usergroups", usergroups);

			return (List<Tickethops>) query.getResultList();
		} catch (RuntimeException re) {
			throw re;
		}
	}

	public List<Tickethops> findByUsergroupsAndStatus(List<Usergroup> usergroups, String statusOne, String statusTwo,
			String workflowType, String onlyMasstag) {
		try {

			Query query = null;
			// Check if WorkflowType and onlyMasstag is sent
			// If it is either of them is sent, fetch data filtering with them
			if (workflowType == null && onlyMasstag == null) {
				query = entityManager
						.createQuery("SELECT e FROM Tickethops e where LOWER(e.status) IN (:status,:statusTwo) "
								+ "and e.usergroupByNextUserGroupId IN :usergroups", Tickethops.class);
			} else if (workflowType != null && onlyMasstag != null) {
				query = entityManager.createQuery(
						"SELECT e FROM Tickethops e where LOWER(e.status) IN (:status,:statusTwo) and LOWER(e.wfheader.type)=:workflowType and e.massTag IS NOT NULL "
								+ "and e.usergroupByNextUserGroupId IN :usergroups",
						Tickethops.class);
				query.setParameter("workflowType", workflowType.toLowerCase());
			} else if (workflowType != null) {
				query = entityManager.createQuery(
						"SELECT e FROM Tickethops e where LOWER(e.status) IN (:status,:statusTwo) and LOWER(e.wfheader.type)=:workflowType "
								+ "and e.usergroupByNextUserGroupId IN :usergroups",
						Tickethops.class);
				query.setParameter("workflowType", workflowType.toLowerCase());
			} else if (onlyMasstag != null) {
				query = entityManager.createQuery(
						"SELECT e FROM Tickethops e where LOWER(e.status) IN (:status,:statusTwo) and e.massTag IS NOT NULL "
								+ "and e.usergroupByNextUserGroupId IN :usergroups",
						Tickethops.class);
			}
			query.setParameter("status", statusOne.toLowerCase());
			query.setParameter("statusTwo", statusTwo.toLowerCase());
			query.setParameter("usergroups", usergroups);

			return (List<Tickethops>) query.getResultList();
		} catch (RuntimeException re) {
			throw re;
		}
	}

	public List<Tickethops> findByUsergroups(List<Usergroup> usergroups, String workflowType, String onlyMasstag) {
		try {

			Query query = null;
			// Check if WorkflowType and only Masstag is sent
			if (workflowType == null && onlyMasstag == null) {
				// Always skip records with done and closed status
				query = entityManager.createQuery(
						"SELECT e FROM Tickethops e where "
								+ "e.usergroupByNextUserGroupId IN :usergroups and LOWER(e.status) NOT IN ('done','edited') order by e.ticketNumber desc",
						Tickethops.class); /*,'closed'*/
			} else if (workflowType != null && onlyMasstag != null) {
				query = entityManager.createQuery(
						"SELECT e FROM Tickethops e where "
								+ "e.usergroupByNextUserGroupId IN :usergroups and LOWER(e.status) NOT IN ('done','closed','edited') and LOWER(e.wfheader.type)=:workflowType and e.massTag IS NOT NULL",
						Tickethops.class);
				query.setParameter("workflowType", workflowType.toLowerCase());
			} else if (workflowType != null) {
				query = entityManager.createQuery(
						"SELECT e FROM Tickethops e where "
								+ "e.usergroupByNextUserGroupId IN :usergroups and LOWER(e.status) NOT IN ('done','closed','edited') and LOWER(e.wfheader.type)=:workflowType",
						Tickethops.class);
				query.setParameter("workflowType", workflowType.toLowerCase());
			} else if (onlyMasstag != null) {
				query = entityManager.createQuery(
						"SELECT e FROM Tickethops e where "
								+ "e.usergroupByNextUserGroupId IN :usergroups and LOWER(e.status) NOT IN ('done','closed','edited') and e.massTag IS NOT NULL",
						Tickethops.class);
			}
			query.setParameter("usergroups", usergroups);

			return (List<Tickethops>) query.getResultList();
		} catch (RuntimeException re) {
			throw re;
		}
	}

	public List<Tickethops> findByUsergroupAndLocked(Usergroup usergroups, String workflowType, String onlyMasstag) {
		try {

			Query query = null;
			// Check if WorkflowType and only Masstag is sent
			if (workflowType == null && onlyMasstag == null) {
				// Always skip records with done and closed status
				query = entityManager.createQuery(
						"SELECT e FROM Tickethops e where "
								+ "e.usergroupByNextUserGroupId IN :usergroups and LOWER(e.status) NOT IN ('edited','done','closed','feedback given to customer','feedback given to vocm','rollback')",
						Tickethops.class);
			} else if (workflowType != null && onlyMasstag != null) {
				query = entityManager.createQuery(
						"SELECT e FROM Tickethops e where "
								+ "e.usergroupByNextUserGroupId IN :usergroups and LOWER(e.status) NOT IN ('edited','done','closed','feedback given to customer','feedback given to vocm','rollback') and LOWER(e.wfheader.type)=:workflowType and e.massTag IS NOT NULL",
						Tickethops.class);
				query.setParameter("workflowType", workflowType.toLowerCase());
			} else if (workflowType != null) {
				query = entityManager.createQuery(
						"SELECT e FROM Tickethops e where "
								+ "e.usergroupByNextUserGroupId IN :usergroups and LOWER(e.status) NOT IN ('edited','done','closed','feedback given to customer','feedback given to vocm','rollback') and LOWER(e.wfheader.type)=:workflowType",
						Tickethops.class);
				query.setParameter("workflowType", workflowType.toLowerCase());
			} else if (onlyMasstag != null) {
				query = entityManager.createQuery(
						"SELECT e FROM Tickethops e where "
								+ "e.usergroupByNextUserGroupId IN :usergroups and LOWER(e.status) NOT IN ('edited','done','closed','feedback given to customer','feedback given to vocm','rollback') and e.massTag IS NOT NULL",
						Tickethops.class);
			}
			query.setParameter("usergroups", usergroups);

			return (List<Tickethops>) query.getResultList();
		} catch (RuntimeException re) {
			throw re;
		}
	}

	public List<Tickethops> findByUsergroupsAndNotLocked(List<Usergroup> usergroups, String workflowType,
			String onlyMasstag) {
		try {

			Query query = null;
			// Check if WorkflowType and only Masstag is sent
			if (workflowType == null && onlyMasstag == null) {
				// Always skip records with done and closed status
				query = entityManager.createQuery(
						"SELECT e FROM Tickethops e where "
								+ "e.usergroupByNextUserGroupId IN :usergroups and LOWER(e.status) NOT IN ('hold','done','closed','edited') and LOWER(isLocked)='no'",
						Tickethops.class);
			} else if (workflowType != null && onlyMasstag != null) {
				query = entityManager.createQuery("SELECT e FROM Tickethops e where "
						+ "e.usergroupByNextUserGroupId IN :usergroups and LOWER(e.status) NOT IN ('hold','done','closed','edited') and LOWER(e.wfheader.type)=:workflowType and e.massTag IS NOT NULL"
						+ " and LOWER(isLocked)='no'", Tickethops.class);
				query.setParameter("workflowType", workflowType.toLowerCase());
			} else if (workflowType != null) {
				query = entityManager.createQuery("SELECT e FROM Tickethops e where "
						+ "e.usergroupByNextUserGroupId IN :usergroups and LOWER(e.status) NOT IN ('hold','done','closed','edited') and LOWER(e.wfheader.type)=:workflowType"
						+ " and LOWER(isLocked)='no'", Tickethops.class);
				query.setParameter("workflowType", workflowType.toLowerCase());
			} else if (onlyMasstag != null) {
				query = entityManager.createQuery("SELECT e FROM Tickethops e where "
						+ "e.usergroupByNextUserGroupId IN :usergroups and LOWER(e.status) NOT IN ('hold','done','closed','edited') and e.massTag IS NOT NULL"
						+ " and LOWER(isLocked)='no'", Tickethops.class);
			}
			query.setParameter("usergroups", usergroups);

			return (List<Tickethops>) query.getResultList();
		} catch (RuntimeException re) {
			throw re;
		}
	}

	public List<Tickethops> findByLockedbyAndFilteredStatus(String lockedBy, String status, String workflowType,
			String onlyMasstag) {
		try {
			Query query = null;
			// Check if WorkflowType and only Masstag is sent
			if (workflowType == null && onlyMasstag == null) {
				// If status is "Open" or "RequestForCloser" we need to fetch
				// all data with status "Open" and "RequestForCloser"
				if (StringUtils.equalsIgnoreCase(status, "open")) {
					query = entityManager.createQuery(
							"SELECT e FROM Tickethops e where LOWER(e.status) in ('requestforcloser',:status) and LOWER(e.lockedBy)=:lockedBy",
							Tickethops.class);
				} else if (StringUtils.equalsIgnoreCase(status, "requestforcloser")) {
					query = entityManager.createQuery(
							"SELECT e FROM Tickethops e where LOWER(e.status) in ('open',:status) and LOWER(e.lockedBy)=:lockedBy",
							Tickethops.class);
				} else {
					query = entityManager.createQuery("SELECT e FROM Tickethops e where "
							+ "LOWER(e.status)=:status and LOWER(e.lockedBy)=:lockedBy", Tickethops.class);
				}
			} else if (workflowType != null && onlyMasstag != null) {
				// If status is "Open" or "RequestForCloser" we need to fetch
				// all
				// data with status "Open" and "RequestForCloser"
				if (StringUtils.equalsIgnoreCase(status, "open")) {
					query = entityManager.createQuery(
							"SELECT e FROM Tickethops e where LOWER(e.status) in ('requestforcloser',:status) and LOWER(e.lockedBy)=:lockedBy and LOWER(e.wfheader.type)=:workflowType and e.massTag IS NOT NULL",
							Tickethops.class);
				} else if (StringUtils.equalsIgnoreCase(status, "requestforcloser")) {
					query = entityManager.createQuery(
							"SELECT e FROM Tickethops e where LOWER(e.status) in ('open',:status) and LOWER(e.lockedBy)=:lockedBy and LOWER(e.wfheader.type)=:workflowType and e.massTag IS NOT NULL",
							Tickethops.class);
				} else {
					query = entityManager.createQuery(
							"SELECT e FROM Tickethops e where "
									+ "e.status=:status and LOWER(e.lockedBy)=:lockedBy and LOWER(e.wfheader.type)=:workflowType and e.massTag IS NOT NULL",
							Tickethops.class);
				}

				query.setParameter("workflowType", workflowType.toLowerCase());
			} else if (workflowType != null) {
				// If status is "Open" or "RequestForCloser" we need to fetch
				// all
				// data with status "Open" and "RequestForCloser"
				if (StringUtils.equalsIgnoreCase(status, "open")) {
					query = entityManager.createQuery(
							"SELECT e FROM Tickethops e where LOWER(e.status) in ('requestforcloser',:status) and LOWER(e.lockedBy)=:lockedBy and LOWER(e.wfheader.type)=:workflowType",
							Tickethops.class);
				} else if (StringUtils.equalsIgnoreCase(status, "requestforcloser")) {
					query = entityManager.createQuery(
							"SELECT e FROM Tickethops e where LOWER(e.status) in ('open',:status) and LOWER(e.lockedBy)=:lockedBy and LOWER(e.wfheader.type)=:workflowType",
							Tickethops.class);
				} else {
					query = entityManager.createQuery(
							"SELECT e FROM Tickethops e where "
									+ "LOWER(e.status)=:status and LOWER(e.lockedBy)=:lockedBy and LOWER(e.wfheader.type)=:workflowType",
							Tickethops.class);
				}

				query.setParameter("workflowType", workflowType.toLowerCase());
			} else if (onlyMasstag != null) {
				// If status is "Open" or "RequestForCloser" we need to fetch
				// all
				// data with status "Open" and "RequestForCloser"
				if (StringUtils.equalsIgnoreCase(status, "open")) {
					query = entityManager.createQuery(
							"SELECT e FROM Tickethops e where LOWER(e.status) in ('requestforcloser',:status) and LOWER(e.lockedBy)=:lockedBy and e.massTag IS NOT NULL",
							Tickethops.class);
				} else if (StringUtils.equalsIgnoreCase(status, "requestforcloser")) {
					query = entityManager.createQuery(
							"SELECT e FROM Tickethops e where LOWER(e.status) in ('open',:status) and LOWER(e.lockedBy)=:lockedBy and e.massTag IS NOT NULL",
							Tickethops.class);
				} else {
					query = entityManager.createQuery(
							"SELECT e FROM Tickethops e where "
									+ "LOWER(e.status)=:status and LOWER(e.lockedBy)=:lockedBy and e.massTag IS NOT NULL",
							Tickethops.class);
				}
			}

			query.setParameter("status", status.toLowerCase());
			query.setParameter("lockedBy", lockedBy.toLowerCase());
			return (List<Tickethops>) query.getResultList();
		} catch (RuntimeException re) {
			throw re;
		}
	}
	public String findDivision(String networkID) {
		Query query = entityManager.createNativeQuery(
				"select ug.Division from usergroup ug"
				+ "	join userandusergroupmap uugm on uugm.UserGroupID = ug.UserGroupID"
				+ "	join user u on u.UserID = uugm.UserID"
				+ "	where u.NetworkID = '"+networkID+"' limit 1");
		return (String) query.getSingleResult();
	}
	public List<Object> findDivisionFromNID(String networkID){
		Query query = entityManager.createNativeQuery(
				"select ug.Division from usergroup ug"
				+ "	join userandusergroupmap uugm on uugm.UserGroupID = ug.UserGroupID"
				+ "	join user u on u.UserID = uugm.UserID"
				+ "	where u.NetworkID = '"+networkID+"' limit 1");
		return (List<Object>) query.getResultList();
	}
	public List<Object> findFirstUserGroup(String ticketNumber){
		Query query = entityManager.createNativeQuery("select NextUserGroupID from tickethops where TicketNumber = "
				+ " '"+ticketNumber+"' order by TicketHopsID limit 1");
		return (List<Object>) query.getResultList();
	}
	public List<Object> findUserGroup(int ug){
		Query query = entityManager.createNativeQuery("select ug.Name from tickethops th join usergroup ug on "
				+ " th.NextUserGroupID = ug.UserGroupID where th.NextUserGroupID = "+ug+" limit 1;");
		return (List<Object>) query.getResultList();
	}
	public List<Tickethops> findAllByTicketNumber(String ticketNumber, String division) {
		try {
			Query query = entityManager.createQuery("SELECT e FROM Tickethops e where e.ticketNumber=:ticketNumber "
					+ "and lower(e.usergroupByNextUserGroupId.division) = :division", Tickethops.class);
			query.setParameter("ticketNumber", ticketNumber);
			query.setParameter("division", division);
			
			return (List<Tickethops>) query.getResultList();
		} catch (RuntimeException re) {
			throw re;
		}
	}
	public List<Object> findAllstatus(String val, String status, String CusCom, String dateCon) {
		Query query = entityManager.createNativeQuery(
				"select status, i.Name, TaskCreationDate, us.Division, ts.TicketHopsID, ts.TicketNumber, ts.PreviousHopsID from tickethops ts  "
						+ "join issuesolutioncategorymap iscm on iscm.IssueSolutionCategoryMapID=ts.IssueSolutionCategoryMapID "
						+ "join issuesolution i on i.IssueSolutionID=iscm.IssueSolutionID "
						+ "join usergroup us on us.UserGroupID=ts.NextUserGroupID "

						+ " where "+status+" and " + "us.Division='"+val+"'  and "
						+ " "+dateCon+" i.Type like '%Network Problem%' "
						+ "  "+CusCom+" group by ts.TicketNumber order by ts.TicketHopsID desc");
		return (List<Object>) query.getResultList();
	}

	public List<Object> allticketHops() {
		Query query = entityManager.createNativeQuery("select * from tickethops t "
				+ " ");

		return query.getResultList();
	}
	public List<Object> listAllSolutions() {
		Query query = entityManager.createNativeQuery("select Name from issuesolution i where i.type = 'Solution' "
				+ " ");

		return (List<Object>) query.getResultList();
	} 

	public List<Object> findComment(String ID) {
		Query query = entityManager.createNativeQuery("select Comments from ticketcomments t where TicketHopsID = '"+ ID +"' order by TicketCommentsID desc limit 1");

		return query.getResultList();
	}


	public List<Object> getNewHopsID() {
		Query query = entityManager.createNativeQuery("show table status like 'tickethops'");
		return query.getResultList();
	}

	public List<Tickethops> findByLockedbyAndStatus(String lockedBy, String status, String workflowType,
			String onlyMasstag) {
		try {
			Query query = null;
			// Check if WorkflowType and only Masstag is sent
			if (workflowType == null && onlyMasstag == null) {
				query = entityManager.createQuery(
						"SELECT e FROM Tickethops e where LOWER(e.status)=:status " + "and LOWER(e.lockedBy)=:lockedBy",
						Tickethops.class);
			} else if (workflowType != null && onlyMasstag != null) {
				query = entityManager.createQuery(
						"SELECT e FROM Tickethops e where LOWER(e.status)=:status "
								+ "and LOWER(e.lockedBy)=:lockedBy and LOWER(e.wfheader.type)=:workflowType and e.massTag IS NOT NULL",
						Tickethops.class);
				query.setParameter("workflowType", workflowType.toLowerCase());
			} else if (workflowType != null) {
				query = entityManager.createQuery(
						"SELECT e FROM Tickethops e where LOWER(e.status)=:status "
								+ "and LOWER(e.lockedBy)=:lockedBy and LOWER(e.wfheader.type)=:workflowType",
						Tickethops.class);
				query.setParameter("workflowType", workflowType.toLowerCase());
			} else if (onlyMasstag != null) {
				query = entityManager.createQuery("SELECT e FROM Tickethops e where LOWER(e.status)=:status "
						+ "and LOWER(e.lockedBy)=:lockedBy and e.massTag IS NOT NULL", Tickethops.class);
			}

			query.setParameter("status", status.toLowerCase());
			query.setParameter("lockedBy", lockedBy.toLowerCase());
			return (List<Tickethops>) query.getResultList();
		} catch (RuntimeException re) {
			throw re;
		}
	}

	// find By Lockedby And two Status
	public List<Tickethops> findByLockedbyAndStatus(String lockedBy, String statusOne, String statusTwo,
			String workflowType, String onlyMasstag) {
		try {
			Query query = null;
			// Check if WorkflowType and only Masstag is sent
			if (workflowType == null && onlyMasstag == null) {
				query = entityManager
						.createQuery("SELECT e FROM Tickethops e where LOWER(e.status) IN (:status, :statusTwo) "
								+ "and LOWER(e.lockedBy)=:lockedBy", Tickethops.class);
			} else if (workflowType != null && onlyMasstag != null) {
				query = entityManager.createQuery(
						"SELECT e FROM Tickethops e where LOWER(e.status) IN (:status, :statusTwo) "
								+ "and LOWER(e.lockedBy)=:lockedBy and LOWER(e.wfheader.type)=:workflowType and e.massTag IS NOT NULL",
						Tickethops.class);
				query.setParameter("workflowType", workflowType.toLowerCase());
			} else if (workflowType != null) {
				query = entityManager.createQuery(
						"SELECT e FROM Tickethops e where LOWER(e.status) IN (:status, :statusTwo) "
								+ "and LOWER(e.lockedBy)=:lockedBy and LOWER(e.wfheader.type)=:workflowType",
						Tickethops.class);
				query.setParameter("workflowType", workflowType.toLowerCase());
			} else if (onlyMasstag != null) {
				query = entityManager
						.createQuery(
								"SELECT e FROM Tickethops e where LOWER(e.status) IN (:status, :statusTwo) "
										+ "and LOWER(e.lockedBy)=:lockedBy and e.massTag IS NOT NULL",
								Tickethops.class);
			}

			query.setParameter("status", statusOne.toLowerCase());
			query.setParameter("statusTwo", statusTwo.toLowerCase());
			query.setParameter("lockedBy", lockedBy.toLowerCase());
			return (List<Tickethops>) query.getResultList();
		} catch (RuntimeException re) {
			throw re;
		}
	}

	public List<Tickethops> findByLockedby(String userName, String workflowType, String onlyMasstag) {
		try {
			Query query = null;
			// Check if WorkflowType and only Masstag is sent
			if (workflowType == null && onlyMasstag == null) {
				query = entityManager.createQuery(
						"SELECT e FROM Tickethops e where "
								+ "LOWER(e.lockedBy)=:lockedBy and LOWER(e.status) NOT IN ('done','closed')",
						Tickethops.class);
			} else if (workflowType != null && onlyMasstag != null) {
				query = entityManager.createQuery(
						"SELECT e FROM Tickethops e where "
								+ "LOWER(e.lockedBy)=:lockedBy and LOWER(e.status) NOT IN ('done','closed') and LOWER(e.wfheader.type)=:workflowType and e.massTag IS NOT NULL",
						Tickethops.class);
				query.setParameter("workflowType", workflowType.toLowerCase());
			} else if (workflowType != null) {
				query = entityManager.createQuery(
						"SELECT e FROM Tickethops e where "
								+ "LOWER(e.lockedBy)=:lockedBy and LOWER(e.status) NOT IN ('done','closed') and LOWER(e.wfheader.type)=:workflowType",
						Tickethops.class);
				query.setParameter("workflowType", workflowType.toLowerCase());
			} else if (onlyMasstag != null) {
				query = entityManager.createQuery(
						"SELECT e FROM Tickethops e where "
								+ "LOWER(e.lockedBy)=:lockedBy and LOWER(e.status) NOT IN ('done','closed') and e.massTag IS NOT NULL",
						Tickethops.class);
			}

			query.setParameter("lockedBy", userName.toLowerCase());
			return (List<Tickethops>) query.getResultList();
		} catch (RuntimeException re) {
			throw re;
		}
	}

	public List<Tickethops> findAllTickethops(String workflowType, String onlyMasstag) {
		try {
			Query query = null;
			// Check if WorkflowType and only Masstag is sent
			if (workflowType == null && onlyMasstag == null) {
				query = entityManager
						.createQuery("SELECT e FROM Tickethops e where LOWER(e.status) NOT IN ('done','closed')");
			} else if (workflowType != null && onlyMasstag != null) {
				query = entityManager.createQuery(
						"SELECT e FROM Tickethops e where LOWER(e.status) NOT IN ('done','closed') and LOWER(e.wfheader.type)=:workflowType and e.massTag IS NOT NULL");
				query.setParameter("workflowType", workflowType.toLowerCase());
			} else if (workflowType != null) {
				query = entityManager.createQuery(
						"SELECT e FROM Tickethops e where LOWER(e.status) NOT IN ('done','closed') and LOWER(e.wfheader.type)=:workflowType");
				query.setParameter("workflowType", workflowType.toLowerCase());
			} else if (onlyMasstag != null) {
				query = entityManager.createQuery(
						"SELECT e FROM Tickethops e where LOWER(e.status) NOT IN ('done','closed') and e.massTag IS NOT NULL");
			}

			return query.getResultList();
		} catch (Exception e) {
			throw e;
		}
	}

	public List<Tickethops> findAllTickethopsByFilteredStatus(String status, String workflowType, String onlyMasstag) {
		try {
			Query query = null;
			// Check if WorkflowType and only Masstag is sent
			if (workflowType == null && onlyMasstag == null) {
				// If status is "Open" or "RequestForCloser" we need to fetch
				// all data with status "Open" and "RequestForCloser"
				if (StringUtils.equalsIgnoreCase(status, "open")) {
					query = entityManager.createQuery(
							"SELECT e FROM Tickethops e where LOWER(e.status) in ('requestforcloser',:status)",
							Tickethops.class);
				} else if (StringUtils.equalsIgnoreCase(status, "requestforcloser")) {
					query = entityManager.createQuery(
							"SELECT e FROM Tickethops e where LOWER(e.status) in ('open',:status)", Tickethops.class);
				} else {
					query = entityManager.createQuery("SELECT e FROM Tickethops e where " + "LOWER(e.status)=:status",
							Tickethops.class);
				}
			} else if (workflowType != null && onlyMasstag != null) {
				// If status is "Open" or "RequestForCloser" we need to fetch
				// all data with status "Open" and "RequestForCloser"
				if (StringUtils.equalsIgnoreCase(status, "open")) {
					query = entityManager.createQuery(
							"SELECT e FROM Tickethops e where LOWER(e.status) in ('requestforcloser',:status) and LOWER(e.wfheader.type)=:workflowType and e.massTag IS NOT NULL",
							Tickethops.class);
				} else if (StringUtils.equalsIgnoreCase(status, "requestforcloser")) {
					query = entityManager.createQuery(
							"SELECT e FROM Tickethops e where LOWER(e.status) in ('open',:status) and LOWER(e.wfheader.type)=:workflowType and e.massTag IS NOT NULL",
							Tickethops.class);
				} else {
					query = entityManager.createQuery(
							"SELECT e FROM Tickethops e where "
									+ "LOWER(e.status)=:status and LOWER(e.wfheader.type)=:workflowType and e.massTag IS NOT NULL",
							Tickethops.class);
				}

				query.setParameter("workflowType", workflowType.toLowerCase());
			} else if (workflowType != null) {
				// If status is "Open" or "RequestForCloser" we need to fetch
				// all data with status "Open" and "RequestForCloser"
				if (StringUtils.equalsIgnoreCase(status, "open")) {
					query = entityManager.createQuery(
							"SELECT e FROM Tickethops e where LOWER(e.status) in ('requestforcloser',:status) and LOWER(e.wfheader.type)=:workflowType",
							Tickethops.class);
				} else if (StringUtils.equalsIgnoreCase(status, "requestforcloser")) {
					query = entityManager.createQuery(
							"SELECT e FROM Tickethops e where LOWER(e.status) in ('open',:status) and LOWER(e.wfheader.type)=:workflowType",
							Tickethops.class);
				} else {
					query = entityManager.createQuery(
							"SELECT e FROM Tickethops e where "
									+ "LOWER(e.status)=:status and LOWER(e.wfheader.type)=:workflowType",
							Tickethops.class);
				}

				query.setParameter("workflowType", workflowType.toLowerCase());
			} else if (onlyMasstag != null) {
				// If status is "Open" or "RequestForCloser" we need to fetch
				// all data with status "Open" and "RequestForCloser"
				if (StringUtils.equalsIgnoreCase(status, "open")) {
					query = entityManager.createQuery(
							"SELECT e FROM Tickethops e where LOWER(e.status) in ('requestforcloser',:status) and e.massTag IS NOT NULL",
							Tickethops.class);
				} else if (StringUtils.equalsIgnoreCase(status, "requestforcloser")) {
					query = entityManager.createQuery(
							"SELECT e FROM Tickethops e where LOWER(e.status) in ('open',:status) and e.massTag IS NOT NULL",
							Tickethops.class);
				} else {
					query = entityManager.createQuery(
							"SELECT e FROM Tickethops e where " + "LOWER(e.status)=:status and e.massTag IS NOT NULL",
							Tickethops.class);
				}
			}

			query.setParameter("status", status.toLowerCase());
			return (List<Tickethops>) query.getResultList();
		} catch (RuntimeException re) {
			throw re;
		}
	}

	public List<Tickethops> findAllTickethopsByStatus(String status, String workflowType, String onlyMasstag) {
		try {
			Query query = null;
			// Check if WorkflowType and only Masstag is sent
			if (workflowType == null && onlyMasstag == null) {
				query = entityManager.createQuery("SELECT e FROM Tickethops e where " + "LOWER(e.status)=:status",
						Tickethops.class);
			} else if (workflowType != null && onlyMasstag != null) {
				query = entityManager.createQuery(
						"SELECT e FROM Tickethops e where "
								+ "LOWER(e.status)=:status and LOWER(e.wfheader.type)=:workflowType and e.massTag IS NOT NULL",
						Tickethops.class);
				query.setParameter("workflowType", workflowType.toLowerCase());
			} else if (workflowType != null) {
				query = entityManager.createQuery("SELECT e FROM Tickethops e where "
						+ "LOWER(e.status=:status) and LOWER(e.wfheader.type)=:workflowType", Tickethops.class);
				query.setParameter("workflowType", workflowType.toLowerCase());
			} else if (onlyMasstag != null) {
				query = entityManager.createQuery(
						"SELECT e FROM Tickethops e where " + "LOWER(e.status=:status) and e.massTag IS NOT NULL",
						Tickethops.class);
			}
			query.setParameter("status", status.toLowerCase());
			return (List<Tickethops>) query.getResultList();
		} catch (RuntimeException re) {
			throw re;
		}
	}

	// find All Tickethops By two Status
	public List<Tickethops> findAllTickethopsByTwoStatus(String statusOne, String statusTwo, String workflowType,
			String onlyMasstag) {
		try {
			Query query = null;
			// Check if WorkflowType and only Masstag is sent
			if (workflowType == null && onlyMasstag == null) {
				query = entityManager.createQuery(
						"SELECT e FROM Tickethops e where " + "LOWER(e.status) IN (:statusOne,:statusTwo)",
						Tickethops.class);
			} else if (workflowType != null && onlyMasstag != null) {
				query = entityManager.createQuery(
						"SELECT e FROM Tickethops e where "
								+ "LOWER(e.status) IN (:statusOne,:statusTwo) and LOWER(e.wfheader.type)=:workflowType and e.massTag IS NOT NULL",
						Tickethops.class);
				query.setParameter("workflowType", workflowType.toLowerCase());
			} else if (workflowType != null) {
				query = entityManager.createQuery(
						"SELECT e FROM Tickethops e where "
								+ "LOWER(e.status) IN (:statusOne,:statusTwo) and LOWER(e.wfheader.type)=:workflowType",
						Tickethops.class);
				query.setParameter("workflowType", workflowType.toLowerCase());
			} else if (onlyMasstag != null) {
				query = entityManager.createQuery(
						"SELECT e FROM Tickethops e where "
								+ "LOWER(e.status) IN (:statusOne,:statusTwo) and e.massTag IS NOT NULL",
						Tickethops.class);
			}
			query.setParameter("statusOne", statusOne.toLowerCase());
			query.setParameter("statusTwo", statusTwo.toLowerCase());
			return (List<Tickethops>) query.getResultList();
		} catch (RuntimeException re) {
			throw re;
		}
	}

	public List<Tickethops> findAllTickethopsByOpenHoldStatus() {
		try {
			Query query = entityManager.createQuery(
					"SELECT e FROM Tickethops e where LOWER(e.status) IN ('open','hold') and "
					+ "(LOWER(e.groupSlastatus) = 'alarming' or e.groupSlastatus IS NULL)", Tickethops.class);
			// query.setParameter("status", status);
			return (List<Tickethops>) query.getResultList();
		} catch (RuntimeException re) {
			throw re;
		}
	}

	public HashMap<String, Long> findAllTicketCountByFilteredStatus(int userGroupId) {
		HashMap<String, Long> totalTicketCount = new HashMap<>();
		try {
			Query query = entityManager.createQuery("SELECT count(e) from Tickethops e where LOWER(e.status)='open'"
					+ " and e.usergroupByNextUserGroupId.userGroupId=:userGroupId");
			query.setParameter("userGroupId", userGroupId);
			totalTicketCount.put("totalOpen", (long) query.getSingleResult());

			query = entityManager.createQuery("SELECT count(e) from Tickethops e where LOWER(e.status)='hold'"
					+ " and e.usergroupByNextUserGroupId.userGroupId=:userGroupId");
			query.setParameter("userGroupId", userGroupId);
			totalTicketCount.put("totalHold", (long) query.getSingleResult());

			query = entityManager.createQuery("SELECT count(e) from Tickethops e where LOWER(e.status)='closed' "
					+ "and e.usergroupByNextUserGroupId.userGroupId=:userGroupId");
			query.setParameter("userGroupId", userGroupId);
			totalTicketCount.put("totalClosed", (long) query.getSingleResult());

			query = entityManager
					.createQuery("SELECT count(e) from Tickethops e where LOWER(e.status)='requestforcloser'"
							+ " and e.usergroupByNextUserGroupId.userGroupId=:userGroupId");
			query.setParameter("userGroupId", userGroupId);
			totalTicketCount.put("totalRequestForCloser", (long) query.getSingleResult());

			return totalTicketCount;
		} catch (RuntimeException re) {
			throw re;
		}

	}

	public List<Tickethops> findByTicketNumber(String ticketNumber) {
		log.debug("getting Ticketsummary instance with number: " + ticketNumber);
		try {
			Query query = entityManager.createQuery(
					"SELECT e FROM Tickethops e where LOWER(e.ticketNumber)=:ticketNumber", Tickethops.class);
			query.setParameter("ticketNumber", ticketNumber.toLowerCase());
			return (List<Tickethops>) query.getResultList();
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}
	public List<Tickethops> findByTicket(String ticketNumber) {
		log.debug("getting Ticketsummary instance with number: " + ticketNumber);
		try {
			Query query = entityManager.createQuery(
					"SELECT e FROM Tickethops e where LOWER(e.ticketNumber)=:ticketNumber", Tickethops.class);
			query.setParameter("ticketNumber", ticketNumber.toLowerCase());
			return (List<Tickethops>) query.getResultList();
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}
	public List<Integer> findSubgroupIdListByTickethopsId(int ticketHopsId) {
		try {
			Query query = entityManager.createQuery(
					"SELECT e.usergroupByNextUserGroupId.userGroupId FROM Tickethops e where e.subGroupParentHopId=:ticketHopsId and LOWER(e.status) NOT IN ('done','closed')");
			query.setParameter("ticketHopsId", ticketHopsId);
			List<Integer> resultList = query.getResultList();
			return resultList;
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}

	public void insertCloneTickethopsAndUpdateOriginal(Tickethops tickethops, Wfheader wfheader,
			Issuesolutioncategorymap issuesolutioncategorymap, String userName, Date groupSla, Date divisionSla) {
		boolean setDivisionLevelSla = false;
		try {
			// Insert clone row with some changes
			Tickethops newTickethops = new Tickethops();
//			// To Update DivisionLevelSla or not
//			if (!StringUtils.equalsIgnoreCase(tickethops.getUsergroupByNextUserGroupId().getDivision(),
//					wfheader.getUsergroup().getDivision())) {
//				setDivisionLevelSla = true;
//			}
			newTickethops.setIssuesolutioncategorymap(issuesolutioncategorymap);
			newTickethops.setUsergroupByPreviousUserGroupId(tickethops.getUsergroupByNextUserGroupId());
			newTickethops.setUsergroupByNextUserGroupId(wfheader.getUsergroup());
			newTickethops.setWfheader(wfheader);
			newTickethops.setTicketsummary(tickethops.getTicketsummary());
			newTickethops.setTicketNumber(tickethops.getTicketNumber());
			newTickethops.setUserDivision(tickethops.getUserDivision());
			newTickethops.setMassTag(tickethops.getMassTag());
			newTickethops.setMassTagStatus(tickethops.getMassTagStatus());
			newTickethops.setIsLocked("No");
			newTickethops.setLockedBy(null);
			newTickethops.setTaskCompletedby(null);
			newTickethops.setTaskCompletionDate(null);
			newTickethops.setSolutionConstraint(tickethops.getSolutionConstraint());
			newTickethops.setSelectedSolution(tickethops.getSelectedSolution());
			// Update SLA
			newTickethops.setGroupSladate(groupSla);
			newTickethops.setDivisionE2esladate(divisionSla);
//			if (setDivisionLevelSla) {
//				newTickethops.setDivisionE2esladate(divisionSla);
//			}
			newTickethops.setTaskCreatedBy(userName);
			newTickethops.setTaskCreationDate(new Date());
			newTickethops.setWfline(null);
			newTickethops.setStatus("Open");
			entityManager.persist(newTickethops);

			// Close the original ticket
			tickethops.setStatus("Done");
			tickethops.setTaskCompletedby(userName);
			tickethops.setTaskCompletionDate(new Date());
			entityManager.merge(tickethops);
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}

	public List<String> findPreviousUsergroupnamesOfTicket(String ticketNumber) {
		try {
			Query query = entityManager.createQuery(
					"SELECT e.usergroupByNextUserGroupId.name FROM Tickethops e where e.ticketNumber=:ticketNumber and LOWER(e.status) = 'done'");
			query.setParameter("ticketNumber", ticketNumber);
			List<String> resultList = query.getResultList();
			return resultList;
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}

	public boolean isTicketLocked(int ticketHopsId) {
		try {
			Query query = entityManager.createQuery(
					"SELECT e.isLocked FROM Tickethops e where e.ticketHopsId=:ticketHopsId", String.class);
			query.setParameter("ticketHopsId", ticketHopsId);
			String result = (String) query.getSingleResult();
			if (StringUtils.equalsIgnoreCase(result, "yes")) {
				return true;
			} else {
				return false;
			}
		} catch (RuntimeException re) {
			throw re;
		}
	}

	public boolean isTicketStatusUpdatable(int ticketHopsId, String actionType) {
		try {
			Query query = entityManager
					.createQuery("SELECT e.status FROM Tickethops e where e.ticketHopsId=:ticketHopsId", String.class);
			query.setParameter("ticketHopsId", ticketHopsId);
			String result = (String) query.getSingleResult();

			if (actionType.equalsIgnoreCase("hold")) {
				if (StringUtils.equalsIgnoreCase(result, "open")) {
					return true;
				} else {
					return false;
				}
			} else if (actionType.equalsIgnoreCase("release")) {
				if (StringUtils.equalsIgnoreCase(result, "hold")) {
					return true;
				} else {
					return false;
				}
			} else if (actionType.equalsIgnoreCase("closed")) {
				if (StringUtils.equalsIgnoreCase(result, "open")
						|| StringUtils.equalsIgnoreCase(result, "requestforcloser")) {
					return true;
				} else {
					return false;
				}
			}

			return true;
		} catch (RuntimeException re) {
			throw re;
		}
	}

	public boolean isActionValid(int ticketHopsId, String actionType) {
		try {
			Query query = entityManager
					.createQuery("SELECT e.status FROM Tickethops e where e.ticketHopsId=:ticketHopsId", String.class);
			query.setParameter("ticketHopsId", ticketHopsId);
			String result = (String) query.getSingleResult();

			if (actionType.equalsIgnoreCase("open")) {
				if (StringUtils.equalsIgnoreCase(result, "open") || StringUtils.equalsIgnoreCase(result, "requestforcloser")) {
					return true;
				} else {
					return false;
				}
			} else if (actionType.equalsIgnoreCase("requestforcloser")) {
				if (StringUtils.equalsIgnoreCase(result, "open") || StringUtils.equalsIgnoreCase(result, "reopen")
						|| StringUtils.equalsIgnoreCase(result, "requestforcloser")) {
					return true;
				} else {
					return false;
				}
			} else if (actionType.equalsIgnoreCase("reopen")) {
				if (StringUtils.equalsIgnoreCase(result, "reopen")
						|| StringUtils.equalsIgnoreCase(result, "requestforcloser")) {
					return true;
				} else {
					return false;
				}
			} else if (actionType.equalsIgnoreCase("rollback")) {
				if (StringUtils.equalsIgnoreCase(result, "reopen")
						|| StringUtils.equalsIgnoreCase(result, "open")) {
					return true;
				} else {
					return false;
				}
			}

			return true;
		} catch (RuntimeException re) {
			throw re;
		}
	}

	public Tickethops findPreviousTicket(String ticketNumber) {
		try {
			Query query = entityManager.createQuery(
					"SELECT e FROM Tickethops e where e.ticketNumber=:ticketNumber and LOWER(e.status) = 'done' order by e.ticketHopsId DESC",
					Tickethops.class);
			query.setParameter("ticketNumber", ticketNumber);
			query.setMaxResults(1);
			return (Tickethops) query.getSingleResult();
		} catch (RuntimeException re) {
			throw re;
		}
	}
	
		public List getLastHopsByTicketnumber(String ticketNumber) {
		try {
			Query query = entityManager.createNativeQuery(
					"select max(e.TicketHopsID) from tickethops e where  e.TicketNumber  = '"+ticketNumber.trim()+"' and e.status = 'Done'");
			return query.getResultList();
		} catch (RuntimeException re) {
			throw re;
		}
	}
	
		public Tickethops getLastHopsByTicketnumberSingle(String ticketNumber) {
			try {
				Query query = entityManager.createQuery(
						"select e from Tickethops e where  e.ticketNumber=:ticketNumber order by e.ticketHopsId DESC");
				query.setParameter("ticketNumber", ticketNumber);
				return (Tickethops) query.getResultList().get(0);
			} catch (RuntimeException re) {
				throw re;
			}
		}
	
		public void updateTicketHopsForPreviousHop(){
			 try {
			    	//Usergroup previousUG =  usergroupHome.findById(115);
			           Query query = entityManager.createQuery("update Tickethops th set th.usergroupByPreviousUserGroupId.userGroupId = 115 where th.usergroupByPreviousUserGroupId.userGroupId is null");
			           int res = query.executeUpdate();
			           System.out.println("Update Successfull for Ticket Hops. Total: " + res);
			    } catch (RuntimeException re) {
			           //log.error("get failed", re);
			           throw re;
			    }
		}
		
}
