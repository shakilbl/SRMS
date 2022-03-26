package com.tts.web.nms.dao;
// Generated May 19, 2016 10:35:37 AM by Hibernate Tools 4.3.1.Final

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.tts.web.nms.model.Ticketattachment;
import com.tts.web.nms.model.Ticketcomments;
import com.tts.web.nms.model.Tickethops;

@Repository
@Transactional
public class TicketcommentsHome {

	private static final Log log = LogFactory.getLog(TicketcommentsHome.class);

	@PersistenceContext
	private EntityManager entityManager;

	public void persist(Ticketcomments transientInstance) {
		log.debug("persisting Ticketcomments instance");
		try {
			entityManager.persist(transientInstance);
			log.debug("persist successful");
		} catch (RuntimeException re) {
			log.error("persist failed", re);
			throw re;
		}
	}

	public void remove(Ticketcomments persistentInstance) {
		log.debug("removing Ticketcomments instance");
		try {
			entityManager.remove(persistentInstance);
			log.debug("remove successful");
		} catch (RuntimeException re) {
			log.error("remove failed", re);
			throw re;
		}
	}

	public Ticketcomments merge(Ticketcomments detachedInstance) {
		log.debug("merging Ticketcomments instance");
		try {
			Ticketcomments result = entityManager.merge(detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	public Ticketcomments findById(Integer id) {
		log.debug("getting Ticketcomments instance with id: " + id);
		try {
			Ticketcomments instance = entityManager.find(Ticketcomments.class, id);
			log.debug("get successful");
			return instance;
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}

	public List<Ticketcomments> findAll() {
		try {
			Query query = entityManager.createQuery("SELECT e FROM Ticketcomments e");
			return query.getResultList();
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}

	public List<String> findByTicketNumber(String ticketNumber) {
		try {
			Query query = entityManager
					.createQuery("SELECT concat(d.createdby,'-(',d.createddate,')- ',d.comments) FROM Ticketcomments d"
							+ " where LOWER(d.ticketNumber)=:ticketNumber", String.class);
			query.setParameter("ticketNumber", ticketNumber);
			return (List<String>) query.getResultList();
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}
	
	public Ticketcomments findByTicketHopsId(Integer ticketHopsId) {
		try {
			Query query = entityManager
					.createQuery("SELECT e FROM Ticketcomments e"
							+ " where e.tickethops.ticketHopsId=:ticketHopsId");
			query.setParameter("ticketHopsId", ticketHopsId);
			List<Ticketcomments> ticketcommentList = query.getResultList();			
			Ticketcomments ticketcomment = ticketcommentList.get(ticketcommentList.size()-1);			
			return ticketcomment;
		} catch (RuntimeException re) {
			log.error("get failed", re);
			//throw re;
			return null;
		}
	}
	
	public Ticketcomments findByTicketHops(Integer ticketHopsId) {
		try {
			Query query = entityManager
					.createQuery("SELECT e FROM Ticketcomments e"
							+ " where e.tickethops.ticketHopsId=:ticketHopsId");
			query.setParameter("ticketHopsId", ticketHopsId);
			return (Ticketcomments) query.getSingleResult();
		} catch (RuntimeException re) {
			log.error("get failed", re);
			//throw re;
			return null;
		}
	}
	
}
