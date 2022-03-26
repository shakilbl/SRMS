package com.tts.web.nms.dao;
// Generated Jun 5, 2016 4:28:34 PM by Hibernate Tools 5.1.0.Alpha1

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.tts.web.nms.model.Issuesolutioncategorymap;
import com.tts.web.nms.model.Usergrouppageaccess;

/**
 * Home object for domain model class Usergrouppageaccess.
 * @see GEN.Usergrouppageaccess
 * @author Hibernate Tools
 */
@Repository
@Transactional
public class UsergrouppageaccessHome {

	private static final Log log = LogFactory.getLog(UsergrouppageaccessHome.class);

	@PersistenceContext
	private EntityManager entityManager;

	public void persist(Usergrouppageaccess transientInstance) {
		log.debug("persisting Usergrouppageaccess instance");
		try {
			entityManager.persist(transientInstance);
			log.debug("persist successful");
		} catch (RuntimeException re) {
			log.error("persist failed", re);
			throw re;
		}
	}

	public void remove(Usergrouppageaccess persistentInstance) {
		log.debug("removing Usergrouppageaccess instance");
		try {
			// entityManager.remove(persistentInstance);
						entityManager.remove(entityManager.contains(persistentInstance) ? persistentInstance
								: entityManager.merge(persistentInstance));
		} catch (RuntimeException re) {
			log.error("remove failed", re);
			throw re;
		}
	}

	public Usergrouppageaccess merge(Usergrouppageaccess detachedInstance) {
		log.debug("merging Usergrouppageaccess instance");
		try {
			Usergrouppageaccess result = entityManager.merge(detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	public Usergrouppageaccess findById(Integer id) {
		log.debug("getting Usergrouppageaccess instance with id: " + id);
		try {
			Usergrouppageaccess instance = entityManager.find(Usergrouppageaccess.class, id);
			log.debug("get successful");
			return instance;
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}

	public Object findByUGandUGPID(int getUsergrouppageID, int getUserGroupID) {
		// TODO Auto-generated method stub
		Query query = entityManager.createQuery("SELECT max(e.userGroupPageAccessId) FROM Usergrouppageaccess e where e.usergrouppage.userGroupPageId="+getUsergrouppageID+" and e.usergroup.userGroupId="+getUserGroupID+"");
		return query.getSingleResult();
	}
	public List<Usergrouppageaccess> findAllUsergroupaccesss() {
		Query query = entityManager.createQuery("SELECT e FROM Usergrouppageaccess e");
		return query.getResultList();
	}
}
