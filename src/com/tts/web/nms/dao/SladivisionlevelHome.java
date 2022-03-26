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
import com.tts.web.nms.model.Slaendtoend;
import com.tts.web.nms.model.Slatasklevel;
import com.tts.web.nms.model.User;

/**
 * Home object for domain model class Sladivisionlevel.
 * @see GEN.Sladivisionlevel
 * @author Hibernate Tools
 */
@Repository
@Transactional
public class SladivisionlevelHome {

	private static final Log log = LogFactory.getLog(SladivisionlevelHome.class);

	@PersistenceContext
	private EntityManager entityManager;

	public void persist(Sladivisionlevel transientInstance) {
		log.debug("persisting Sladivisionlevel instance");
		try {
			entityManager.persist(transientInstance);
			log.debug("persist successful");
		} catch (RuntimeException re) {
			log.error("persist failed", re);
			throw re;
		}
	}

	public void remove(Sladivisionlevel persistentInstance) {
		log.debug("removing Sladivisionlevel instance");
	
			try {
				// entityManager.remove(persistentInstance);
							entityManager.remove(entityManager.contains(persistentInstance) ? persistentInstance
									: entityManager.merge(persistentInstance));
							log.debug("remove successful");
		} catch (RuntimeException re) {
			log.error("remove failed", re);
			throw re;
		}
	}

	public Sladivisionlevel merge(Sladivisionlevel detachedInstance) {
		log.debug("merging Sladivisionlevel instance");
		try {
			Sladivisionlevel result = entityManager.merge(detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	public Sladivisionlevel findById(Integer id) {
		log.debug("getting Sladivisionlevel instance with id: " + id);
		try {
			Sladivisionlevel instance = entityManager.find(Sladivisionlevel.class, id);
			log.debug("get successful");
			return instance;
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}
	
	public List<Sladivisionlevel> findAllSladivisionlevels() {
		try {
			Query query = entityManager.createQuery("SELECT  e FROM Sladivisionlevel e");
			return query.getResultList();
		} catch (RuntimeException re) {
			re.printStackTrace();
			throw re;
		}
	}
	
	public Sladivisionlevel findByCategoryIssueSolnVip(Integer issueSolutionCategoryMapId, String vipsla, String division) {
		try {
		    Query query = entityManager.createQuery("SELECT e FROM Sladivisionlevel e where e.issuesolutioncategorymap.issueSolutionCategoryMapId=:issueSolutionCategoryMapId "
		    		+ "and LOWER(e.vipsla)=:vipsla and e.toDivision=:division");
			query.setParameter("issueSolutionCategoryMapId", issueSolutionCategoryMapId);
			//query.setParameter("issueId", issueId);		 
			query.setParameter("vipsla", vipsla.toLowerCase());	
			query.setParameter("division", division);
			if(!query.getResultList().isEmpty())
			{
				return (Sladivisionlevel) query.getResultList().get(0);
			}
		    return null;
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}			
	
	public Sladivisionlevel findByCategoryIssueSolnLoyaltyIndicator(Integer issueSolutionCategoryMapId, String loyltyIndicator, String division) {
		try {
		    Query query = entityManager.createQuery("SELECT e FROM Sladivisionlevel e where e.issuesolutioncategorymap.issueSolutionCategoryMapId=:issueSolutionCategoryMapId "
		    		+ "and LOWER(e.loyaltyIndicator)=:loyltyIndicator and e.toDivision=:division");
			query.setParameter("issueSolutionCategoryMapId", issueSolutionCategoryMapId);
			//query.setParameter("issueId", issueId);		 
			query.setParameter("loyltyIndicator", loyltyIndicator.toLowerCase());
			query.setParameter("division", division);
			if(!query.getResultList().isEmpty())
			{
				return (Sladivisionlevel) query.getResultList().get(0);
			}
		    return null;
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}
	
	public Sladivisionlevel findByCategoryIssueSolnForGeneral(Integer issueSolutionCategoryMapId, String division) {
		try {
		    Query query = entityManager.createQuery("SELECT e FROM Sladivisionlevel e where e.issuesolutioncategorymap.issueSolutionCategoryMapId=:issueSolutionCategoryMapId "
		    		+ "and e.loyaltyIndicator='General' and e.toDivision=:division");
			query.setParameter("issueSolutionCategoryMapId", issueSolutionCategoryMapId);
			query.setParameter("division", division);
			if(!query.getResultList().isEmpty())
			{
				return (Sladivisionlevel) query.getResultList().get(0);
			}
		    return null;
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}	
	public Object findByISAndbsL(int getIssueSolutionCategoryMapId, String getBscodeOrStar,String getLoyaltyIndicator,String getFromDivision,String getToDivision) {
		
		Query query = entityManager.createQuery("SELECT max(e.divisionLevelSlaid) FROM Sladivisionlevel e where e.issuesolutioncategorymap.issueSolutionCategoryMapId="+getIssueSolutionCategoryMapId+"  and e.bscodeOrStar='"+getBscodeOrStar+"' and e.loyaltyIndicator='"+getLoyaltyIndicator+"'and e.fromDivision='"+getFromDivision+"'and e.toDivision='"+getToDivision+"' ");
		return query.getSingleResult();
	}
	public Object findByISAndV(int getIssueSolutionCategoryMapId, String getVipsla,String getFromDivision,String getToDivision) {
	
		Query query = entityManager.createQuery("SELECT max(e.divisionLevelSlaid) FROM Sladivisionlevel e where e.issuesolutioncategorymap.issueSolutionCategoryMapId="+getIssueSolutionCategoryMapId+"  and e.vipsla='"+getVipsla+"'and e.fromDivision='"+getFromDivision+"'and e.toDivision='"+getToDivision+"'");
		return query.getSingleResult();
	}
	
}
