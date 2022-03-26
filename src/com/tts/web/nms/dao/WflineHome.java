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

import com.tts.web.nms.model.Tickethops;
import com.tts.web.nms.model.User;
import com.tts.web.nms.model.Usergroup;
import com.tts.web.nms.model.Wfheader;
import com.tts.web.nms.model.Wfline;

/**
 * Home object for domain model class Wfline.
 * 
 * @see GEN.Wfline
 * @author Hibernate Tools
 */
@Repository
@Transactional
public class WflineHome {

	private static final Log log = LogFactory.getLog(WflineHome.class);

	@PersistenceContext
	private EntityManager entityManager;

	public void persist(Wfline transientInstance) {
		log.debug("persisting Wfline instance");
		try {
			entityManager.persist(transientInstance);
			log.debug("persist successful");
		} catch (RuntimeException re) {
			log.error("persist failed", re);
			throw re;
		}
	}

	public void remove(Wfline persistentInstance) {
		log.debug("removing Wfline instance");
		try {
			entityManager.remove(entityManager.contains(persistentInstance) ? persistentInstance
					: entityManager.merge(persistentInstance));
			log.debug("remove successful");
		} catch (RuntimeException re) {
			log.error("remove failed", re);
			throw re;
		}
	}

	public Wfline merge(Wfline detachedInstance) {
		log.debug("merging Wfline instance");
		try {
			Wfline result = entityManager.merge(detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	public Wfline findById(Integer id) {
		log.debug("getting Wfline instance with id: " + id);
		try {
			Wfline instance = entityManager.find(Wfline.class, id);
			log.debug("get successful");
			return instance;
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}

	/*
	 * public List<Usergroup> findUsergroupsByUser(User user) { try { Query
	 * query = entityManager.createQuery(
	 * "SELECT e.usergroup FROM Wfline e where e.user=:user", Usergroup.class);
	 * query.setParameter("user", user); return (List<Usergroup>)
	 * query.getResultList(); } catch (RuntimeException re) { throw re; } }
	 */

	public List<Wfline> findAllline() {
		Query query = entityManager.createQuery("SELECT i FROM Wfline i");
		return query.getResultList();
	}

	public List<Usergroup> findAllUserGroup() {
		Query query = entityManager.createQuery("SELECT ii FROM Usergroup ii");
		return query.getResultList();
	}

	public List<Wfheader> findAllWfheader() {
		Query query = entityManager.createQuery("SELECT iii FROM Wfheader iii");
		return query.getResultList();
	}

	public List<Wfline> findByWFHeader(int WFHeaderId) {
		try {
			Query query = entityManager.createQuery(
					"SELECT e FROM Wfline e where e.wfheader.wfheaderId=:WFHeaderId order by e.lineNo",
					Tickethops.class);
			query.setParameter("WFHeaderId", WFHeaderId);
			return (List<Wfline>) query.getResultList();
		} catch (RuntimeException re) {
			throw re;
		}
	}

	public int findLowesLineNo(int WFHeaderId, int startingLineNo) {
		try {
			Query query = null;
			if (startingLineNo == 0) {
				query = entityManager.createQuery(
						"SELECT min(e.lineNo) FROM Wfline e where e.wfheader.wfheaderId=:WFHeaderId order by e.lineNo",
						Integer.class);
			} else {
				query = entityManager.createQuery(
						"SELECT min(e.lineNo) FROM Wfline e where e.wfheader.wfheaderId=:WFHeaderId and e.lineNo>:startingLineNo order by e.lineNo",
						Integer.class);
				query.setParameter("startingLineNo", startingLineNo);
			}
			query.setParameter("WFHeaderId", WFHeaderId);
			return (int) query.getSingleResult();
		} catch (RuntimeException re) {
			throw re;
		}
	}

	public int findPreviousLineNo(int WFHeaderId, int startingLineNo) {
		try {
			Query query = null;
			query = entityManager.createQuery(
					"SELECT max(e.lineNo) FROM Wfline e where e.wfheader.wfheaderId=:WFHeaderId and e.lineNo<:startingLineNo order by e.lineNo DESC",
					Integer.class);
			query.setParameter("startingLineNo", startingLineNo);
			query.setParameter("WFHeaderId", WFHeaderId);
			return (int) query.getSingleResult();
		} catch (RuntimeException re) {
			throw re;
		}
	}

	public List<Wfline> findByWFHeaderAndLineNo(int WFHeaderId, int LineNo) {
		try {
			Query query = entityManager.createQuery(
					"SELECT e FROM Wfline e where e.wfheader.wfheaderId=:WFHeaderId and e.lineNo=:LineNo order by e.lineNo",
					Wfline.class);
			query.setParameter("WFHeaderId", WFHeaderId);
			query.setParameter("LineNo", LineNo);
			return (List<Wfline>) query.getResultList();
		} catch (RuntimeException re) {
			throw re;
		}
	}

	public Object findByUGandUGPID(int getWfheaderId, int getUserGroupID, int getLineNo) {
		// TODO Auto-generated method stub
		Query query = entityManager.createQuery("SELECT max(e.wflineId) FROM Wfline e where e.wfheader.wfheaderId="
				+ getWfheaderId + " and e.usergroup.userGroupId=" + getUserGroupID + " and e.lineNo=" + getLineNo + "");
		return query.getSingleResult();
	}

}
