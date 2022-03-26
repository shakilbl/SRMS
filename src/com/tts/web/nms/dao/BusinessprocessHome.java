package com.tts.web.nms.dao;
// Generated Aug 29, 2016 10:39:12 AM by Hibernate Tools 5.1.0.Alpha1

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.tts.web.nms.model.Businessprocess;
import com.tts.web.nms.model.Circle;

/**
 * Home object for domain model class Businessprocess.
 * @see Phase_2_GEN.Businessprocess
 * @author Hibernate Tools
 */
@Repository
@Transactional
public class BusinessprocessHome {

	private static final Log log = LogFactory.getLog(BusinessprocessHome.class);

	@PersistenceContext
	private EntityManager entityManager;

	public void persist(Businessprocess transientInstance) {
		log.debug("persisting Businessprocess instance");
		try {
			entityManager.persist(transientInstance);
			log.debug("persist successful");
		} catch (RuntimeException re) {
			log.error("persist failed", re);
			throw re;
		}
	}

	public void remove(Businessprocess persistentInstance) {
		log.debug("removing Businessprocess instance");
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

	public Businessprocess merge(Businessprocess detachedInstance) {
		log.debug("merging Businessprocess instance");
		try {
			Businessprocess result = entityManager.merge(detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	public Businessprocess findById(Integer id) {
		log.debug("getting Businessprocess instance with id: " + id);
		try {
			Businessprocess instance = entityManager.find(Businessprocess.class, id);
			log.debug("get successful");
			return instance;
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}
	public Businessprocess findByName(String name) {
		try {
			 Query query1 = entityManager.createQuery("Select e from Businessprocess e where e.name='"+name+"'");
			 Businessprocess result = (Businessprocess) query1.getSingleResult();
			log.debug("get successful");
			return result;
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
}
	public List<Businessprocess> findAllBusiness() {
		try {
			Query query = entityManager.createQuery("SELECT  e FROM Businessprocess e");
			return query.getResultList();
		} catch (RuntimeException re) {
			re.printStackTrace();
			throw re;
		}
	  }
}
