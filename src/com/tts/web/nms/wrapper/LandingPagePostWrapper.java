package com.tts.web.nms.wrapper;

import java.util.List;

import com.tts.web.nms.model.Tickethops;

public class LandingPagePostWrapper {
	private String usergroup;
	private List<Tickethops> tickethops;
	private String user;
	private String comment;

	// TicketdetailsPage Content
	private Tickethops aTickethops;
	private String smsText;
	List<String> mobileNumbers;
	private List<Integer> addedSubgroupIdList;
	private int issueSolutionCategoryMapId;
	private String solutionConstrain;
	private String clearTime;
	
	// Dynamic contents

	public String getUsergroup() {
		return usergroup;
	}

	public void setUsergroup(String usergroup) {
		this.usergroup = usergroup;
	}

	public List<Tickethops> getTickethops() {
		return tickethops;
	}

	public void setTickethops(List<Tickethops> tickethops) {
		this.tickethops = tickethops;
	}

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public Tickethops getaTickethops() {
		return aTickethops;
	}

	public void setaTickethops(Tickethops aTickethops) {
		this.aTickethops = aTickethops;
	}

	public String getSmsText() {
		return smsText;
	}

	public void setSmsText(String smsText) {
		this.smsText = smsText;
	}

	public List<Integer> getAddedSubgroupIdList() {
		return addedSubgroupIdList;
	}

	public void setAddedSubgroupIdList(List<Integer> addedSubgroupIdList) {
		this.addedSubgroupIdList = addedSubgroupIdList;
	}

	public int getIssueSolutionCategoryMapId() {
		return issueSolutionCategoryMapId;
	}

	public void setIssueSolutionCategoryMapId(int issueSolutionCategoryMapId) {
		this.issueSolutionCategoryMapId = issueSolutionCategoryMapId;
	}

	public List<String> getMobileNumbers() {
		return mobileNumbers;
	}

	public void setMobileNumbers(List<String> mobileNumbers) {
		this.mobileNumbers = mobileNumbers;
	}


	public String getSolutionConstrain() {
		return solutionConstrain;
	}

	public void setSolutionConstrain(String solutionConstrain) {
		this.solutionConstrain = solutionConstrain;
	}
	
	public String getClearTime() {
		return clearTime;
	}

	public void setClearTime(String clearTime) {
		this.clearTime = clearTime;
	}

}
