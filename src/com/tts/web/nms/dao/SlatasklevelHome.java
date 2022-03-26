package com.tts.web.nms.dao;
// Generated May 26, 2016 2:07:41 PM by Hibernate Tools 5.1.0.Alpha1

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.tts.web.nms.model.Sladivisionlevel;
import com.tts.web.nms.model.Slatasklevel;
import com.tts.web.nms.model.User;

/**
 * Home object for domain model class Slatasklevel.
 * 
 * @see GEN.Slatasklevel
 * @author Hibernate Tools
 */
@Repository
@Transactional
public class SlatasklevelHome {

	private static final Log log = LogFactory.getLog(SlatasklevelHome.class);

	@PersistenceContext
	private EntityManager entityManager;

	public void persist(Slatasklevel transientInstance) {
		log.debug("persisting Slatasklevel instance");
		try {
			entityManager.persist(transientInstance);
			log.debug("persist successful");
		} catch (RuntimeException re) {
			log.error("persist failed", re);
			throw re;
		}
	}

	public void remove(Slatasklevel persistentInstance) {
		log.debug("removing Slatasklevel instance");
		try {
			// entityManager.remove(persistentInstance);
			entityManager.remove(entityManager.contains(persistentInstance) ? persistentInstance
					: entityManager.merge(persistentInstance));
		} catch (RuntimeException re) {
			log.error("remove failed", re);
			throw re;
		}
	}

	public Slatasklevel merge(Slatasklevel detachedInstance) {
		log.debug("merging Slatasklevel instance");
		try {
			Slatasklevel result = entityManager.merge(detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	public Slatasklevel findById(Integer id) {
		log.debug("getting Slatasklevel instance with id: " + id);
		try {
			Slatasklevel instance = entityManager.find(Slatasklevel.class, id);
			log.debug("get successful");
			return instance;
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}

	public List<Object> findAllSla(String getLoyaltyIndicator, int getIssueSolutionCategoryMapId, String getVipsla,
			int getUsergroupByGroupFrom, int getUsergroupByGroupTo) {
		if(getLoyaltyIndicator.equals("undefined")) 
			getLoyaltyIndicator = " is null";
		else {
			getLoyaltyIndicator = " = '" + getLoyaltyIndicator + "'";
		}
		try {
			Query query = entityManager.createQuery("SELECT  e FROM Slatasklevel e where e.loyltyIndicator "
					+ getLoyaltyIndicator + " and" + " e.issuesolutioncategorymap.issueSolutionCategoryMapId="
					+ getIssueSolutionCategoryMapId + "  and " + "e.vipsla='" + getVipsla
					+ "' and e.usergroupByGroupFrom.userGroupId='" + getUsergroupByGroupFrom
					+ "'and e.usergroupByGroupTo.userGroupId='" + getUsergroupByGroupTo + "'");
			return query.getResultList();
		} catch (RuntimeException re) {
			re.printStackTrace();
			throw re;
		}
	}

	public List<Slatasklevel> findAllSlatasklevels() {
		try {
			Query query = entityManager.createQuery("SELECT  e FROM Slatasklevel e");
			return query.getResultList();
		} catch (RuntimeException re) {
			re.printStackTrace();
			throw re;
		}
	}

	public Slatasklevel findByCategoryIssueSolnVip(Integer issueSolutionCategoryMapId, String vipsla) {
		try {
			Query query = entityManager.createQuery(
					"SELECT e FROM Slatasklevel e where e.issuesolutioncategorymap.issueSolutionCategoryMapId=:issueSolutionCategoryMapId "
							+ "and LOWER(e.vipsla)=:vipsla");
			query.setParameter("issueSolutionCategoryMapId", issueSolutionCategoryMapId);
			// query.setParameter("issueId", issueId);
			query.setParameter("vipsla", vipsla.toLowerCase());
			if (!query.getResultList().isEmpty()) {
				return (Slatasklevel) query.getResultList().get(0);
			}
			return null;
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}

	public Slatasklevel findByCategoryIssueSolnLoyaltyIndicator(Integer issueSolutionCategoryMapId,
			String loyltyIndicator) {
		try {
			Query query = entityManager.createQuery(
					"SELECT e FROM Slatasklevel e where e.issuesolutioncategorymap.issueSolutionCategoryMapId=:issueSolutionCategoryMapId "
							+ "and LOWER(e.loyltyIndicator)=:loyltyIndicator");
			query.setParameter("issueSolutionCategoryMapId", issueSolutionCategoryMapId);
			// query.setParameter("issueId", issueId);
			query.setParameter("loyltyIndicator", loyltyIndicator.toLowerCase());
			if (!query.getResultList().isEmpty()) {
				return (Slatasklevel) query.getResultList().get(0);
			}
			return null;
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}

	public Slatasklevel findByCategoryIssueSolnForGeneral(Integer issueSolutionCategoryMapId) {
		try {
			Query query = entityManager.createQuery(
					"SELECT e FROM Slatasklevel e where e.issuesolutioncategorymap.issueSolutionCategoryMapId=:issueSolutionCategoryMapId "
							+ "and e.loyaltyIndicator='' and e.vipsla=''");
			query.setParameter("issueSolutionCategoryMapId", issueSolutionCategoryMapId);
			if (!query.getResultList().isEmpty()) {
				return (Slatasklevel) query.getResultList().get(0);
			}
			return null;
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}

	// ********** From To Group *************** //
	public Slatasklevel findByCategoryIssueSolnVip(Integer issueSolutionCategoryMapId, String vipsla, int groupFrom,
			int groupTo) {
		try {
			Query query = entityManager.createQuery(
					"SELECT e FROM Slatasklevel e where e.issuesolutioncategorymap.issueSolutionCategoryMapId=:issueSolutionCategoryMapId "
							+ "and LOWER(e.vipsla)=:vipsla and e.usergroupByGroupFrom.userGroupId=:groupFrom and e.usergroupByGroupTo.userGroupId=:groupTo");
			query.setParameter("issueSolutionCategoryMapId", issueSolutionCategoryMapId);
			// query.setParameter("issueId", issueId);
			query.setParameter("vipsla", vipsla.toLowerCase());
			query.setParameter("groupFrom", groupFrom);
			query.setParameter("groupTo", groupTo);
			if (!query.getResultList().isEmpty()) {
				return (Slatasklevel) query.getResultList().get(0);
			}
			return null;
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}

	public Slatasklevel findByCategoryIssueSolnLoyaltyIndicator(Integer issueSolutionCategoryMapId,
			String loyltyIndicator, int groupFrom, int groupTo) {
		try {
			Query query = entityManager.createQuery(
					"SELECT e FROM Slatasklevel e where e.issuesolutioncategorymap.issueSolutionCategoryMapId=:issueSolutionCategoryMapId "
							+ "and LOWER(e.loyltyIndicator)=:loyltyIndicator  and e.usergroupByGroupFrom.userGroupId=:groupFrom "
							+ "and e.usergroupByGroupTo.userGroupId=:groupTo");
			query.setParameter("issueSolutionCategoryMapId", issueSolutionCategoryMapId);
			// query.setParameter("issueId", issueId);
			query.setParameter("loyltyIndicator", loyltyIndicator.toLowerCase());
			query.setParameter("groupFrom", groupFrom);
			query.setParameter("groupTo", groupTo);
			if (!query.getResultList().isEmpty()) {
				return (Slatasklevel) query.getResultList().get(0);
			}
			return null;
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}

	public Slatasklevel findByCategoryIssueSolnForGeneral(Integer issueSolutionCategoryMapId, int groupFrom,
			int groupTo) {
		try {
			Query query = entityManager.createQuery(
					"SELECT e FROM Slatasklevel e where e.issuesolutioncategorymap.issueSolutionCategoryMapId=:issueSolutionCategoryMapId "
							+ "and (e.loyltyIndicator = 'General' or e.loyltyIndicator IS NULL) and (e.vipsla = '' or e.vipsla IS NULL) and e.usergroupByGroupFrom.userGroupId=:groupFrom "
							+ "and e.usergroupByGroupTo.userGroupId=:groupTo");
			query.setParameter("issueSolutionCategoryMapId", issueSolutionCategoryMapId);
			query.setParameter("groupFrom", groupFrom);
			query.setParameter("groupTo", groupTo);
			if (!query.getResultList().isEmpty()) {
				return (Slatasklevel) query.getResultList().get(0);
			}
			return null;
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}

	public Object findByISAndbsL(int getIssueSolutionCategoryMapId, String getBscodeOrStar, String getLoyaltyIndicator,
			int getUsergroupByGroupFrom, int getUsergroupByGroupTo) {

		Query query = entityManager.createQuery(
				"SELECT max(e.slaid) FROM Slatasklevel e where e.issuesolutioncategorymap.issueSolutionCategoryMapId="
						+ getIssueSolutionCategoryMapId + "  and e.bscodeOrStar='" + getBscodeOrStar
						+ "' and e.loyltyIndicator='" + getLoyaltyIndicator
						+ "'and e.usergroupByGroupFrom.userGroupId='" + getUsergroupByGroupFrom
						+ "' and e.usergroupByGroupTo.userGroupId='" + getUsergroupByGroupTo + "' ");
		return query.getSingleResult();
	}

	public Object findByISAndV(int getIssueSolutionCategoryMapId, String getVipsla, int getUsergroupByGroupFrom,
			int getUsergroupByGroupTo) {

		Query query = entityManager.createQuery(
				"SELECT max(e.slaid) FROM Slatasklevel e where e.issuesolutioncategorymap.issueSolutionCategoryMapId="
						+ getIssueSolutionCategoryMapId + "  and e.vipsla='" + getVipsla
						+ "' and e.usergroupByGroupFrom.userGroupId='" + getUsergroupByGroupFrom
						+ "'and e.usergroupByGroupTo.userGroupId='" + getUsergroupByGroupTo + "'");
		return query.getSingleResult();
	}

}
