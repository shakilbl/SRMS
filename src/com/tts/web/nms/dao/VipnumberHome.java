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

import com.tts.web.nms.model.District;
import com.tts.web.nms.model.Ticketsummary;
import com.tts.web.nms.model.Vipnumber;

/**
 * Home object for domain model class Vipnumber.
 * 
 * @see GEN.Vipnumber
 * @author Hibernate Tools
 */
@Repository
@Transactional
public class VipnumberHome {

	private static final Log log = LogFactory.getLog(VipnumberHome.class);

	@PersistenceContext
	private EntityManager entityManager;

	public void persist(Vipnumber transientInstance) {
		log.debug("persisting Vipnumber instance");
		try {
			entityManager.persist(transientInstance);
			log.debug("persist successful");
		} catch (RuntimeException re) {
			log.error("persist failed", re);
			throw re;
		}
	}

	public void remove(Vipnumber persistentInstance) {
		log.debug("removing Vipnumber instance");
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
	
	public void removeByMSISDN(String msisdn) {
		log.debug("removing Vipnumber instance");
		try {
			Query query = entityManager.createQuery("DELETE FROM Vipnumber e where e.msisdn=:msisdn");
			query.setParameter("msisdn", msisdn);
			query.executeUpdate();
		} catch (RuntimeException re) {
			log.error("remove failed", re);
			throw re;
		}
	}

	public Vipnumber merge(Vipnumber detachedInstance) {
		log.debug("merging Vipnumber instance");
		try {
			Vipnumber result = entityManager.merge(detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	public Vipnumber findById(Integer id) {
		log.debug("getting Vipnumber instance with id: " + id);
		try {
			Vipnumber instance = entityManager.find(Vipnumber.class, id);
			log.debug("get successful");
			return instance;
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}

	public List<Vipnumber> findAllVipnumbers() {
		try {
			Query query = entityManager.createQuery("SELECT e FROM Vipnumber e");
			return query.getResultList();
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}
	public Vipnumber findByName(String msisdn) {
		try {
			 Query query1 = entityManager.createQuery("Select e from Vipnumber e where e.msisdn='"+msisdn+"'");
			 Vipnumber result = (Vipnumber) query1.getSingleResult();
			log.debug("get successful");
			return result;
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}
	@SuppressWarnings("finally")
	public boolean checkIfVipNumber(String msisdn) {
		log.debug("getting Ticketsummary instance with number: " + msisdn);
		boolean bool = false;
		try {
			Query query = entityManager.createQuery("SELECT e FROM Vipnumber e where e.msisdn=:msisdn",Vipnumber.class);
			query.setParameter("msisdn", msisdn);
			Vipnumber vipnumber = (Vipnumber) query.getResultList().get(0);
			if(vipnumber != null){
				bool = true;
			}
		} catch (RuntimeException re) {
			log.error("get failed", re);
			bool = false;
			throw re;
		}
		finally
		{			
			return bool;
		}
		
	}
}
