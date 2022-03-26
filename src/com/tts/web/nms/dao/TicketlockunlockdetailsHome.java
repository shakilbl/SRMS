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

import com.tts.web.nms.model.Ticketlockunlockdetails;
import com.tts.web.nms.model.Ticketsummary;

/**
 * Home object for domain model class Ticketlockunlockdetails.
 * @see GEN.Ticketlockunlockdetails
 * @author Hibernate Tools
 */
@Repository
@Transactional
public class TicketlockunlockdetailsHome {

	private static final Log log = LogFactory.getLog(TicketlockunlockdetailsHome.class);

	@PersistenceContext
	private EntityManager entityManager;

	public void persist(Ticketlockunlockdetails transientInstance) {
		log.debug("persisting Ticketlockunlockdetails instance");
		try {
			entityManager.persist(transientInstance);
			log.debug("persist successful");
		} catch (RuntimeException re) {
			log.error("persist failed", re);
			throw re;
		}
	}

	public void remove(Ticketlockunlockdetails persistentInstance) {
		log.debug("removing Ticketlockunlockdetails instance");
		try {
			entityManager.remove(persistentInstance);
			log.debug("remove successful");
		} catch (RuntimeException re) {
			log.error("remove failed", re);
			throw re;
		}
	}

	public Ticketlockunlockdetails merge(Ticketlockunlockdetails detachedInstance) {
		log.debug("merging Ticketlockunlockdetails instance");
		try {
			Ticketlockunlockdetails result = entityManager.merge(detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	public Ticketlockunlockdetails findById(Integer id) {
		log.debug("getting Ticketlockunlockdetails instance with id: " + id);
		try {
			Ticketlockunlockdetails instance = entityManager.find(Ticketlockunlockdetails.class, id);
			log.debug("get successful");
			return instance;
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}
	
	@SuppressWarnings("unchecked")
	public List<Ticketlockunlockdetails> findByTicketHopId(int ticketHopsId) {
		log.debug("getting tickethop instance with number: " + ticketHopsId);
		try {
			Query query = entityManager.createQuery("SELECT e FROM Ticketlockunlockdetails e where e.ticketHopsId=:ticketHopsId",Ticketlockunlockdetails.class);
			query.setParameter("ticketHopsId", ticketHopsId);
			return (List<Ticketlockunlockdetails>) query.getResultList();
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}
}
