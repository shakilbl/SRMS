package com.tts.web.nms.dao;
// Generated Sep 1, 2016 8:41:54 AM by Hibernate Tools 5.1.0.Alpha1

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.tts.web.nms.model.Usergroup;
import com.tts.web.nms.model.Usergroupbusinessprocessmap;

/**
 * Home object for domain model class Usergroupbusinessprocessmap.
 * 
 * @see Phase_2_GEN.Usergroupbusinessprocessmap
 * @author Hibernate Tools
 */
@Repository
@Transactional
public class UsergroupbusinessprocessmapHome {

	private static final Log log = LogFactory.getLog(UsergroupbusinessprocessmapHome.class);

	@PersistenceContext
	private EntityManager entityManager;

	public void persist(Usergroupbusinessprocessmap transientInstance) {
		log.debug("persisting Usergroupbusinessprocessmap instance");
		try {
			entityManager.persist(transientInstance);
			log.debug("persist successful");
		} catch (RuntimeException re) {
			log.error("persist failed", re);
			throw re;
		}
	}

	public void remove(Usergroupbusinessprocessmap persistentInstance) {
		log.debug("removing Usergroupbusinessprocessmap instance");
		try {
			entityManager.remove(entityManager.contains(persistentInstance) ? persistentInstance
					: entityManager.merge(persistentInstance));
		} catch (RuntimeException re) {
			log.error("remove failed", re);
			throw re;
		}
	}

	public Usergroupbusinessprocessmap merge(Usergroupbusinessprocessmap detachedInstance) {
		log.debug("merging Usergroupbusinessprocessmap instance");
		try {
			Usergroupbusinessprocessmap result = entityManager.merge(detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	public Usergroupbusinessprocessmap findById(Integer id) {
		log.debug("getting Usergroupbusinessprocessmap instance with id: " + id);
		try {
			Usergroupbusinessprocessmap instance = entityManager.find(Usergroupbusinessprocessmap.class, id);
			log.debug("get successful");
			return instance;
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}

	public List<Usergroupbusinessprocessmap> findAllBsUsergroups() {
		try {
			Query query = entityManager.createQuery("SELECT e FROM Usergroupbusinessprocessmap e");
			return query.getResultList();
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}

	public Object findByUandUGID(int getBusinessProcessId, int getUserGroupID) {
		Query query = entityManager.createQuery(
				"SELECT max(e.userGroupBusinessProcessId) FROM Usergroupbusinessprocessmap e where e.businessprocess.businessProcessId="
						+ getBusinessProcessId + "and e.usergroup.userGroupId=" + getUserGroupID + "");
		return query.getSingleResult();
	}

	public List<Usergroupbusinessprocessmap> getBusinessProcessesByUsergroupId(int userGroupId) {
		try {
			Query query = entityManager.createQuery(
					"SELECT e FROM Usergroupbusinessprocessmap e where e.usergroup.userGroupId = " + userGroupId);
			return query.getResultList();
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}

}
