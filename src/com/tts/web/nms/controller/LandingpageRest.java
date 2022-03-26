package com.tts.web.nms.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.hibernate.metamodel.domain.NonEntity;
import org.smpp.client.SMPPSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.tts.web.nms.dao.BusinessprocessHome;
import com.tts.web.nms.dao.SladivisionlevelHome;
import com.tts.web.nms.dao.SlatasklevelHome;
import com.tts.web.nms.dao.SmstemplateHome;
import com.tts.web.nms.dao.TicketcommentsHome;
import com.tts.web.nms.dao.TickethopsHome;
import com.tts.web.nms.dao.TicketlockunlockdetailsHome;
import com.tts.web.nms.dao.TicketsummaryHome;
import com.tts.web.nms.dao.UserandusergroupmapHome;
import com.tts.web.nms.dao.UsergroupHome;
import com.tts.web.nms.dao.UsergroupbusinessprocessmapHome;
import com.tts.web.nms.dao.VipnumberHome;
import com.tts.web.nms.dao.WflineHome;
import com.tts.web.nms.model.Businessprocess;
import com.tts.web.nms.model.Sladivisionlevel;
import com.tts.web.nms.model.Slatasklevel;
import com.tts.web.nms.model.Ticketcomments;
import com.tts.web.nms.model.Tickethops;
import com.tts.web.nms.model.Ticketlockunlockdetails;
import com.tts.web.nms.model.Ticketsummary;
import com.tts.web.nms.model.Usergroup;
import com.tts.web.nms.model.Usergroupbusinessprocessmap;
import com.tts.web.nms.model.Vipnumber;
import com.tts.web.nms.model.Wfline;
import com.tts.web.nms.utility.MailSender;
import com.tts.web.nms.utility.SLA;
import com.tts.web.nms.utility.SessionUtility;
import com.tts.web.nms.wrapper.LandingPagePostWrapper;
import com.tts.web.nms.wrapper.LandingPageWrapper;
import com.tts.web.nms.wrapper.ResponseWrapper;

@RestController
public class LandingpageRest {
	@Autowired
	private TickethopsHome ticketdetailsDao;
	@Autowired
	private HttpSession httpSession;
	@Autowired
	private UsergroupHome usergroupDao;
	@Autowired
	private TicketcommentsHome ticketcommentsDao;
	@Autowired
	private TicketlockunlockdetailsHome ticketlockunlockdetailsDao;
	@Autowired
	private WflineHome wflineDao;
	@Autowired
	private UserandusergroupmapHome userandusergroupmapDao;
	@Autowired
	private SLA sla;
	@Autowired
	private SmstemplateHome smstemplateDao;
	@Autowired
	private TicketsummaryHome ticketsummaryDao;
	@Autowired
	private VipnumberHome vipnumberDao;
	@Autowired
	private UsergroupbusinessprocessmapHome usergroupbusinessprocessmapdao;
	@Autowired
	private TickethopsHome tickethopsHome;


	@RequestMapping(value = "/ticketdetails/", method = RequestMethod.GET)
	public ResponseEntity<List<Tickethops>> listAllTickethops() {
		List<Tickethops> ticketdetailList = ticketdetailsDao.findAllTickethops(null, null);
		if (ticketdetailList.isEmpty()) { // You many decide to return
											// HttpStatus.NOT_FOUND
			return new ResponseEntity<List<Tickethops>>(HttpStatus.NO_CONTENT);
		}
		System.out.println("ticketdetailList size: " + ticketdetailList.size());
		return new ResponseEntity<List<Tickethops>>(ticketdetailList, HttpStatus.OK);
	}

	@RequestMapping(value = "/ticketdetails/{ticket}/{status}/{workflowType}/{onlymasstag}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<LandingPageWrapper> listFilteredTickethops(@PathVariable("ticket") String ticket,
			@PathVariable("status") String status, @PathVariable("workflowType") String workflowType,
			@PathVariable("onlymasstag") String onlyMasstagTickets) {

		System.out.println("Request Params: " + ticket + " " + status + " " + workflowType + " " + onlyMasstagTickets);
		List<Tickethops> tickethops = null;
		List<Usergroup> usergroups = null;
		LandingPageWrapper landingPageWrapper = new LandingPageWrapper();
		String userName = null;
		String userRole = null;

		if (StringUtils.isEmpty(workflowType) || StringUtils.equalsIgnoreCase(workflowType, "null")
				|| StringUtils.equalsIgnoreCase(workflowType, "all")) {
			// If workflowType is null,all etc string, send null parameter in
			// dao methods
			workflowType = null;
		}
		if (StringUtils.isEmpty(onlyMasstagTickets) || StringUtils.equalsIgnoreCase(onlyMasstagTickets, "null")
				|| StringUtils.equalsIgnoreCase(onlyMasstagTickets, "all")) {
			// If onlyMasstag is null,all string, send null parameter in dao
			// methods
			onlyMasstagTickets = null;
		}

		try {
			try {
				/*
				 * // For testing only (load session)
				 * sessionUtility.loadUserInfoInSession();
				 */

				// Collect Usergroups
				userName = (String) httpSession.getAttribute("networkid");
				if (StringUtils.isNotEmpty(userName)) {
					usergroups = (List<Usergroup>) httpSession.getAttribute("UserGroup");
					if (!usergroups.isEmpty()) {
						// Take only one usergroup if user belongs to multiple
						// usergroups
						usergroups = usergroups.subList(0, 1);
					}
					userRole = (String) httpSession.getAttribute("usertype");
				}
				System.out.println(usergroups.size());
			} catch (Exception e) {
				System.out.println("Error occured while getting infromation from session. Error: " + e.getMessage());
			}

			if (usergroups != null && !usergroups.isEmpty()) {
				// If there is no status and ticket, send list of all tickets of
				// his Group
				if ((StringUtils.isEmpty(status) || StringUtils.equalsIgnoreCase(status, "null"))
						&& (StringUtils.isEmpty(ticket) || StringUtils.equalsIgnoreCase(ticket, "null")
								&& workflowType == null && onlyMasstagTickets == null)) {
					if (usergroups != null && !usergroups.isEmpty()) {
						tickethops = ticketdetailsDao.findByUsergroups(usergroups, workflowType, onlyMasstagTickets);
						if (tickethops == null || tickethops.isEmpty()) {
							// You many decide to return HttpStatus.NOT_FOUND
							return new ResponseEntity<LandingPageWrapper>(HttpStatus.NO_CONTENT);
						}
					} else {
						return new ResponseEntity<LandingPageWrapper>(HttpStatus.NO_CONTENT);
					} 
				} else if (!StringUtils.isEmpty(status) && !StringUtils.equalsIgnoreCase(status, "null")
						&& StringUtils.equalsIgnoreCase(status, "OnlyUnlock")) {
					// Supervisor user can unlock tickets that are locked by
					// himself and everybody in his group
					if (StringUtils.equalsIgnoreCase(userRole, "supervisor")) {
						tickethops = ticketdetailsDao.findByUsergroupAndLocked(usergroups.get(0), workflowType,
								onlyMasstagTickets);
					} else {
						// This user can only unlock tickets that are locked by
						// himself
						tickethops = ticketdetailsDao.findByLockedby(userName, workflowType, onlyMasstagTickets);
					}
					System.out.println("OnlyUnlock wanted");
				} else if (!StringUtils.isEmpty(status) && !StringUtils.equalsIgnoreCase(status, "null")
						&& StringUtils.equalsIgnoreCase(status, "OnlyLock")) {
					// This user can only lock tickets that belong to his
					// group and not already locked
					tickethops = ticketdetailsDao.findByUsergroupsAndNotLocked(usergroups, workflowType,
							onlyMasstagTickets);
					System.out.println("OnlyLock wanted");
				} else {
					if (!StringUtils.isEmpty(ticket) && StringUtils.equalsIgnoreCase(ticket, "All")) {
						if (!StringUtils.isEmpty(status) && !StringUtils.equalsIgnoreCase(status, "null")
								&& StringUtils.equalsIgnoreCase(status, "OnlyOpen")) {
							// For Hold, only fetch tickets with "Open" status.
							// Ignore tickets with "RequestForCloser" status
							tickethops = ticketdetailsDao.findAllTickethopsByStatus("Open", workflowType,
									onlyMasstagTickets);
						} else if (!StringUtils.isEmpty(status) && !StringUtils.equalsIgnoreCase(status, "null")
								&& StringUtils.equalsIgnoreCase(status, "Reopen")) {
							// For Reopen, only fetch tickets with
							// "RequestForCloser, Reopen" status.
							// Ignore tickets with "Open" status
							tickethops = ticketdetailsDao.findAllTickethopsByTwoStatus("RequestForCloser", "Reopen",
									workflowType, onlyMasstagTickets);
						} else if (!StringUtils.isEmpty(status) && !StringUtils.equalsIgnoreCase(status, "null")
								&& !StringUtils.equalsIgnoreCase(status, "All")) {
							tickethops = ticketdetailsDao.findAllTickethopsByFilteredStatus(status, workflowType,
									onlyMasstagTickets);
						} else {
							tickethops = ticketdetailsDao.findAllTickethops(workflowType, onlyMasstagTickets);
						}
					} else if (!StringUtils.isEmpty(ticket) && StringUtils.equalsIgnoreCase(ticket, "MyTicket")) {
						if (!StringUtils.isEmpty(status) && !StringUtils.equalsIgnoreCase(status, "null")
								&& StringUtils.equalsIgnoreCase(status, "OnlyOpen")) {
							// For Hold, only fetch tickets with "Open" status.
							// Ignore tickets with "RequestForCloser" status
							tickethops = ticketdetailsDao.findByLockedbyAndStatus(userName, "Open", workflowType,
									onlyMasstagTickets);
						} else if (!StringUtils.isEmpty(status) && !StringUtils.equalsIgnoreCase(status, "null")
								&& StringUtils.equalsIgnoreCase(status, "Reopen")) {
							// For Reopen, only fetch tickets with
							// "RequestForCloser, Reopen" status.
							// Ignore tickets with "Open" status
							tickethops = ticketdetailsDao.findByLockedbyAndStatus(userName, "RequestForCloser",
									"Reopen", workflowType, onlyMasstagTickets);
						} else if (!StringUtils.isEmpty(status) && !StringUtils.equalsIgnoreCase(status, "null")
								&& StringUtils.equalsIgnoreCase(status, "All")) {
							tickethops = ticketdetailsDao.findByLockedbyAndFilteredStatus(userName, status,
									workflowType, onlyMasstagTickets);
						} else {
							tickethops = ticketdetailsDao.findByLockedby(userName, workflowType, onlyMasstagTickets);
						}
					} else {
						if (!StringUtils.isEmpty(status) && !StringUtils.equalsIgnoreCase(status, "null")
								&& StringUtils.equalsIgnoreCase(status, "OnlyOpen")) {
							// For Hold, only fetch tickets with "Open" status.
							// Ignore tickets with "RequestForCloser" status
							tickethops = ticketdetailsDao.findByUsergroupsAndStatus(usergroups, "Open", workflowType,
									onlyMasstagTickets);
						} else if (!StringUtils.isEmpty(status) && !StringUtils.equalsIgnoreCase(status, "null")
								&& StringUtils.equalsIgnoreCase(status, "Reopen")) {
							// For Reopen, only fetch tickets with
							// "RequestForCloser" status.
							// Ignore tickets with "Open" status
							tickethops = ticketdetailsDao.findByUsergroupsAndStatus(usergroups, "RequestForCloser",
									"Reopen", workflowType, onlyMasstagTickets);
						} else if (!StringUtils.isEmpty(status) && !StringUtils.equalsIgnoreCase(status, "null")
								&& !StringUtils.equalsIgnoreCase(status, "All")) {
							tickethops = ticketdetailsDao.findByUsergroupsAndFilteredStatus(usergroups, status,
									workflowType, onlyMasstagTickets);
						} else {
							tickethops = ticketdetailsDao.findByUsergroups(usergroups, workflowType,
									onlyMasstagTickets);
						}
					}
				}
			}
		} catch (Exception e) {
			System.out.println("Error occured while finding ticketdetails with status" + e.getMessage());
		}
		if (tickethops == null) {
			return new ResponseEntity<LandingPageWrapper>(HttpStatus.NOT_FOUND);
		}

		landingPageWrapper.setTickethops(tickethops);
		
		return new ResponseEntity<LandingPageWrapper>(landingPageWrapper, HttpStatus.OK);
	}

	@RequestMapping(value = "/lockticket/{ticketid}", method = RequestMethod.PUT)
	public ResponseEntity<Void> lockTicket(@PathVariable("ticketid") long ticketId) {
		Ticketlockunlockdetails ticketlockunlockdetails = new Ticketlockunlockdetails();
		try {
			// If ticket is not already locked by someone else, lock it
			if (!ticketdetailsDao.isTicketLocked((int) ticketId)) {
				String userName = null;
				userName = (String) httpSession.getAttribute("networkid");
				if (StringUtils.isNotEmpty(userName)) {
					ticketdetailsDao.updateLockedBy(ticketId, userName, "Yes");
				} else {
					// Log that user info not found in session
					return new ResponseEntity<Void>(HttpStatus.EXPECTATION_FAILED);
				}
				// Insert lock/unlock entry in Ticketlockunlockdetails
				ticketlockunlockdetails.setTicketHopsId((int) ticketId);
				ticketlockunlockdetails.setFlag("Lock");
				ticketlockunlockdetails.setActivityDate(new Date());
				ticketlockunlockdetails.setActivityBy(userName);
				ticketlockunlockdetailsDao.persist(ticketlockunlockdetails);
			} else {
				// Return response that ticket is locked by someone else
			}
		} catch (Exception e) {
			return new ResponseEntity<Void>(HttpStatus.EXPECTATION_FAILED);
		}
		return new ResponseEntity<Void>(HttpStatus.OK);
	}

	@RequestMapping(value = "/unlockticket/{ticketid}", method = RequestMethod.PUT)
	public ResponseEntity<ResponseWrapper> unlockTicket(@PathVariable("ticketid") long ticketId) {
		Ticketlockunlockdetails ticketlockunlockdetails = new Ticketlockunlockdetails();
		ResponseWrapper responseWrapper = new ResponseWrapper();
		try {
			String userName = null;
			userName = (String) httpSession.getAttribute("networkid");
			if (StringUtils.isNotEmpty(userName)) {
				ticketdetailsDao.updateLockedBy(ticketId, null, "No");
			} else {
				responseWrapper.setMessage("Failed to Unlock Ticket. Please try again.");
				return new ResponseEntity<ResponseWrapper>(responseWrapper, HttpStatus.EXPECTATION_FAILED);
			}

			// Insert lock/unlock entry in Ticketlockunlockdetails
			ticketlockunlockdetails.setTicketHopsId((int) ticketId);
			ticketlockunlockdetails.setFlag("Unlock");
			ticketlockunlockdetails.setActivityDate(new Date());
			ticketlockunlockdetails.setActivityBy(userName);
			ticketlockunlockdetailsDao.persist(ticketlockunlockdetails);
		} catch (Exception e) {
			responseWrapper.setMessage("Failed to Unlock Ticket. Please try again.");
			return new ResponseEntity<ResponseWrapper>(responseWrapper, HttpStatus.EXPECTATION_FAILED);
		}
		responseWrapper.setMessage("Successfully Unlocked Ticket.");
		return new ResponseEntity<ResponseWrapper>(responseWrapper, HttpStatus.OK);
	}

	@RequestMapping(value = "/bulkrollback", method = RequestMethod.POST)
	public ResponseEntity<ResponseWrapper> bulkRollback(@RequestBody LandingPagePostWrapper landingPageWrapper) {
		List<Tickethops> tickethopsList = landingPageWrapper.getTickethops();
		ResponseWrapper responseWrapper = new ResponseWrapper();
		Ticketsummary ticketsummary = null;
		String comment = landingPageWrapper.getComment();
		Ticketcomments ticketcomments = null;
		int missed = 0;

		for (Tickethops tickethops : tickethopsList) {

			ticketsummary = tickethops.getTicketsummary();

			try {
				String userName = (String) httpSession.getAttribute("networkid");

				// SLA variables
				Date groupSla = null;
				Date divisionSla = null;
				Sladivisionlevel slaDivisionLevel = null;
				Slatasklevel slatasklevel = null;
				SLA slaUtil = new SLA();
				String vip = null;
				String loyalityIndicator = null;
				String bsCode = null;
				int previousWfLine = 0;
				int issueSolutionCategoryMapIdForSla = 0;
				// Falg for whether to take usergroup from WFHeader
				boolean takeHeaderGroup = false;

				// Check if this ticket is still open in any subgroup
				List<Integer> subgroupIdList = ticketdetailsDao
						.findSubgroupIdListByTickethopsId(tickethops.getTicketHopsId());
				if (subgroupIdList != null && !subgroupIdList.isEmpty()) {
					missed++;
					// keep log of exception
					continue;
				}

				if (!ticketdetailsDao.isActionValid(tickethops.getTicketHopsId(), "Rollback")) {
					missed++;
					// keep log of exception
					continue;
				}

				// Check if it is a Subgroup ticket and if it is
				// close it and return with success msg
				if (tickethops.getSubGroupParentHopId() != null && tickethops.getSubGroupParentHopId() != 0) {
					try {
						// It is a Subgroup
						if (StringUtils.isNotEmpty(userName)) {
							tickethops.setTaskCompletedby(userName);
							tickethops.setTaskCompletionDate(new Date());
						}
						tickethops.setStatus("Done");
						ticketdetailsDao.merge(tickethops);

						// Save comments
						if (StringUtils.isNotEmpty(comment)) {
							try {
								ticketcomments = new Ticketcomments();
								if (StringUtils.isNotEmpty(userName)) {
									ticketcomments.setCreatedby(userName);
									ticketcomments.setCreateddate(new Date());
								}
								ticketcomments.setComments(comment);
								ticketcomments.setTickethops(tickethops);
								ticketcomments.setTicketNumber(tickethops.getTicketNumber());
								ticketcommentsDao.persist(ticketcomments);

								// Commnet save in ticketsummary
								ticketsummary.setLastComment(comment);

								System.out
										.println("Comment saved successfully for " + ticketcomments.getTicketNumber());
							} catch (Exception e) {
								System.out.println("Failed to save comment. Error: " + e.getMessage());
							}
						}
						System.out.println("Subgroup Ticket closed successfully");
						continue;
					} catch (Exception ex) {
						missed++;
						// keep log of exception
						continue;
					}
				}

				// Set session for attachment use
				httpSession.setAttribute("ticketNumberToCreateFolder", tickethops.getTicketsummary().getTicketNumber());

				// Initilize SLA variables
				vip = tickethops.getTicketsummary().getVipflag();
				loyalityIndicator = tickethops.getTicketsummary().getLoyaltyIndicator();
				bsCode = tickethops.getTicketsummary().getBscode();
				issueSolutionCategoryMapIdForSla = tickethops.getIssuesolutioncategorymap()
						.getIssueSolutionCategoryMapId();

				// Perform Rollback (Get tickets wfline and send ticket to
				// previous
				// wfline group)
				try {
					if (tickethops.getWflineNo() != null) {
						previousWfLine = wflineDao.findPreviousLineNo(tickethops.getWfheader().getWfheaderId(),
								tickethops.getWflineNo());
					}

				} catch (Exception e) {
					// No previous group found in line
					// So send ticket to header group
					takeHeaderGroup = true;
				}
				if (takeHeaderGroup) {
					// Calculate Sla
					groupSla = sla.getTaskLevelSla(vip, loyalityIndicator, issueSolutionCategoryMapIdForSla,
							tickethops.getUsergroupByNextUserGroupId().getUserGroupId(),
							tickethops.getWfheader().getUsergroup().getUserGroupId());
					// Division sla will never be changed
					divisionSla = tickethops.getDivisionE2esladate();

					ticketdetailsDao.insertCloneTickethopsAndUpdateOriginal(tickethops, tickethops.getWfheader(),
							tickethops.getIssuesolutioncategorymap(), userName, groupSla, divisionSla);
					responseWrapper.setMessage("Successfully performed action, Ticket sent to "
							+ tickethops.getWfheader().getUsergroup().getName());
				} else {
					List<Wfline> wflines = wflineDao.findByWFHeaderAndLineNo(tickethops.getWfheader().getWfheaderId(),
							previousWfLine);
					if (wflines != null && !wflines.isEmpty()) {
						for (Wfline wfline : wflines) {
							try {
								// Calculate Sla
								groupSla = sla.getTaskLevelSla(vip, loyalityIndicator, issueSolutionCategoryMapIdForSla,
										tickethops.getUsergroupByNextUserGroupId().getUserGroupId(),
										wfline.getUsergroup().getUserGroupId());
								// Division sla will never be changed
								divisionSla = tickethops.getDivisionE2esladate();

								ticketdetailsDao.updateStatusAndInsertTickethopsByWFLine(tickethops, wfline, "Open",
										userName, groupSla, divisionSla);
								responseWrapper.setMessage("Successfully performed action, Ticket sent to "
										+ wfline.getUsergroup().getName());

							} catch (Exception e) {
								System.out.println("Failed to save parallal hops data in tickethops");
							}
						}
					} else {
						System.out.println("No wfline found.write exception log");
						missed++;
						// keep log of exception
						continue;
					}
				}

				// Update Summery table
				try {
					ticketsummary = tickethops.getTicketsummary();
					ticketsummaryDao.merge(ticketsummary);
				} catch (Exception e) {
					// Failed to update summery table info
				}


				// Delete VIP number if flag is not present
				try {
					if (!StringUtils.equalsIgnoreCase(ticketsummary.getVipflag(), "yes")) {
						Vipnumber oldVipNumber = vipnumberDao.findByName(ticketsummary.getCustomerNumber());
						oldVipNumber.setActive("No");
						vipnumberDao.merge(oldVipNumber);
					} else {
						if (vipnumberDao.checkIfVipNumber(ticketsummary.getCustomerNumber())) {
							Vipnumber vipnumber = new Vipnumber();
							vipnumber.setMsisdn(ticketsummary.getCustomerNumber());
							vipnumber.setActive("Yes");
							vipnumber.setCreatedby(userName);
							vipnumber.setCreationdate(new Date());
							vipnumberDao.persist(vipnumber);
						}
					}
				} catch (Exception e) {
					// Failed to update VIP number table info
				}

				// Insert comment in
				// comment table
				if (StringUtils.isNotEmpty(comment)) {
					try {
						ticketcomments = new Ticketcomments();
						if (StringUtils.isNotEmpty(userName)) {
							ticketcomments.setCreatedby(userName);
							ticketcomments.setCreateddate(new Date());
						}
						ticketcomments.setComments(comment);
						ticketcomments.setTickethops(tickethops);
						ticketcomments.setTicketNumber(tickethops.getTicketNumber());
						ticketcommentsDao.persist(ticketcomments);

						// Commnet save in ticketsummary
						ticketsummary.setLastComment(comment);

						System.out.println("Comment saved successfully for " + ticketcomments.getTicketNumber());
					} catch (Exception e) {
						System.out.println("Failed to save comment. Error: " + e.getMessage());
					}
				}

				// Update Summery table
				try {
					ticketsummaryDao.merge(ticketsummary);
				} catch (Exception e) {
					// Failed to update summery table info
				}

			} catch (Exception e) {
				missed++;
				// keep log of exception
			}

		}

		// Prepare and Return message that will be shown in form
		if (missed >= tickethopsList.size()) {
			responseWrapper.setMessage("Failed to perform action. Please try again.");
			return new ResponseEntity<ResponseWrapper>(responseWrapper, HttpStatus.BAD_REQUEST);
		} else if (missed > 0) {
			responseWrapper
					.setMessage("Partially performed action. Failed to perform action on " + missed + " Tickets");
			return new ResponseEntity<ResponseWrapper>(responseWrapper, HttpStatus.OK);
		} else {
			responseWrapper.setMessage("Successfully performed action.");
			return new ResponseEntity<ResponseWrapper>(responseWrapper, HttpStatus.OK);
		}
	}

	@RequestMapping(value = "/ticketdetails/{actiontype}/{sendsms}/{masscomplaint}/{workflowtype}", method = RequestMethod.POST)
	public ResponseEntity<ResponseWrapper> createMassComplaints(@RequestBody LandingPagePostWrapper landingPageWrapper,
			@PathVariable("actiontype") String actionType, @PathVariable("masscomplaint") boolean massComplaint,
			@PathVariable("sendsms") boolean sendSms, @PathVariable("workflowtype") String workflowtype) {
		System.out.println("SendSms: " + sendSms);
		System.out.println("MassComplaint: " + massComplaint);
		ResponseWrapper responseWrapper = new ResponseWrapper();
		List<Tickethops> tickethopsList = landingPageWrapper.getTickethops();
		String usergroup = landingPageWrapper.getUsergroup();
		String comment = landingPageWrapper.getComment();
		Ticketcomments ticketcomments = null;
		String smsText = landingPageWrapper.getSmsText();
		System.out.println("Ticketdetails array size: " + tickethopsList.size());
		System.out.println("Ticket ID: " + usergroup);
		Usergroup usergroupObj = null;
		Tickethops newTickethops = null;
		Tickethops veryFirstTickethops = null;
		List<Wfline> wflines = null;
		int missed = 0;
		String userName = (String) httpSession.getAttribute("networkid");

		int wfHeaderId = 0;
		int wfLineSequence = 0;

		// SLA variables
		Date groupSla = null;
		Date divisionSla = null;
		Sladivisionlevel slaDivisionLevel = null;
		Slatasklevel slatasklevel = null;
		SLA slaUtil = new SLA();
		String vip = null;
		String loyalityIndicator = null;
		String bsCode = null;
		int issueSolutionCategoryMapId = 0;

		// TcketSummary
		Ticketsummary ticketsummary = null;

		// Trimming every string
		actionType = actionType.trim();
		workflowtype = workflowtype.trim();

		try {
			if (StringUtils.isNotEmpty(workflowtype) && StringUtils.equalsIgnoreCase(workflowtype, "dynamic")) {
				if (StringUtils.isNotEmpty(usergroup)) {
					usergroupObj = usergroupDao.findByName(usergroup);
				}
			}
		} catch (Exception e) {
			System.out.println(
					"Failed to fetch usergroup row from usergroup table with usergroup name. Error:" + e.getMessage());
			responseWrapper.setMessage("Failed to perform action, Please try again.");
			return new ResponseEntity<ResponseWrapper>(responseWrapper, HttpStatus.BAD_REQUEST);
		}

		if (StringUtils.isNotEmpty(workflowtype) && (StringUtils.equalsIgnoreCase(workflowtype, "fixed")
				|| (StringUtils.equalsIgnoreCase(workflowtype, "dynamic")
						&& (usergroupObj != null || StringUtils.equalsIgnoreCase(actionType, "requestforcloser"))))) {
			for (Tickethops tickethops : tickethopsList) {
				try {
					// Check if this ticket is still open in any subgroup
					List<Integer> subgroupIdList = ticketdetailsDao
							.findSubgroupIdListByTickethopsId(tickethops.getTicketHopsId());
					if (subgroupIdList != null && !subgroupIdList.isEmpty()) {
						missed++;
						continue;
					}

					if (!ticketdetailsDao.isActionValid(tickethops.getTicketHopsId(), actionType)) {
						missed++;
						continue;
					}

					// Update massTag column if ticket is flagged as mass ticket
					if (StringUtils.isNotEmpty(comment)) {
						if (massComplaint) {
							// Update MassTag column
							tickethops.setMassTag(comment);
						}
					}

					ticketsummary = tickethops.getTicketsummary();

					// Check if it is a Subgroup ticket and if it is
					// close it and return with success msg
					if (tickethops.getSubGroupParentHopId() != null && tickethops.getSubGroupParentHopId() != 0) {
						try {
							// It is a Subgroup
							if (StringUtils.isNotEmpty(userName)) {
								tickethops.setTaskCompletedby(userName);
								tickethops.setTaskCompletionDate(new Date());
							}
							tickethops.setStatus("Done");
							ticketdetailsDao.merge(tickethops);

							// Save comments
							if (StringUtils.isNotEmpty(comment)) {
								try {
									ticketcomments = new Ticketcomments();
									if (StringUtils.isNotEmpty(userName)) {
										ticketcomments.setCreatedby(userName);
										ticketcomments.setCreateddate(new Date());
									}
									ticketcomments.setComments(comment);
									ticketcomments.setTickethops(tickethops);
									ticketcomments.setTicketNumber(tickethops.getTicketNumber());
									ticketcommentsDao.persist(ticketcomments);

									// Commnet save in ticketsummary
									ticketsummary.setLastComment(comment);

									// Update Summery table
									try {
										ticketsummaryDao.merge(ticketsummary);
									} catch (Exception e) {
										// Failed to update summery table info
									}

									System.out.println(
											"Comment saved successfully for " + ticketcomments.getTicketNumber());
								} catch (Exception e) {
									System.out.println("Failed to save comment. Error: " + e.getMessage());
								}
							}
							// Action performed successfully, continue with next
							// ticket
							continue;
						} catch (Exception ex) {
							// Log that Failed to close subgroup
							missed++;
							continue;
						}
					}

					// Initialize SLA variables
					vip = tickethops.getTicketsummary().getVipflag();
					loyalityIndicator = tickethops.getTicketsummary().getLoyaltyIndicator();
					bsCode = tickethops.getTicketsummary().getBscode();
					issueSolutionCategoryMapId = tickethops.getIssuesolutioncategorymap()
							.getIssueSolutionCategoryMapId();

					// If action is requestforcloser
					if (StringUtils.equalsIgnoreCase(actionType, "requestforcloser")) {
						newTickethops = ticketdetailsDao.findFirstHopsByTicketnumberAndDivision(
								tickethops.getTicketNumber(), tickethops.getUsergroupByNextUserGroupId().getDivision());
						try {
							if ((int) tickethops.getUsergroupByNextUserGroupId().getUserGroupId() == (int) newTickethops
									.getUsergroupByNextUserGroupId().getUserGroupId()) {
								veryFirstTickethops = ticketdetailsDao
										.findFirstHopsByTicketnumber(tickethops.getTicketNumber());
								// Calculate Sla
								groupSla = sla.getTaskLevelSla(vip, loyalityIndicator, issueSolutionCategoryMapId,
										tickethops.getUsergroupByNextUserGroupId().getUserGroupId(),
										veryFirstTickethops.getWfheader().getUsergroup().getUserGroupId());
								divisionSla = getDivisionLevelSlaDate(tickethops.getTicketNumber(),
										veryFirstTickethops.getWfheader().getUsergroup().getDivision(), vip,
										loyalityIndicator, issueSolutionCategoryMapId);

								ticketdetailsDao.updateStatusAndInsertTickethops(tickethops,
										veryFirstTickethops.getWfheader().getUsergroup(), actionType, userName,
										groupSla, divisionSla);

								ticketsummary.setActualFeedbackDate(new Date());
								ticketsummary.setActualSolutionDate(new Date());

							} else {
								// Calculate Sla
								groupSla = sla.getTaskLevelSla(vip, loyalityIndicator, issueSolutionCategoryMapId,
										tickethops.getUsergroupByNextUserGroupId().getUserGroupId(),
										newTickethops.getUsergroupByNextUserGroupId().getUserGroupId());
								divisionSla = getDivisionLevelSlaDate(tickethops.getTicketNumber(),
										newTickethops.getUsergroupByNextUserGroupId().getDivision(), vip,
										loyalityIndicator, issueSolutionCategoryMapId);

								ticketdetailsDao.updateStatusAndInsertTickethops(tickethops,
										newTickethops.getUsergroupByNextUserGroupId(), actionType, userName, groupSla,
										divisionSla);
							}
						} catch (Exception e) {
							missed++;
							// log that failed to perform rfc
							continue;
						}
					}

					if (!StringUtils.equalsIgnoreCase(actionType, "requestforcloser")) {
						if (StringUtils.equalsIgnoreCase(workflowtype, "fixed")) {
							if (tickethops.getWfheader() != null) {
								wfHeaderId = tickethops.getWfheader().getWfheaderId();
								if (tickethops.getWflineNo() == null) {
									wfLineSequence = 0;
									wfLineSequence = wflineDao.findLowesLineNo(wfHeaderId, wfLineSequence);
								} else {
									try {
										wfLineSequence = tickethops.getWflineNo();
										wfLineSequence = wflineDao.findLowesLineNo(wfHeaderId, wfLineSequence);
									} catch (Exception e) {
										// Log that Could not find any wfline
										missed++;
										continue;
									}
								}
								wflines = wflineDao.findByWFHeaderAndLineNo(wfHeaderId, wfLineSequence);
							}
						}
					}

					if (!StringUtils.equalsIgnoreCase(actionType, "requestforcloser")) {
						if (StringUtils.equalsIgnoreCase(workflowtype, "fixed")) {
							if (wflines != null && !wflines.isEmpty()) {
								for (Wfline wfline : wflines) {
									try {
										// Calculate Sla
										groupSla = sla.getTaskLevelSla(vip, loyalityIndicator,
												issueSolutionCategoryMapId,
												tickethops.getUsergroupByNextUserGroupId().getUserGroupId(),
												wfline.getUsergroup().getUserGroupId());
										divisionSla = getDivisionLevelSlaDate(tickethops.getTicketNumber(),
												wfline.getUsergroup().getDivision(), vip, loyalityIndicator,
												issueSolutionCategoryMapId);

										ticketdetailsDao.updateStatusAndInsertTickethopsByWFLine(tickethops, wfline,
												actionType, userName, groupSla, divisionSla);

										// As per LOGIC: as this is a fixed
										// flow, vocm is last hop.
										// So during forwarding from (last hop -
										// 1) to vocm, is considered as Actutal
										// Solution Time
										if (wfline.getUsergroup().getDivision().equalsIgnoreCase("vocm")) {
											ticketsummary.setActualSolutionDate(new Date());
										}

										// Send Hop to Hop Email
										sendEmail(wfline.getUsergroup().getEmailId(), tickethops.getTicketNumber());
									} catch (Exception e) {
										System.out.println("Failed to save parallal hops data in tickethops");
									}
								}
							} else {
								System.out.println("No workflow found for ticket " + tickethops.getTicketNumber());
								// No Wfline/workflow found for this ticket,
								// move on
								// to next ticket
								missed++;
								continue;
							}
						} else {
							// Calculate Sla
							groupSla = sla.getTaskLevelSla(vip, loyalityIndicator, issueSolutionCategoryMapId,
									tickethops.getUsergroupByNextUserGroupId().getUserGroupId(),
									usergroupObj.getUserGroupId());
							divisionSla = getDivisionLevelSlaDate(tickethops.getTicketNumber(),
									usergroupObj.getDivision(), vip, loyalityIndicator, issueSolutionCategoryMapId);

							ticketdetailsDao.updateStatusAndInsertTickethops(tickethops, usergroupObj, actionType,
									userName, groupSla, divisionSla);
							// Send Hop to Hop Email
							sendEmail(usergroupObj.getEmailId(), tickethops.getTicketNumber());
						}
					}

					// Save comment in ticketcomments table
					if (sendSms && StringUtils.equalsIgnoreCase(actionType, "closed")) {
						try {
							// Send SMS to Customer
							String customer_Number = tickethops.getTicketsummary().getCustomerNumber();
							smsText = smstemplateDao.findSmsbodyByFlag("closed");
							if (smsText == null) {
								// cant send null as sms body
								smsText = "";
							}
							// String sms_body =
							// smstemplateDao.findSmsbodyByFlag("Create");
							// SMPPSender sMPPSender = new SMPPSender();
							SMPPSender.sendSMS(customer_Number, smsText);
						} catch (Exception ex) {
							// Log that failed to send SMS
						}
					}

					// If this is not flagged as massTag, insert comment in
					// comment table
					if (StringUtils.isNotEmpty(comment)) {
						try {
							if (!massComplaint) {
								ticketcomments = new Ticketcomments();
								if (StringUtils.isNotEmpty(userName)) {
									ticketcomments.setCreatedby(userName);
									ticketcomments.setCreateddate(new Date());
								}
								ticketcomments.setComments(comment);
								ticketcomments.setTickethops(tickethops);
								ticketcomments.setTicketNumber(tickethops.getTicketNumber());
								ticketcommentsDao.persist(ticketcomments);

								// Commnet save in ticketsummary
								ticketsummary.setLastComment(comment);

								System.out
										.println("Comment saved successfully for " + ticketcomments.getTicketNumber());
							}
						} catch (Exception e) {
							System.out.println("Failed to save comment. Error: " + e.getMessage());
						}
					} else {
						System.out.println("Keep in log that no comment came");
					}

					// Update Summery table
					try {
						ticketsummaryDao.merge(ticketsummary);
					} catch (Exception e) {
						// Failed to update summery table info
					}

				} catch (Exception e) {
					missed++;
					// keep log of exception
				}
			}
		} else {
			responseWrapper.setMessage("Failed to perform action, Please try again.");
			return new ResponseEntity<ResponseWrapper>(responseWrapper, HttpStatus.BAD_REQUEST);
		}
		// Prepare and Return message that will be shown in form
		if (missed >= tickethopsList.size()) {
			responseWrapper.setMessage("Failed to perform action. Please try again.");
			return new ResponseEntity<ResponseWrapper>(responseWrapper, HttpStatus.BAD_REQUEST);
		} else if (missed > 0) {
			responseWrapper
					.setMessage("Partially performed action. Failed to perform action on " + missed + " Tickets");
			return new ResponseEntity<ResponseWrapper>(responseWrapper, HttpStatus.OK);
		} else {
			responseWrapper.setMessage("Successfully performed action.");
			return new ResponseEntity<ResponseWrapper>(responseWrapper, HttpStatus.OK);
		}
	}

	// Calculate Division level sla and return
	public Date getDivisionLevelSlaDate(String ticketNumber, String division, String vip, String loyalityIndicator,
			int issueSolutionCategoryMapId) {
		Tickethops previousTickethops = null;
		try {
			previousTickethops = ticketdetailsDao.findFirstHopsByTicketnumberAndDivision(ticketNumber, division);
		} catch (Exception e) {
		}

		// If Division level sla is calculated previously, get that
		if (previousTickethops != null) {
			return previousTickethops.getDivisionE2esladate();
		} else {
			// If Division level sla is not calculated previously, calculate new
			return sla.getDivisionLevelSla(vip, loyalityIndicator, issueSolutionCategoryMapId, division);
		}
	}

	@RequestMapping(value = "/changeticketdetails/{actiontype}/{sendsms}/{masscomplaint}", method = RequestMethod.POST)
	public ResponseEntity<ResponseWrapper> changeMassComplaintsStatus(
			@RequestBody LandingPagePostWrapper landingPageWrapper, @PathVariable("actiontype") String actionType,
			@PathVariable("sendsms") boolean sendSms, @PathVariable("masscomplaint") boolean massComplaint) {
		System.out.println("Change mass ticket status called: " + actionType);
		System.out.println("SendSms: " + sendSms);
		System.out.println("MassComplaint: " + massComplaint);
		List<Tickethops> tickethopsList = landingPageWrapper.getTickethops();
		ResponseWrapper responseWrapper = new ResponseWrapper();
		Ticketcomments ticketcomments = null;
		int missed = 0;
		String userName = null;
		Ticketsummary ticketsummary = null;
		// Trimming every string
		actionType = actionType.trim();
		String comment = landingPageWrapper.getComment().trim();
		String smsText = landingPageWrapper.getSmsText();

		// If user selected "Release" action, we have to set its status as
		// "Open"
		if (StringUtils.isNotEmpty(actionType) && StringUtils.equals(actionType, "Release")) {
			actionType = "Open";
		}
		if (tickethopsList != null && !tickethopsList.isEmpty()) {
			for (Tickethops tickethops : tickethopsList) {
				try {

					if (!ticketdetailsDao.isTicketStatusUpdatable(tickethops.getTicketHopsId(), actionType)) {
						missed++;
						continue;
					}
					// Update massTag column if ticket is flagged as mass ticket
					if (StringUtils.isNotEmpty(comment)) {
						if (massComplaint) {
							// Update MassTag column
							tickethops.setMassTag(comment);
						}
					}
					ticketdetailsDao.updateStatus(tickethops, actionType, userName);
					// MailSender.getInstance().sendMail("ibrahim.khalil@accenture.com","Tess",
					// "Test Email");
					if (StringUtils.equalsIgnoreCase(actionType, "closed")) {
						if (sendSms) {
							// Send sms to End user (GP User)
							// Get ticket mobilenumbers from ticket summery
							// table
							// Then send SMS to those no.ss
						}
					}

					if (sendSms && StringUtils.equalsIgnoreCase(actionType, "closed")) {
						try {
							// Send SMS to Customer
							String customer_Number = tickethops.getTicketsummary().getCustomerNumber();
							smsText = smstemplateDao.findSmsbodyByFlag("closed");
							if (smsText == null) {
								// cant send null as sms body
								smsText = "";
							}
							// String sms_body =
							// smstemplateDao.findSmsbodyByFlag("Create");
							// SMPPSender sMPPSender = new SMPPSender();
							SMPPSender.sendSMS(customer_Number, smsText);
						} catch (Exception ex) {
							// Log that failed to send SMS
						}

						// Send email to ticket creator
						try {
							if (StringUtils.equalsIgnoreCase(tickethops.getNeedFeedback(), "yes")) {
								String sendTo = tickethops.getTicketsummary().getTicketCreatedBy()
										+ "@grameenphone.com";
								MailSender.getInstance().sendMail(sendTo, "Ticket Closing Mail",
										"Ticket: " + tickethops.getTicketNumber() + " has been closed.");
							}
						} catch (Exception e) {
							System.out.println("Failed to send mail.");
						}
					}

					// If this is not flagged as massTag, insert comment in
					// comment table
					if (StringUtils.isNotEmpty(comment)) {
						try {
							if (!massComplaint) {
								ticketcomments = new Ticketcomments();
								userName = (String) httpSession.getAttribute("networkid");
								if (StringUtils.isNotEmpty(userName)) {
									ticketcomments.setCreatedby(userName);
									ticketcomments.setCreateddate(new Date());
								}
								ticketcomments.setComments(comment);
								ticketcomments.setTickethops(tickethops);
								ticketcomments.setTicketNumber(tickethops.getTicketNumber());
								ticketcommentsDao.persist(ticketcomments);

								// Commnet save in ticketsummary
								ticketsummary.setLastComment(comment);

								System.out
										.println("Comment saved successfully for " + ticketcomments.getTicketNumber());
							}
						} catch (Exception e) {
							System.out.println("Failed to save comment. Error: " + e.getMessage());
						}
					} else {
						System.out.println("Keep in log that no comment came");
					}

					// Update Summery table
					try {
						ticketsummaryDao.merge(ticketsummary);
					} catch (Exception e) {
						// Failed to update summery table info
					}

				} catch (Exception e) {
					missed++;
				}
			}
		} else {
			responseWrapper.setMessage("Failed to perform action. Please try again.");
			return new ResponseEntity<ResponseWrapper>(HttpStatus.BAD_REQUEST);
		}
		// Prepare and Return message that will be shown in form
		if (missed >= tickethopsList.size()) {
			responseWrapper.setMessage("Failed to perform action. Please try again.");
			return new ResponseEntity<ResponseWrapper>(responseWrapper, HttpStatus.BAD_REQUEST);
		} else if (missed > 0) {
			responseWrapper
					.setMessage("Partially performed action. Failed to perform action on " + missed + " Tickets");
			return new ResponseEntity<ResponseWrapper>(responseWrapper, HttpStatus.OK);
		} else {
			responseWrapper.setMessage("Successfully performed action.");
			return new ResponseEntity<ResponseWrapper>(responseWrapper, HttpStatus.OK);
		}
	}

	@RequestMapping(value = "/sendsms", method = RequestMethod.POST)
	public ResponseEntity<ResponseWrapper> sendSms(@RequestBody LandingPagePostWrapper landingPageWrapper) {
		int missed = 0;
		ResponseWrapper responseWrapper = new ResponseWrapper();
		List<String> mobileNumbers = landingPageWrapper.getMobileNumbers();
		String smsText = landingPageWrapper.getSmsText();
		if (mobileNumbers != null && !mobileNumbers.isEmpty()) {
			for (String mobileNumber : mobileNumbers) {
				try {
					// Send SMS to Customer
					// String sms_body =
					// smstemplateDao.findSmsbodyByFlag("Create");
					SMPPSender.sendSMS(mobileNumber, smsText);
				} catch (Exception ex) {
					// Log that failed to send SMS
					missed++;
					continue;
				}
			}
		} else {
			responseWrapper.setMessage("Failed to perform action. Please try again.");
			return new ResponseEntity<ResponseWrapper>(responseWrapper, HttpStatus.EXPECTATION_FAILED);
		}
		// Prepare and Return message that will be shown in form
		if (missed >= mobileNumbers.size()) {
			responseWrapper.setMessage("Failed to perform action. Please try again.");
			return new ResponseEntity<ResponseWrapper>(responseWrapper, HttpStatus.BAD_REQUEST);
		} else if (missed > 0) {
			responseWrapper
					.setMessage("Partially performed action. Failed to perform action on " + missed + " Tickets");
			return new ResponseEntity<ResponseWrapper>(responseWrapper, HttpStatus.OK);
		} else {
			responseWrapper.setMessage("Successfully performed action.");
			return new ResponseEntity<ResponseWrapper>(responseWrapper, HttpStatus.OK);
		}
	}

	@RequestMapping(value = "/bulklockticket", method = RequestMethod.POST)
	public ResponseEntity<ResponseWrapper> bulkLockTicket(@RequestBody LandingPagePostWrapper landingPageWrapper) {
		Ticketlockunlockdetails ticketlockunlockdetails = null;
		Ticketcomments ticketcomments = null;
		List<Tickethops> tickethops = landingPageWrapper.getTickethops();
		String comment = landingPageWrapper.getComment();
		String userName = landingPageWrapper.getUser();
		String userNameAction = (String) httpSession.getAttribute("networkid");

		Ticketsummary ticketsummary = null;

		ResponseWrapper responseWrapper = new ResponseWrapper();
		int missed = 0;
		System.out.println("Tickets Sent: " + tickethops.size());
		if (tickethops != null && !tickethops.isEmpty()) {
			for (Tickethops tickethopsObj : tickethops) {
				try {
					if (ticketdetailsDao.isTicketLocked(tickethopsObj.getTicketHopsId())) {
						missed++;
						continue;
					}
					if (StringUtils.isEmpty(userName)) {
						// If username is not sent, take from session
						userName = (String) httpSession.getAttribute("networkid");
					}

					if (StringUtils.isNotEmpty(userName)) {
						ticketdetailsDao.updateLockedBy(tickethopsObj.getTicketHopsId(), userName, "Yes");
					} else {
						// Log that user info not found in session
						missed++;
						continue;
					}

					// Insert lock/unlock entry in Ticketlockunlockdetails
					try {
						ticketlockunlockdetails = new Ticketlockunlockdetails();
						ticketlockunlockdetails.setTicketHopsId(tickethopsObj.getTicketHopsId());
						ticketlockunlockdetails.setFlag("Lock");
						ticketlockunlockdetails.setActivityDate(new Date());
						ticketlockunlockdetails.setActivityBy(userNameAction);
						ticketlockunlockdetailsDao.persist(ticketlockunlockdetails);
					} catch (Exception ex) {
						System.out.println("Failed to update Ticketlockunlockdetails. Error: " + ex.getMessage());
					}
					// Insert comment in comment table
					if (StringUtils.isNotEmpty(comment)) {
						try {

							ticketcomments = new Ticketcomments();
							userNameAction = (String) httpSession.getAttribute("networkid");
							if (StringUtils.isNotEmpty(userNameAction)) {
								ticketcomments.setCreatedby(userNameAction);
								ticketcomments.setCreateddate(new Date());
							}
							ticketcomments.setComments(comment);
							ticketcomments.setTickethops(tickethopsObj);
							ticketcomments.setTicketNumber(tickethopsObj.getTicketNumber());
							ticketcommentsDao.persist(ticketcomments);

							// Commnet save in ticketsummary
							ticketsummary.setLastComment(comment);

							System.out.println("Comment saved successfully for " + ticketcomments.getTicketNumber());

						} catch (Exception e) {
							System.out.println("Failed to save comment. Error: " + e.getMessage());
						}
					} else {
						System.out.println("Keep in log that no comment came");
					}

					// Update Summery table
					try {
						ticketsummaryDao.merge(ticketsummary);
					} catch (Exception e) {
						// Failed to update summery table info
					}

				} catch (Exception e) {
					missed++;
					// Keep log of failer and exception
				}
			}
		} else {
			responseWrapper.setMessage("Failed to perform action. Please try again.");
			return new ResponseEntity<ResponseWrapper>(responseWrapper, HttpStatus.EXPECTATION_FAILED);
		}
		// Prepare and Return message that will be shown in form
		if (missed >= tickethops.size()) {
			responseWrapper.setMessage("Failed to perform action. Please try again.");
			return new ResponseEntity<ResponseWrapper>(responseWrapper, HttpStatus.BAD_REQUEST);
		} else if (missed > 0) {
			responseWrapper
					.setMessage("Partially performed action. Failed to perform action on " + missed + " Tickets");
			return new ResponseEntity<ResponseWrapper>(responseWrapper, HttpStatus.OK);
		} else {
			responseWrapper.setMessage("Successfully performed action.");
			return new ResponseEntity<ResponseWrapper>(responseWrapper, HttpStatus.OK);
		}
	}

	@RequestMapping(value = "/bulkunlockticket", method = RequestMethod.POST)
	public ResponseEntity<ResponseWrapper> bulkUnlockTicket(@RequestBody LandingPagePostWrapper landingPageWrapper) {
		Ticketlockunlockdetails ticketlockunlockdetails = null;
		Ticketcomments ticketcomments = null;
		List<Tickethops> tickethops = landingPageWrapper.getTickethops();
		String comment = landingPageWrapper.getComment();
		ResponseWrapper responseWrapper = new ResponseWrapper();
		Ticketsummary ticketsummary = null;
		int missed = 0;
		System.out.println("Tickets Sent: " + tickethops.size());
		if (tickethops != null && !tickethops.isEmpty()) {
			for (Tickethops tickethopsObj : tickethops) {
				try {
					String userName = null;
					userName = (String) httpSession.getAttribute("networkid");
					if (StringUtils.isNotEmpty(userName)) {
						ticketdetailsDao.updateLockedBy(tickethopsObj.getTicketHopsId(), null, "No");
					} else {
						// Log that user info not found in session
						missed++;
						continue;
					}

					// Insert lock/unlock entry in Ticketlockunlockdetails
					try {
						ticketlockunlockdetails = new Ticketlockunlockdetails();
						ticketlockunlockdetails.setTicketHopsId(tickethopsObj.getTicketHopsId());
						ticketlockunlockdetails.setFlag("Unlock");
						ticketlockunlockdetails.setActivityDate(new Date());
						ticketlockunlockdetails.setActivityBy(userName);
						ticketlockunlockdetailsDao.persist(ticketlockunlockdetails);
					} catch (Exception ex) {
						System.out.println("Failed to update Ticketlockunlockdetails. Error: " + ex.getMessage());
					}
					// Insert comment in comment table
					if (StringUtils.isNotEmpty(comment)) {
						try {

							ticketcomments = new Ticketcomments();
							userName = (String) httpSession.getAttribute("networkid");
							if (StringUtils.isNotEmpty(userName)) {
								ticketcomments.setCreatedby(userName);
								ticketcomments.setCreateddate(new Date());
							}
							ticketcomments.setComments(comment);
							ticketcomments.setTickethops(tickethopsObj);
							ticketcomments.setTicketNumber(tickethopsObj.getTicketNumber());
							ticketcommentsDao.persist(ticketcomments);

							// Commnet save in ticketsummary
							ticketsummary.setLastComment(comment);

							System.out.println("Comment saved successfully for " + ticketcomments.getTicketNumber());

						} catch (Exception e) {
							System.out.println("Failed to save comment. Error: " + e.getMessage());
						}
					} else {
						System.out.println("Keep in log that no comment came");
					}

					// Update Summery table
					try {
						ticketsummaryDao.merge(ticketsummary);
					} catch (Exception e) {
						// Failed to update summery table info
					}

				} catch (Exception e) {
					missed++;
					// Keep log of failure and exception
				}
			}
		} else {
			responseWrapper.setMessage("Failed to perform action. Please try again.");
			return new ResponseEntity<ResponseWrapper>(responseWrapper, HttpStatus.EXPECTATION_FAILED);
		}
		// Prepare and Return message that will be shown in form
		if (missed >= tickethops.size()) {
			responseWrapper.setMessage("Failed to perform action. Please try again.");
			return new ResponseEntity<ResponseWrapper>(responseWrapper, HttpStatus.BAD_REQUEST);
		} else if (missed > 0) {
			responseWrapper
					.setMessage("Partially performed action. Failed to perform action on " + missed + " Tickets");
			return new ResponseEntity<ResponseWrapper>(responseWrapper, HttpStatus.OK);
		} else {
			responseWrapper.setMessage("Successfully performed action.");
			return new ResponseEntity<ResponseWrapper>(responseWrapper, HttpStatus.OK);
		}
	}

	@RequestMapping(value = "/userlist", method = RequestMethod.POST)
	public ResponseEntity<List<String>> listAllNetworkids(@RequestBody LandingPagePostWrapper landingPageWrapper) {
		Usergroup usergroupObj = null;
		// Collect Usergroup
		String userName = (String) httpSession.getAttribute("networkid");
		if (StringUtils.isNotEmpty(userName)) {
			List<Usergroup> usergroups = (List<Usergroup>) httpSession.getAttribute("UserGroup");

			if (!usergroups.isEmpty()) {
				// Take only one usergroup if user belongs to multiple
				// usergroups
				usergroups = usergroups.subList(0, 1);
			}
			// Select first if multiple usergroups returned
			usergroupObj = usergroups.get(0);
		}

		/* Requirement changed. Only fetch user of own usergroup */
		// String userGroupName = landingPageWrapper.getUsergroup();
		// if (StringUtils.isNotEmpty(userGroupName)) {
		// usergroupObj = usergroupDao.findByName(userGroupName);
		// }

		List<String> networkIdList = userandusergroupmapDao.findUsernamesByUsergroupId(usergroupObj.getUserGroupId());
		if (networkIdList.isEmpty()) {
			return new ResponseEntity<List<String>>(HttpStatus.NO_CONTENT);
		}
		System.out.println("ticketdetailList size: " + networkIdList.size());
		return new ResponseEntity<List<String>>(networkIdList, HttpStatus.OK);
	}

	public void sendEmail(String sendTo, String number) {
		// Send email to ticket creator
		try {
			// String to = sendTo + "@grameenphone.com";
			MailSender.getInstance().sendMail(sendTo, "Ticket Arrival Mail",
					"Ticket: " + number + " has landed in your group.");

		} catch (Exception e) {
			System.out.println("Failed to send mail.");
		}
	}

	@RequestMapping(value = "/businessListByUsergroup/", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<String>> listBusinessProcessByUserGroup() {

		try {
			List<Usergroup> userGroups = (List<Usergroup>) httpSession.getAttribute("UserGroup");
			List<Usergroupbusinessprocessmap> usergroupbusinessprocessmaps = usergroupbusinessprocessmapdao
					.getBusinessProcessesByUsergroupId(userGroups.get(0).getUserGroupId());

			List<String> businessProcesses = new ArrayList<>();

			for (Usergroupbusinessprocessmap ugbpm : usergroupbusinessprocessmaps) {
				businessProcesses.add(ugbpm.getBusinessprocess().getName());
			}

			if (businessProcesses.isEmpty()) {
				return new ResponseEntity<List<String>>(HttpStatus.NO_CONTENT);
			} else {
				return new ResponseEntity<List<String>>(businessProcesses, HttpStatus.OK);
			}
		} catch (Exception ex) {
			return new ResponseEntity<List<String>>(HttpStatus.NO_CONTENT);
		}

	}

	@RequestMapping(value = "/getFirstTicketHopByTicketNumber/{ticketnumber}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Tickethops> getFirstTicketHopByTicketNumber(@PathVariable("ticketnumber") String ticketnumber) {

		try {
			Tickethops tickethops = null;
			tickethops = tickethopsHome.getFirstHopsByTicketnumber(ticketnumber);
			return new ResponseEntity<Tickethops>(tickethops, HttpStatus.OK);
		} catch (Exception ex) {
			return new ResponseEntity<Tickethops>(HttpStatus.NO_CONTENT);
		}

	}
	
		
	

}
