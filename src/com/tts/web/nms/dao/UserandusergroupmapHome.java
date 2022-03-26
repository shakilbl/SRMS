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
import com.tts.web.nms.model.Userandusergroupmap;
import com.tts.web.nms.model.Usergroup;

/**
 * Home object for domain model class Userandusergroupmap.
 * 
 * @see GEN.Userandusergroupmap
 * @author Hibernate Tools
 */
@Repository
@Transactional
public class UserandusergroupmapHome {

	private static final Log log = LogFactory.getLog(UserandusergroupmapHome.class);

	@PersistenceContext
	private EntityManager entityManager;

	public void persist(Userandusergroupmap transientInstance) {
		log.debug("persisting Userandusergroupmap instance");
		try {
			entityManager.persist(transientInstance);
			log.debug("persist successful");
		} catch (RuntimeException re) {
			log.error("persist failed", re);
			throw re;
		}
	}

	public void remove(Userandusergroupmap persistentInstance) {
		log.debug("removing Userandusergroupmap instance");
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

	public Userandusergroupmap merge(Userandusergroupmap detachedInstance) {
		log.debug("merging Userandusergroupmap instance");
		try {
			Userandusergroupmap result = entityManager.merge(detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	public Userandusergroupmap findById(Integer id) {
		log.debug("getting Userandusergroupmap instance with id: " + id);
		try {
			Userandusergroupmap instance = entityManager.find(Userandusergroupmap.class, id);
			log.debug("get successful");
			return instance;
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}

	public List<Usergroup> findUsergroupsByUser(User user) {
		try {
			Query query = entityManager.createQuery("SELECT e.usergroup FROM Userandusergroupmap e where e.user=:user",
					Usergroup.class);
			query.setParameter("user", user);
			return (List<Usergroup>) query.getResultList();
		} catch (RuntimeException re) {
			throw re;
		}
	}

	public List<Userandusergroupmap> findAllUsergroupmaps() {
		Query query = entityManager.createQuery("SELECT e FROM Userandusergroupmap e");
		return query.getResultList();
	}

	public List<User> findAllUsers() {
		Query query = entityManager.createQuery("SELECT e FROM User e");
		return query.getResultList();
	}

	public List<Usergroup> findAllUsergroups() {
		try {
			Query query = entityManager.createQuery("SELECT e FROM Usergroup e");
			return query.getResultList();
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}

	public Object findByUandUGID(int getUserId) {
		// TODO Auto-generated method stub
		Query query = entityManager
				.createQuery("SELECT max(e.userAndUserGroupMapId) FROM Userandusergroupmap e where e.user.userId="
						+ getUserId +"");
		return query.getSingleResult();
	}

	public List<String> findUsernamesByUsergroupId(int userGroupId) {
		try {
			Query query = entityManager.createQuery(
					"SELECT e.user.networkId FROM Userandusergroupmap e where e.usergroup.userGroupId=:userGroupId",
					String.class);
			query.setParameter("userGroupId", userGroupId);
			return (List<String>) query.getResultList();
		} catch (RuntimeException re) {
			throw re;
		}
	}
 
		public List<Usergroup> findUsergroupsByNonFunctionalUser() {
			try {
				Query query = entityManager.createQuery("SELECT e FROM Usergroup e where e.name='FrontLine'",
						Usergroup.class);
				return (List<Usergroup>) query.getResultList();
			} catch (RuntimeException re) {
				throw re;
			}
		} 
		
		public List<Userandusergroupmap> findUserMobileNumber(int userGroupId) {
		Query query = entityManager
				.createQuery(
						"SELECT e FROM Userandusergroupmap e where e.usergroup.userGroupId = :userGroupId")
				.setParameter("userGroupId", userGroupId);
		return query.getResultList();
	}

}
