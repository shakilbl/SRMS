package com.tts.web.nms.dao;
// Generated Jun 9, 2016 4:02:42 PM by Hibernate Tools 5.1.0.Alpha1

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.tts.web.nms.model.Usergroup;

/**
 * Home object for domain model class Usergroup.
 * 
 * @see GEN.Usergroup
 * @author Hibernate Tools
 */
@Repository
@Transactional
public class UsergroupHome {

	private static final Log log = LogFactory.getLog(UsergroupHome.class);

	@PersistenceContext
	private EntityManager entityManager;

	public void persist(Usergroup transientInstance) {
		log.debug("persisting Usergroup instance");
		try {
			entityManager.persist(transientInstance);
			log.debug("persist successful");
		} catch (RuntimeException re) {
			log.error("persist failed", re);
			throw re;
		}
	}

	public void remove(Usergroup persistentInstance) {
		log.debug("removing Usergroup instance");
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

	public Usergroup merge(Usergroup detachedInstance) {
		log.debug("merging Usergroup instance");
		try {
			Usergroup result = entityManager.merge(detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	public Usergroup findById(Integer id) {
		log.debug("getting Usergroup instance with id: " + id);
		try {
			Usergroup instance = entityManager.find(Usergroup.class, id);
			log.debug("get successful");
			return instance;
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}

	public Usergroup findByName(String usergroup) {
		try {
			Query query = entityManager.createQuery("SELECT e FROM Usergroup e where " + "e.name=:usergroup",
					Usergroup.class);
			query.setParameter("usergroup", usergroup);
			return (Usergroup) query.getSingleResult();
		} catch (RuntimeException re) {
			throw re;
		}
	}

	public List<Usergroup> findAllUsergroups() {
		Query query = entityManager.createQuery("SELECT e FROM Usergroup e");
		return query.getResultList();
	}

	public List<String> findAllUsergroupNames() {
		try {
			Query query = entityManager.createQuery("SELECT e.name FROM Usergroup e");
			return query.getResultList();
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}

	public Object findByDivision(String division) {
		try {
			Query query = entityManager
					.createQuery("SELECT distinct(e.division) FROM Usergroup e  where e.division='" + division + "'");
			Usergroup result = (Usergroup) query.getSingleResult();
			log.debug("get successful");
			return result;
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}

	@SuppressWarnings("unchecked")
	public List<Usergroup> findAllUsergroupsOfSOCBusinessProcess() {
		try {
			Query query = entityManager.createNativeQuery("SELECT * FROM usergroup ug, usergroupbusinessprocessmap ugb "+ 
					"WHERE ug.UserGroupID = ugb.UserGroupID "+
					"AND ugb.BusinessProcessID IN (6,7,8,9,10) ORDER BY ug.Name",Usergroup.class);
			return query.getResultList();
		} catch (Exception ex) {
			return null;
		}
	}
	
	// Added By Reazul. For avoiding current user group.
	@SuppressWarnings("unchecked")
	public List<Usergroup> findAllUsergroupsOfSOCBusinessProcessSAW(String currentUserGroup) {
		try {
			
			/*AND ugb.BusinessProcessID IN (6,7,8,9,10)*/
			Query query = entityManager.createNativeQuery("SELECT * FROM usergroup ug, usergroupbusinessprocessmap ugb "+ 
					"WHERE ug.UserGroupID = ugb.UserGroupID "+
					"AND ug.Name not in ('"+ currentUserGroup +"') ORDER BY ug.Name",Usergroup.class);
			return query.getResultList();
		} catch (Exception ex) {
			return null;
		}
	}

}
