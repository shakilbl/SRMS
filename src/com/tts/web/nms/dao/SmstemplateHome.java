package com.tts.web.nms.dao;
// Generated May 10, 2016 1:21:17 PM by Hibernate Tools 5.1.0.Alpha1

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.tts.web.nms.model.Smstemplate;
import com.tts.web.nms.model.Thana;
import com.tts.web.nms.model.Tickethops;
import com.tts.web.nms.model.Vipnumber;

/**
 * Home object for domain model class Smstemplate.
 * 
 * @see GEN.Smstemplate
 * @author Hibernate Tools
 */
@Repository
@Transactional
public class SmstemplateHome {

	private static final Log log = LogFactory.getLog(SmstemplateHome.class);

	@PersistenceContext
	private EntityManager entityManager;

	public void persist(Smstemplate transientInstance) {
		log.debug("persisting Smstemplate instance");
		try {
			entityManager.persist(transientInstance);
			log.debug("persist successful");
		} catch (RuntimeException re) {
			log.error("persist failed", re);
			throw re;
		}
	}

	public void remove(Smstemplate persistentInstance) {
		log.debug("removing Smstemplate instance");
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

	public Smstemplate merge(Smstemplate detachedInstance) {
		log.debug("merging Smstemplate instance");
		try {
			Smstemplate result = entityManager.merge(detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	public Smstemplate findById(Integer id) {
		log.debug("getting Smstemplate instance with id: " + id);
		try {
			Smstemplate instance = entityManager.find(Smstemplate.class, id);
			log.debug("get successful");
			return instance;
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}

	public List<Smstemplate> findAllSms() {
		Query query = entityManager.createQuery("SELECT e FROM Smstemplate e");
		return query.getResultList();
	}

	public String findSmsbodyByFlag(String flag) {
		try {
			Query query = entityManager.createQuery("SELECT e.body FROM Smstemplate e where LOWER(e.flag)=:flag",
					String.class);
			query.setParameter("flag", flag);
			return (String) query.getSingleResult();
		} catch (RuntimeException re) {
			throw re;
		}

	}
	public Smstemplate findByName(String body) {
		try {
			 Query query1 = entityManager.createQuery("Select e from Smstemplate e where e.body='"+body+"'");
			 Smstemplate result = (Smstemplate) query1.getSingleResult();
			log.debug("get successful");
			return result;
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}

}
