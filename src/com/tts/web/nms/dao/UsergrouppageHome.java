package com.tts.web.nms.dao;
// Generated Jun 5, 2016 5:40:35 PM by Hibernate Tools 5.1.0.Alpha1

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.tts.web.nms.model.User;
import com.tts.web.nms.model.Usergrouppage;

/**
 * Home object for domain model class Usergrouppage.
 * @see GEN.Usergrouppage
 * @author Hibernate Tools
 */
@Repository
@Transactional
public class UsergrouppageHome {

	private static final Log log = LogFactory.getLog(UsergrouppageHome.class);

	@PersistenceContext
	private EntityManager entityManager;

	public void persist(Usergrouppage transientInstance) {
		log.debug("persisting Usergrouppage instance");
		try {
			entityManager.persist(transientInstance);
			log.debug("persist successful");
		} catch (RuntimeException re) {
			log.error("persist failed", re);
			throw re;
		}
	}

	public void remove(Usergrouppage persistentInstance) {
		log.debug("removing Usergrouppage instance");
		try {
			// entityManager.remove(persistentInstance);
						entityManager.remove(entityManager.contains(persistentInstance) ? persistentInstance
								: entityManager.merge(persistentInstance));
		} catch (RuntimeException re) {
			log.error("remove failed", re);
			throw re;
		}
	}

	public Usergrouppage merge(Usergrouppage detachedInstance) {
		log.debug("merging Usergrouppage instance");
		try {
			Usergrouppage result = entityManager.merge(detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	public Usergrouppage findById(Integer id) {
		log.debug("getting Usergrouppage instance with id: " + id);
		try {
			Usergrouppage instance = entityManager.find(Usergrouppage.class, id);
			log.debug("get successful");
			return instance;
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}
	public List<Usergrouppage> findAllUserpages() {
		try {
			Query query = entityManager.createQuery("SELECT  e FROM Usergrouppage e");
			return query.getResultList();
		} catch (RuntimeException re) {
			re.printStackTrace();
			throw re;
		}
	  }
}
