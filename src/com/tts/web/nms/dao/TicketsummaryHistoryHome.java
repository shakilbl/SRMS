package com.tts.web.nms.dao;
// Generated Dec 31, 2016 12:40:40 PM by Hibernate Tools 5.1.0.Alpha1

import java.util.List;
import javax.naming.InitialContext;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.LockMode;
import org.hibernate.SessionFactory;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.tts.web.nms.model.TicketsummaryHistory;

import static org.hibernate.criterion.Example.create;

/**
 * Home object for domain model class TicketsummaryHistory.
 * @see GEN.TicketsummaryHistory
 * @author Hibernate Tools
 */

public class TicketsummaryHistoryHome {

	private static final Log log = LogFactory.getLog(TicketsummaryHistoryHome.class);

	private final SessionFactory sessionFactory = getSessionFactory();

	protected SessionFactory getSessionFactory() {
		try {
			return (SessionFactory) new InitialContext().lookup("SessionFactory");
		} catch (Exception e) {
			log.error("Could not locate SessionFactory in JNDI", e);
			throw new IllegalStateException("Could not locate SessionFactory in JNDI");
		}
	}

	public void persist(TicketsummaryHistory transientInstance) {
		log.debug("persisting TicketsummaryHistory instance");
		try {
			sessionFactory.getCurrentSession().persist(transientInstance);
			log.debug("persist successful");
		} catch (RuntimeException re) {
			log.error("persist failed", re);
			throw re;
		}
	}

	public void attachDirty(TicketsummaryHistory instance) {
		log.debug("attaching dirty TicketsummaryHistory instance");
		try {
			sessionFactory.getCurrentSession().saveOrUpdate(instance);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	public void attachClean(TicketsummaryHistory instance) {
		log.debug("attaching clean TicketsummaryHistory instance");
		try {
			sessionFactory.getCurrentSession().lock(instance, LockMode.NONE);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	public void delete(TicketsummaryHistory persistentInstance) {
		log.debug("deleting TicketsummaryHistory instance");
		try {
			sessionFactory.getCurrentSession().delete(persistentInstance);
			log.debug("delete successful");
		} catch (RuntimeException re) {
			log.error("delete failed", re);
			throw re;
		}
	}

	public TicketsummaryHistory merge(TicketsummaryHistory detachedInstance) {
		log.debug("merging TicketsummaryHistory instance");
		try {
			TicketsummaryHistory result = (TicketsummaryHistory) sessionFactory.getCurrentSession()
					.merge(detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	public TicketsummaryHistory findById(java.lang.Integer id) {
		log.debug("getting TicketsummaryHistory instance with id: " + id);
		try {
			TicketsummaryHistory instance = (TicketsummaryHistory) sessionFactory.getCurrentSession()
					.get("GEN.TicketsummaryHistory", id);
			if (instance == null) {
				log.debug("get successful, no instance found");
			} else {
				log.debug("get successful, instance found");
			}
			return instance;
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}

	public List<TicketsummaryHistory> findByExample(TicketsummaryHistory instance) {
		log.debug("finding TicketsummaryHistory instance by example");
		try {
			List<TicketsummaryHistory> results = (List<TicketsummaryHistory>) sessionFactory.getCurrentSession()
					.createCriteria("GEN.TicketsummaryHistory").add(create(instance)).list();
			log.debug("find by example successful, result size: " + results.size());
			return results;
		} catch (RuntimeException re) {
			log.error("find by example failed", re);
			throw re;
		}
	}
}
