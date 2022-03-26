package com.tts.web.nms.dao;
// Generated May 2, 2016 12:48:02 PM by Hibernate Tools 5.1.0.Alpha1

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.tts.web.nms.model.User;
import com.tts.web.nms.model.Usergroup;

/**
 * Home object for domain model class User.
 * @see GEN.User
 * @author Hibernate Tools
 */
@Repository
@Transactional
public class UserHome {

	private static final Log log = LogFactory.getLog(UserHome.class);

	@PersistenceContext
	private EntityManager entityManager;

	public void persist(User transientInstance) {
		log.debug("persisting User instance");
		try {
			entityManager.persist(transientInstance);
			log.debug("persist successful");
		} catch (RuntimeException re) {
			log.error("persist failed", re);
			throw re;
		}
	}

	public void remove(User persistentInstance) {
		log.debug("removing User instance");
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

	public User merge(User detachedInstance) {
		log.debug("merging User instance");
		try {
			User result = entityManager.merge(detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	public User findById(Integer id) {
		log.debug("getting User instance with id: " + id);
		try {
			User instance = entityManager.find(User.class, id);
			log.debug("get successful");
			return instance;
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
		
	}
	public User findByNetworkId(String networkId) {
		try {
			 Query query1 = entityManager.createQuery("Select e from User e where e.networkId='"+networkId+"'");
			 User result = (User) query1.getSingleResult();
			log.debug("get successful");
			return result;
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}
	public List<User> findAllUsers() {
		try {
			Query query = entityManager.createQuery("SELECT  e FROM User e");
			return query.getResultList();
		} catch (RuntimeException re) {
			re.printStackTrace();
			throw re;
		}
	  }
	public User findUserByID(int userId) {
		try {
			Query query = entityManager.createQuery("SELECT  e FROM User e where e.userId="+userId+"");
			return (User) query.getSingleResult();
		} catch (RuntimeException re) {
			re.printStackTrace();
			throw re;
		}
	  }
}
