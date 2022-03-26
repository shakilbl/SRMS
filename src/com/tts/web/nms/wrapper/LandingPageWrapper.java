package com.tts.web.nms.wrapper;

import java.util.Date;
import java.util.List;

import com.tts.web.nms.model.Issuesolutioncategorymap;
import com.tts.web.nms.model.Tickethops;
import com.tts.web.nms.model.Ticketsummary;

public class LandingPageWrapper {
	// LandingPage Content
	private List<Tickethops> tickethops;
	private List<Ticketsummary> ticketsummaries;

	// TicketdetailsPage Content
	private Tickethops aTickethops;
	private List<Issuesolutioncategorymap> issuesolutioncategorymaps;
	private List<String> ticketcomments;
	private String smsTemplate;
	private List<Integer> subgroupIdList;
	private List<String> solutionNames;
	private String ticketIssue;
	private String ticketSolution;
	private Date vipCommittedFeedbackSlaHour;
	private Date vipCommittedSolutionSlaHour;
	private Date nonVipCommittedFeedbackSlaHour;
	private Date nonVipCommittedSolutionSlaHour;

	private Date groupLevelSla;
	private Date divisionLevelSla;
	
	private String solutionConstrain;
	
	// Attachments
	private List<String> attachmentNames;

	// Dynamic contents
	private String previousGroups;

	// Notification message to user if exception occurs
	private String errorMessage;
	
	private String businessProcessName;

	public Date getNonVipCommittedFeedbackSlaHour() {
		return nonVipCommittedFeedbackSlaHour;
	}

	public void setNonVipCommittedFeedbackSlaHour(Date nonVipCommittedFeedbackSlaHour) {
		this.nonVipCommittedFeedbackSlaHour = nonVipCommittedFeedbackSlaHour;
	}

	public Date getNonVipCommittedSolutionSlaHour() {
		return nonVipCommittedSolutionSlaHour;
	}

	public void setNonVipCommittedSolutionSlaHour(Date nonVipCommittedSolutionSlaHour) {
		this.nonVipCommittedSolutionSlaHour = nonVipCommittedSolutionSlaHour;
	}

	public Date getGroupLevelSla() {
		return groupLevelSla;
	}

	public void setGroupLevelSla(Date groupLevelSla) {
		this.groupLevelSla = groupLevelSla;
	}

	public Date getDivisionLevelSla() {
		return divisionLevelSla;
	}

	public void setDivisionLevelSla(Date divisionLevelSla) {
		this.divisionLevelSla = divisionLevelSla;
	}

	public String getTicketIssue() {
		return ticketIssue;
	}

	public Date getVipCommittedFeedbackSlaHour() {
		return vipCommittedFeedbackSlaHour;
	}

	public void setVipCommittedFeedbackSlaHour(Date vipCommittedFeedbackSlaHour) {
		this.vipCommittedFeedbackSlaHour = vipCommittedFeedbackSlaHour;
	}

	public Date getVipCommittedSolutionSlaHour() {
		return vipCommittedSolutionSlaHour;
	}

	public void setVipCommittedSolutionSlaHour(Date vipCommittedSolutionSlaHour) {
		this.vipCommittedSolutionSlaHour = vipCommittedSolutionSlaHour;
	}

	public void setTicketIssue(String ticketIssue) {
		this.ticketIssue = ticketIssue;
	}

	public String getTicketSolution() {
		return ticketSolution;
	}

	public void setTicketSolution(String ticketSolution) {
		this.ticketSolution = ticketSolution;
	}

	public Tickethops getaTickethops() {
		return aTickethops;
	}

	public void setaTickethops(Tickethops aTickethops) {
		this.aTickethops = aTickethops;
	}

	public List<Tickethops> getTickethops() {
		return tickethops;
	}

	public void setTickethops(List<Tickethops> tickethops) {
		this.tickethops = tickethops;
	}

	public List<Ticketsummary> getTicketsummaries() {
		return ticketsummaries;
	}

	public void setTicketsummaries(List<Ticketsummary> ticketsummaries) {
		this.ticketsummaries = ticketsummaries;
	}

	public List<String> getTicketcomments() {
		return ticketcomments;
	}

	public void setTicketcomments(List<String> ticketcomments) {
		this.ticketcomments = ticketcomments;
	}

	public String getErrorMessage() {
		return errorMessage;
	}

	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}

	public String getSmsTemplate() {
		return smsTemplate;
	}

	public void setSmsTemplate(String smsTemplate) {
		this.smsTemplate = smsTemplate;
	}

	public List<Integer> getSubgroupIdList() {
		return subgroupIdList;
	}

	public void setSubgroupIdList(List<Integer> subgroupIdList) {
		this.subgroupIdList = subgroupIdList;
	}

	public List<String> getSolutionNames() {
		return solutionNames;
	}

	public void setSolutionNames(List<String> solutionNames) {
		this.solutionNames = solutionNames;
	}

	public List<Issuesolutioncategorymap> getIssuesolutioncategorymaps() {
		return issuesolutioncategorymaps;
	}

	public void setIssuesolutioncategorymaps(List<Issuesolutioncategorymap> issuesolutioncategorymaps) {
		this.issuesolutioncategorymaps = issuesolutioncategorymaps;
	}


	public String getPreviousGroups() {
		return previousGroups;
	}

	public void setPreviousGroups(String previousGroups) {
		this.previousGroups = previousGroups;
	}

	public List<String> getAttachmentNames() {
		return attachmentNames;
	}

	public void setAttachmentNames(List<String> attachmentNames) {
		this.attachmentNames = attachmentNames;
	}

	public String getSolutionConstrain() {
		return solutionConstrain;
	}

	public void setSolutionConstrain(String solutionConstrain) {
		this.solutionConstrain = solutionConstrain;
	}

	public String getBusinessProcessName() {
		return businessProcessName;
	}

	public void setBusinessProcessName(String businessProcessName) {
		this.businessProcessName = businessProcessName;
	}

	
	

}
