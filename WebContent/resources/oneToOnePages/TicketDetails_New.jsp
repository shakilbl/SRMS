<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
<link href="resources/file-upload/css/dropzone/basic.css"
	rel="stylesheet" />
<script type="text/javascript" src="resources/js/bstable.js"></script>
<script type="text/javascript" src="resources/js/angular-messages.js"></script>

<script
	src="<c:url value='/resources/js/app_js/ticketdetails_service_controller.js' />"></script>
<script src="resources/file-upload/js/dropzone/dropzone.js"></script>
<script
	src="<c:url value='resources/js/app_js/directives/FileUploadDirectives.js' />"></script>
<script
	src="<c:url value='resources/js/app_js/controllers/FIleUploadController.js' />"></script>

<script type="text/javascript">
	Dropzone.autoDiscover = false;
</script>

<script type="text/ng-template" id="errors">
	<p ng-message="required">This field is required</p>
	<p ng-message="minlength">This field is too short</p>
	<p ng-message="maxlength">This field is too long</p>
	<p ng-message="email">This needs to be a valid email</p>
	<p ng-message="date">This needs to be a valid date</p>
</script>
<style type="text/css">
.glyphicon-refresh-animate {
    -animation: spin .7s infinite linear;
    -webkit-animation: spin2 .7s infinite linear;
}

@-webkit-keyframes spin2 {
    from { -webkit-transform: rotate(0deg);}
    to { -webkit-transform: rotate(360deg);}
}

@keyframes spin {
    from { transform: scale(1) rotate(0deg);}
    to { transform: scale(1) rotate(360deg);}
}

[class*="col-"] {
	margin-bottom: 3px;
}
</style>
<style>
table thead th {
    background-color: darkgray;
}

table{
    width:100%;
}
table td{
    white-space: nowrap;
}
table td:last-child{
    width:100%;
}
</style>
</head>
<body>
	<div>
		<div data-ng-controller="TicketdetailspageController as one">
			<div>
				<%-- current: {{'${sessionScope.usergroups[0].name}'}} --%>
				<input id='id_role_current' type="hidden"
					value="{{one.getCurrentGroup(('${sessionScope.UserGroup[0].name}' | lowercase))}}" />
				<input id='id_role_done' type='hidden'
					value='{{one.previousGroups}}' />
				<%-- <input id='id_role_current' type="hidden"
					value="{{'${sessionScope.UserGroup[0].name}' | lowercase}}" /> <input
					id='id_role_done' type='hidden' value='vocm' /> --%>
			</div>
			{{one.getCurrentGroup(('${sessionScope.UserGroup[0].name}' |
			lowercase))}}<br> {{one.previousGroups}}
			<!-- <div>
				<input id='id_role_current' type='hidden' value='ticket_creator' />
				<input id='id_role_done' type='hidden' value='' />
			</div> -->

			<div ng-hide="true">
				<!-- Assigning ticketHopsId From Landingpage in ticketDetailsPage_ticketHopsId variable -->
				{{one.ticketDetailsPage_ticketHopsId=${requestScope.ticketHopsIdFromLanding}}}
			</div>
			<div class="row">
				<div class="col-md-12 page-header" style="margin-top: 0;">
					<h2>Service Request Details</h2>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12">
					<!-- Start: Ticket Details Form -->
					<form name="myForm" class="form-horizontal">
						<div class="row">
							<div class="col-md-12">
								<div class="form-box">
									<p class="form-header"></p>
								</div>
							</div>
						</div>

						<!-- Start: Row1 -->
						<div class="row">

							<!-- Start: Issue Ticket -->
							<div class="col-md-6 form-group">
								<label class="col-md-4 control-label" for="issue-ticket">Ticket
									Number</label>
								<div class="col-md-8">
									<input type="text" name="txtTicketNumber" id="ticketNumber"
										ng-model="one.complaint.ticketNumber" class="form-control"
										disabled />
								</div>
							</div>
							<!-- End: Issue Ticket Start: Customer Number -->
							<div class="col-md-6 form-group">
								<label class="col-md-4 control-label" for="">Hops Status</label>
								<div class="col-md-8">
									<input type="text" name="txtTicketName"
										ng-model="one.complaint.status" class="form-control" disabled />
								</div>
							</div>

						</div>
						<div class="row">
							<div class="col-md-6 form-group">
								<label class="col-md-4 control-label" for="issueStatus">Ticket
									Status:</label>
								<div class="col-md-8">
									<input type="text" name="txtissueStatus" id="issue-status"
										ng-model="one.complaint.ticketsummary.status"
										class="form-control" disabled />
								</div>
							</div>
							<div class="col-md-6 form-group">
								<label class="col-md-4 control-label" for="">Workflow
									Type</label>
								<div class="col-md-8">
									<input type="text" name="txtTicketName"
										ng-model="one.complaint.wfheader.type" class="form-control"
										disabled />
								</div>
							</div>
						</div>
						<!-- End: Row1 Start: Row2 -->

						<!-- Start: Row0 -->
						<div class="row">
							<div class="col-md-6 form-group">
								<label class="col-md-4 control-label" for="issue-ticket">Issue
									Category</label>
								<div class="col-md-8">
									<input type="text" class="form-control"
										ng-model="one.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.name"
										disabled />
								</div>
							</div>
							<div class="col-md-6 form-group">
								<label class="col-md-4 control-label" for="issue-ticket">Issue-Sub
									Category</label>
								<div class="col-md-8">
									<input type="text"
										ng-model="one.complaint.ticketsummary.issuesolutioncategorymap.issuesolution.name"
										class="form-control" disabled />
								</div>
							</div>
						</div>
						<!-- End: Row0 -->
						<!-- End: Row3 Start: Row4 -->
						<div class="row">
							<div class="col-md-6 form-group">
								<label class="col-md-4 control-label" for="status">Contact
									Number:</label>
								<div class="col-md-8">
									<input type="text" name="txtContactNumber" id="contact-number"
										ng-model="one.complaint.ticketsummary.contactNumber"
										class="form-control" />
								</div>
							</div>
							<div class="col-md-6 form-group">
								<label class="col-md-4 control-label" for="customer-number">Customer
									Number</label>
								<div class="col-md-8">
									<input type="text" name="txtCustomerNumber"
										id="customer-number"
										ng-model="one.complaint.ticketsummary.customerNumber"
										class="form-control" />
								</div>
							</div>
						</div>
						<!-- End: Row4 Start: Row5 -->
						<!-- Start: Row1 -->
						<div class="row">
							<div class="col-md-6 form-group">
								<label class="col-md-4 control-label" for="customer-name">Customer
									Name</label>
								<div class="col-md-8">
									<input type="text" name="txtCustomerName" id="txtCustomerName"
										ng-model="one.complaint.ticketsummary.customerName"
										class="form-control" />
								</div>
							</div>
							<div class="col-md-6 form-group">
								<label class="col-md-4 control-label" for="company-name">
									Company Name</label>
								<div class="col-md-8">
									<input type="text" name="txtCompanyName" id="txtCompanyName"
										ng-model="one.complaint.ticketsummary.companyName"
										class="form-control" />
								</div>
							</div>
						</div>
						<!-- End: Row1 -->
						<!-- Start: Row2 -->
						<div class="row">
							<div class="col-md-6 form-group">
								<label class="col-md-4 control-label" for="complain-type">Type</label>
								<div class="col-md-8" id="complain-type">
									<!-- <select class="form-control"
										ng-model="one.complaint.ticketsummary.complainType" disabled>
										<option value="Complaint">Complaint</option>
										<option value="Query">Query</option>
										<option value="Request">Request</option>
										<option value="Voice">Voice</option>
										<option value="Feedback">Feedback</option>
										<option value="Report">Report</option>
									</select> -->
									<input type="text" class="form-control"
										ng-model="one.complaint.ticketsummary.complainType" disabled>
								</div>
							</div>
							<div class="col-md-6 form-group">
								<label class="col-md-4 control-label" for="additional-number">Additional
									Number</label>
								<div class="col-md-8">
									<input type="text" name="txtAdditionalNumber"
										id="additional-number"
										ng-model="one.complaint.ticketsummary.additionalNumber"
										class="form-control" />
								</div>
							</div>
						</div>
						<!-- End: Row2 -->
						<!-- Start: Row3 -->
						<div class="row">
							<div class="col-md-6 form-group">
								<label class="col-md-4 control-label" for="priority">Priority:</label>
								<div class="col-md-8">
									<select class="form-control" id="priority"
										ng-model="one.complaint.ticketsummary.priority">
										<option value="High">High</option>
										<option value="Low">Low</option>
										<option value="Medium">Medium</option>
									</select>
								</div>
							</div>
							<div class="col-md-6 form-group">
								<label class="col-md-4 control-label" for="selectedTask">Selected
									Task</label>
								<div class="col-md-8">
									<input type="text" name="selectedTask"
										ng-model="one.complaint.selectedSolution" class="form-control"
										disabled />
								</div>
							</div>
						</div>
						<!-- End: Row3 -->
						<!-- End: Row9 Start: Row10 -->
						<div class="row">
							<div class="col-md-6 form-group">
								<label class="col-md-4 control-label" for="complain-type">Complain
									Type</label>
								<div class="col-md-8">
									<input type="text" name="txtComplainType" id="complain-type"
										ng-model="one.complaint.issuesolutioncategorymap.issuesolutioncategory.name"
										class="form-control" />
								</div>
							</div>
							<div class="col-md-6 form-group">
								<label class="col-md-4 control-label" for="ticketSolution"
									ng-show="(one.complaint.wfheader.issuesolutioncategorymap.issueSolutionCategoryMapId==
										one.complaint.issuesolutioncategorymap.issueSolutionCategoryMapId)"
									ng-if="!((one.enableSolution(('${sessionScope.UserGroup[0].name}' | lowercase)))
									&& (one.complaint.issuesolutioncategorymap.issuesolution.type | lowercase) != 'solution'
									|| one.getCurrentGroup(('${sessionScope.UserGroup[0].name}' | lowercase))=='rp')">Solution</label>
								<div class="col-md-8">
									<input type="text" name="ticketSolution"
										ng-show="(one.complaint.wfheader.issuesolutioncategorymap.issueSolutionCategoryMapId==
										one.complaint.issuesolutioncategorymap.issueSolutionCategoryMapId)"
										ng-if="!((one.enableSolution(('${sessionScope.UserGroup[0].name}' | lowercase)))
									&& (one.complaint.issuesolutioncategorymap.issuesolution.type | lowercase) != 'solution'
									|| one.getCurrentGroup(('${sessionScope.UserGroup[0].name}' | lowercase))=='rp')"
										ng-model="one.ticketSolution" class="form-control" disabled />
								</div>
							</div>
							<div class="col-md-6 form-group">
								<label class="col-md-4 control-label"
									ng-if="(one.enableSolution(('${sessionScope.UserGroup[0].name}' | lowercase)))
									&& (one.complaint.issuesolutioncategorymap.issuesolution.type | lowercase) != 'solution'
									|| one.getCurrentGroup(('${sessionScope.UserGroup[0].name}' | lowercase))=='rp'"
									for="solution">Solution</label>
								<div class="col-md-8">
									<input class="form-control" type="text"
										ng-if="(one.enableSolution(('${sessionScope.UserGroup[0].name}' | lowercase)))
									&& (one.complaint.issuesolutioncategorymap.issuesolution.type | lowercase) != 'solution'
									|| one.getCurrentGroup(('${sessionScope.UserGroup[0].name}' | lowercase))=='rp'"
										ng-model="one.selectedISCM"
										typeahead="user as user.name for user in one.abc | filter:$viewValue" />
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-md-6 form-group">
								<label class="col-md-4 control-label" for="circle-thana">Circle
									Thana</label>
								<div class="col-md-8">
									{{one.complaint.ticketsummary.circleThana}}</div>
							</div>
							<div class="col-md-6 form-group">
								<label class="col-md-4 control-label" for="solutionConstrain">Solution
									Constraint</label>
								<div class="col-md-8">
									<select name="solutionConstrain" id="solutionConstrain"
										ng-model="one.complaint.solutionConstraint"
										class="form-control">
										<option value="">-Select Solution Constrain-</option>
										<option value="no constraint">No Constraint</option>
										<option value="Budgetary Constraint">Budgetary
											Constraint</option>
										<option value="Bordar Restriction">Bordar Restriction</option>
										<option value="BTRC or Authority Restriction">BTRC or
											Authority Restriction</option>
										<option value="Business case not Justified">Business
											case not Justified</option>
										<option value="Incomplete Data provided">Incomplete
											Data provided</option>
										<option value="No technical Problem Found">No
											technical Problem Found</option>
									</select> {{one.complaint.solutionConstraint}}
								</div>
							</div>
						</div>
						<!-- End: Row2 Start: Row3 -->
						<div class="row"></div>
						<!-- End: Row5 Start: Row6 -->
						<div class="row">
							<div class="col-md-6 form-group">
								<label class="col-md-5 control-label" for="customer-temperature">Customer
									Temperature</label>
								<div class="col-md-7">
									<div class="radio">
										<label><input type="radio" id="customer-temperature"
											name="customer-temperature"
											ng-model="one.complaint.ticketsummary.customerTemparature"
											value="happy">Happy</label> <label><input
											type="radio" name="customer-temperature"
											ng-model="one.complaint.ticketsummary.customerTemparature"
											value="angry">Angry</label> <label><input
											type="radio" name="customer-temperature"
											ng-model="one.complaint.ticketsummary.customerTemparature"
											value="neutral">Natural</label> <label><input
											type="radio" name="customer-temperature"
											ng-model="one.complaint.ticketsummary.customerTemparature"
											value="sad">Sad</label>
									</div>
								</div>
							</div>
							<div class="col-md-6 form-group">
								<label class="col-md-5 control-label" for="vip-priority-issue">VIP
									Priority Issues</label>
								<div class="col-md-7">
									<div class="checkbox">
										<input type="checkbox" id="vip-priority-issue" name="cbActive"
											ng-change="one.toggleVipSla(one.complaint.ticketsummary.vipflag)"
											ng-disabled="!(('${sessionScope.UserGroup[0].division}'| lowercase) == 'vocm')"
											ng-model="one.complaint.ticketsummary.vipflag"
											ng-true-value="'Yes'" ng-false-value="'No'">
									</div>
								</div>
							</div>
						</div>
						<!-- End: Row10 -->
						<div class="row">
							<div class="col-md-6 form-group">
								<label class="col-md-4 control-label"
									ng-if="(one.complaint.issuesolutioncategorymap.issuesolution.type | lowercase).indexOf('network problem') == -1
									&& one.complaint.issuesolutioncategorymap.issueSolutionCategoryMapId
											==one.complaint.wfheader.issuesolutioncategorymap.issueSolutionCategoryMapId"
									for="commited-solution-date">Committed Solution Date:</label>
								<div class="col-md-8">
									<input type="text" name="txtCommitedSolutionDate"
										ng-if="(one.complaint.issuesolutioncategorymap.issuesolution.type | lowercase).indexOf('network problem') == -1
										&& one.complaint.issuesolutioncategorymap.issueSolutionCategoryMapId
											==one.complaint.wfheader.issuesolutioncategorymap.issueSolutionCategoryMapId"
										id="commited-solution-date"
										ng-model="one.complaint.ticketsummary.committedSolutionDate"
										class="form-control" disabled />
								</div>
							</div>
							<div class="col-md-6 form-group">
								<label class="col-md-4 control-label"
									for="commited-feedback-date">Committed Feedback Date:</label>
								<div class="col-md-8">
									<input type="text" name="txtCommitedFeedbackDate"
										id="commited-feedback-date"
										ng-model="one.complaint.ticketsummary.committedFeedbackDate"
										class="form-control" disabled />
								</div>
							</div>
						</div>
						<!-- End: Row8 Start: Row9 -->
						<div class="row">
							<div class="col-md-6 form-group">
								<label class="col-md-4 control-label" for="group-sls-date">Group
									SLA Date</label>
								<div class="col-md-8">
									<input type="text" name="txtGroupSLADate1" id="groupSLADate1"
										ng-model="one.complaint.groupSladate" class="form-control"
										disabled />
								</div>

							</div>
							<div class="col-md-6 form-group">
								<label class="col-md-4 control-label" for="DivisionLevelSLADate">Division
									Level SLA Date:</label>
								<div class="col-md-8">
									<input type="text" name="DivisionLevelSLADate"
										id="DivisionLevelSLADate"
										ng-model="one.complaint.divisionE2esladate"
										class="form-control" disabled />
								</div>
							</div>
						</div>
						<!-- Start: Row7 -->
						<div class="row">
							<div class="col-md-6 form-group">
								<label class="col-md-4 control-label" for="special-note">Special
									Note</label>
								<div class="col-md-8">
									<input type="text" name="txtSpecialNote" id="special-note"
										ng-model="one.complaint.ticketsummary.specialNote"
										class="form-control" />
								</div>
							</div>
							<div class="col-md-6 form-group">
								<label class="col-md-4 control-label" for="product">Product</label>
								<div class="col-md-8">
									<input type="text" name="txtProduct" id="product"
										ng-model="one.complaint.ticketsummary.product"
										class="form-control" />
								</div>
							</div>
						</div>
						<!-- End: Row7 -->

						<!-- Start: Row8 -->
						<div class="row">
							<div class="col-md-6 form-group">
								<label class="col-md-4 control-label" for="customer-voice">Customer
									Voice</label>
								<div class="col-md-8">
									<input type="text" name="txtCustomerVoice" id="customer-voice"
										ng-model="one.complaint.ticketsummary.customerVoice"
										class="form-control" />
								</div>
							</div>
							<div class="col-md-6 form-group">
								<label class="col-md-4 control-label" for="loyality-indicator">Loyalty
									Indicator</label>
								<div class="col-md-8">
									<input type="text" name="txtLoyalityIndicator"
										id="loyality-indicator"
										ng-model="one.complaint.ticketsummary.loyaltyIndicator"
										class="form-control" />
								</div>
							</div>
						</div>
						<!-- End: Row8 -->

						<!-- Start: Row9 -->
						<div class="row">
							<div class="col-md-6 form-group">
								<label class="col-md-4 control-label" for="media">Media</label>
								<div class="col-md-8">
									<select class="form-control" id="media" name="media"
										ng-model="one.complaint.ticketsummary.media">
										<option value="121">121</option>
										<option value="Email">Email</option>
										<option value="Facebook">Facebook</option>
										<option value="Chat">Chat</option>
										<option value="158">158</option>
										<option value="Retailer">Retailer</option>
										<option value="GPC/GPCF/IP">GPC/GPCF/IP</option>
										<option value="Internal">Internal</option>
									</select>
								</div>
							</div>
							<div class="col-md-6 form-group">
								<label class="col-md-4 control-label" for="company-name-bs-code">BS
									Code</label>
								<div class="col-md-8">
									<input type="text" name="txtCompanyNameBsCode"
										id="company-name-bs-code"
										ng-model="one.complaint.ticketsummary.bscode"
										class="form-control" />
								</div>
							</div>
						</div>
						<!-- End: Row9 -->

						<!-- Start: Row9 -->
						<div class="row">
							<div class="col-md-6 form-group">
								<label class="col-md-4 control-label" for="massTag">Mass
									Tag</label>
								<div class="col-md-8">
									<input type="text" class="form-control" id="massTag"
										name="massTag" ng-model="one.complaint.massTag" disabled />
								</div>
							</div>
							<div class="col-md-6 form-group">
								<label class="col-md-4 control-label" for="comment">Agent
									Comment</label>
								<div class="col-md-8">
									<input type="text" class="form-control" id="comment"
										name="comment" ng-model="one.complaint.ticketsummary.comment"
										disabled />
								</div>
							</div>
						</div>
						<!-- End: Row9 -->
						<div class="row">
							<div class="col-md-6 form-group">
								<label class="col-md-4 control-label" for="ticket-valid">Is
									Ticket Invalid</label>
								<div class="col-md-8">
									<input type="checkbox" id="ticket-valid"
										ng-model="one.complaint.ticketsummary.ticketCreatorEvaluationByVocm"
										ng-true-value="'invalid'" ng-false-value="'valid'"
										ng-if="(one.complaint.usergroupByNextUserGroupId.division | lowercase) == 'vocm'" />
									<input type="checkbox" id="ticket-valid"
										ng-model="one.complaint.ticketsummary.vocmEvaluationByTcm"
										ng-true-value="'invalid'" ng-false-value="'valid'"
										ng-if="(one.complaint.usergroupByNextUserGroupId.division | lowercase) == 'technology'" />
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-md-6 form-group">
								<label class="col-md-4 control-label" for="need-feedback">Need
									Sub Group</label>
								<div class="col-md-2">
									<div class="checkbox">
										<input type="checkbox" id="need-feedback"
											ng-model="one.complaint.isSubGroupSelected"
											ng-true-value="'yes'" ng-false-value="'no'"
											ng-disabled="(${fn:length(requestScope.userSubGroupList)})==0" />
									</div>
								</div>
							</div>

							<div class="col-md-6 form-group"
								ng-if="one.complaint.isSubGroupSelected=='yes'">
								<label class="col-md-4 control-label" for="sub-group">Sub
									Groups:</label>
								<div class="col-md-8" style="height: 100px; overflow: scroll;">
									<c:forEach var="aGroup"
										items="${requestScope.userSubGroupList}">
										<div class="row">
											<label class="col-md-8 control-label" for="special-note">${aGroup[1]}</label>
											<div class="col-md-2">
												<div class="checkbox">
													<input type="checkbox" value="${aGroup[0]}"
														ng-click="one.addSubgroup(${aGroup[0]})"
														ng-disabled="one.isSubGroup(${aGroup[0]})"
														ng-checked="one.isSubGroup(${aGroup[0]})">
												</div>
											</div>
										</div>
									</c:forEach>
									<div class="row">
										<button type="button" class="btn btn-info col-md-8"
											ng-click="one.submitSubgroups()"
											ng-disabled="!((one.complaint.usergroupByNextUserGroupId.name | lowercase)==('${sessionScope.UserGroup[0].name}'| lowercase))
											|| (${fn:length(requestScope.userSubGroupList)})==0">Save
											Subgroups</button>
									</div>
								</div>
							</div>
						</div>
						<!-- Start: SMS Options -->
						<fieldset
							ng-if="((one.complaint.usergroupByNextUserGroupId.division | lowercase)== 'vocm'
										&& (one.complaint.status | lowercase) == 'requestforcloser')">
							<div class="row">
								<div class="col-md-12">
									<div class="form-box">
										<br /> <br />
										<h4 class="form-header text-primary">SMS Options:</h4>
									</div>
								</div>
							</div>
							<div class="row">

								<div class="col-md-6 form-group">
									<div class="row">
										<label class="col-md-4 control-label" for="send-sms">Send
											SMS</label>
										<div class="col-md-2">
											<div class="checkbox">
												<input type="checkbox" name="toSendSms"
													ng-model="one.toSendSms">
											</div>
										</div>
									</div>
								</div>
							</div>
						</fieldset>
						<div class="row">
							<fieldset
								ng-if="((one.complaint.usergroupByNextUserGroupId.division | lowercase) == 'vocm'
										&& (one.complaint.status | lowercase) == 'requestforcloser')">
								<div class="col-md-6 form-group">
									<div class="row">
										<label class="col-md-4 control-label" for="smsTemplate">SMS
											Template:</label>
										<div class="col-md-8">
											<textarea class="form-control" rows="4" name="smsTemplate"
												ng-model="one.smsTemplate" disabled></textarea>
										</div>
									</div>
								</div>
								<div class="col-md-6 form-group">
									<div class="row">
										<label class="col-md-4 control-label" for="smsJargon">SMS
											Jargon:</label>
										<div class="col-md-8">
											<textarea class="form-control" rows="4" name="smsText"
												ng-model="one.smsText"></textarea>
										</div>
									</div>
								</div>
							</fieldset>
						</div>

						<!-- End: SMS Options -->

						<!-- Start: Comment Options -->
						<div class="row">
							<div class="col-md-12">
								<div class="form-box">
									<br /> <br />
									<h4 class="form-header text-primary">Comment History:</h4>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-md-12 form-group">
								<div class="row">
									<label class="col-md-2 control-label" for="commentHistory">Comment
										History:</label>
									<div class="col-md-10" style="height: 200px; overflow: scroll;">
										<ul class="list-group"
											ng-repeat="contact in one.ticketCommentHistory">
											<li class="list-group-item">{{contact}}</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
						<!-- End: Comment Options -->

						<!-- Start: DynamicFields -->
						<div class="row">
							<div class="col-md-12">
								<div class="form-box">
									<br /> <br />
									<h4 class="form-header text-primary">Attachments:</h4>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-md-12 form-group">
								<div class="row">
									<div class="col-md-12">
										<label class="col-md-2 control-label" for="commentHistory">Upload
											Files:</label>
										<div class="col-md-10 dropzone" dropzone="" id="dropzone">
											<div class="dz-message" data-dz-message>
												<span class="text-primary"> Drop Files Here to Upload
													<br />OR<br />
													<button type="button" class="btn btn-info">Click
														Here</button>
												</span>
											</div>
										</div>
										<!-- <div class="col-md-10 col-md-offset-2">
											<br />
											<button class="btn btn-success" ng-click="uploadFile()">Upload
												File</button>
											<button class="btn btn-danger" ng-click="reset()">Reset
												Dropzone</button>
										</div> -->
									</div>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-md-12 form-group">
								<label class="col-md-2 control-label" for="xx">Download
									Files:</label>
								<div class="col-md-10" style="height: 150px; overflow: scroll;">
									<ul class="list-group" ng-repeat="file in one.attachmentNames">
										<li class="list-group-item"><a
											href="download?fileName={{file}}">{{file}}</a></li>
									</ul>
								</div>
							</div>
						</div>
						<!-- End: DynamicFields -->

						<!-- Start: Dynamic Content Options -->
						<div
							ng-if="(one.complaint.ticketsummary.complainType | lowercase)=='complaint'">
							<!-- Start: Issues / Ticket Details -->
							<div class="row">
								<div class="col-md-12">
									<div class="form-box">
										<br /> <br />
										<h4 class="form-header text-primary">Service Request
											Additional Information:</h4>
									</div>
								</div>
							</div>
							<!-- End: Issues / Ticket Details -->

							One :
							{{one.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId}}
							{{one.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId
							== 6}}

							<div
								ng-if="(one.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId) == 6"
								ng-include="'resources/dynamic-field-html/bill_usage_balance_info.html'">
							</div>

							<div
								ng-if="one.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 7"
								ng-include="'resources/dynamic-field-html/blackberry_bes.html'"></div>

							<div
								ng-if="one.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 8"
								ng-include="'resources/dynamic-field-html/blackberry_activation.html'"></div>

							<div
								ng-if="one.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 9"
								ng-include="'resources/dynamic-field-html/blackberry.html'"></div>

							<div
								ng-if="one.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 10"
								ng-include="'resources/dynamic-field-html/blackberry_mesg.html'"></div>

							<div
								ng-if="one.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 18"
								ng-include="'resources/dynamic-field-html/dynamic_pricing.html'"></div>

							<div
								ng-if="one.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 19"
								ng-include="'resources/dynamic-field-html/e_care.html'"></div>

							<div
								ng-if="one.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 20"
								ng-include="'resources/dynamic-field-html/end_of_call_notification.html'"></div>

							<div
								ng-if="one.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 22"
								ng-include="'resources/dynamic-field-html/fnf.html'"></div>

							<div
								ng-if="one.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 25"
								ng-include="'resources/dynamic-field-html/gp_app.html'"></div>

							<div
								ng-if="one.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 29"
								ng-include="'resources/dynamic-field-html/ichchhe_tune.html'"></div>

							<div
								ng-if="one.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 32"
								ng-include="'resources/dynamic-field-html/international_roaming.html'"></div>

							<div
								ng-if="one.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 33"
								ng-include="'resources/dynamic-field-html/internet_service.html'"></div>

							<div
								ng-if="one.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 34"
								ng-include="'resources/dynamic-field-html/wimax.html'"></div>

							<div
								ng-if="one.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 35"
								ng-include="'resources/dynamic-field-html/ivr_based_vas.html'"></div>

							<div
								ng-if="one.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 36"
								ng-include="'resources/dynamic-field-html/ivr_campaign.html'"></div>

							<div
								ng-if="one.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 38"
								ng-include="'resources/dynamic-field-html/micro_campaign.html'"></div>

							<div
								ng-if="one.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 40"
								ng-include="'resources/dynamic-field-html/missed_call_alert.html'"></div>

							<div
								ng-if="one.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 41"
								ng-include="'resources/dynamic-field-html/misuse_hotline.html'"></div>

							<div
								ng-if="one.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 49"
								ng-include="'resources/dynamic-field-html/overcharging.html'"></div>

							<div
								ng-if="one.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 57"
								ng-include="'resources/dynamic-field-html/regular_campaign.html'"></div>

							<div
								ng-if="one.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 58"
								ng-include="'resources/dynamic-field-html/regular_campaign_device.html'"></div>

							<div
								ng-if="one.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 64"
								ng-include="'resources/dynamic-field-html/sim_replacement.html'"></div>

							<div
								ng-if="one.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 66"
								ng-include="'resources/dynamic-field-html/sim_replacement_vp.html'"></div>

							<div
								ng-if="one.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 67"
								ng-include="'resources/dynamic-field-html/smart_plan.html'"></div>

							<div
								ng-if="one.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 68"
								ng-include="'resources/dynamic-field-html/sms.html'"></div>

							<div
								ng-if="one.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 70"
								ng-include="'resources/dynamic-field-html/content_cp_gp.html'"></div>

							<div
								ng-if="one.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 72"
								ng-include="'resources/dynamic-field-html/team_tracker.html'"></div>

							<div
								ng-if="one.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 73"
								ng-include="'resources/dynamic-field-html/voice_mtc.html'"></div>

							<div
								ng-if="one.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 74"
								ng-include="'resources/dynamic-field-html/voice_moc.html'"></div>

							<div
								ng-if="one.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 75"
								ng-include="'resources/dynamic-field-html/voice_isd_mtc.html'"></div>

							<div
								ng-if="one.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 76"
								ng-include="'resources/dynamic-field-html/voice_isd_moc.html'"></div>

							<div
								ng-if="one.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 77"
								ng-include="'resources/dynamic-field-html/voice_sms.html'"></div>

							<div
								ng-if="one.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 78"
								ng-include="'resources/dynamic-field-html/vts.html'"></div>

							<div
								ng-if="one.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 79"
								ng-include="'resources/dynamic-field-html/web_sms.html'"></div>

							<div
								ng-if="one.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 80"
								ng-include="'resources/dynamic-field-html/welcome_tune.html'"></div>

							<div
								ng-if="one.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 81"
								ng-include="'resources/dynamic-field-html/bill_delivery_related.html'"></div>

							<div
								ng-if="one.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 82"
								ng-include="'resources/dynamic-field-html/fs_bill_data_payment.html'"></div>

							<div
								ng-if="one.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 89"
								ng-include="'resources/dynamic-field-html/fs_transaction_id.html'"></div>

							<div
								ng-if="one.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 97"
								ng-include="'resources/dynamic-field-html/internet_speed.html'"></div>

							<div
								ng-if="one.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 107"
								ng-include="'resources/dynamic-field-html/internet.html'"></div>

							<div
								ng-if="one.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 99"
								ng-include="'resources/dynamic-field-html/voice_indoor.html'"></div>

							<div
								ng-if="one.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 100"
								ng-include="'resources/dynamic-field-html/voice_outdoor.html'"></div>

							<div
								ng-if="one.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 101"
								ng-include="'resources/dynamic-field-html/voice_quality.html'"></div>

						</div>

						<div class="row">
							<div class="col-md-12">
								<div class="form-box">
									<br /> <br />
									<h4 class="form-header text-primary">Form Submission:</h4>
								</div>
							</div>
							<div class="form-group"
								ng-class="{ 'has-error': myForm.comment.$dirty && myForm.comment.$invalid }">
								<label class="control-label col-md-2" for="active">Comment:</label>
								<div class="col-md-9">
									<textarea class="form-control" rows="4" id="comment"
										name="comment" ng-model="one.comment" required></textarea>
									<div class="help-block" ng-messages="myForm.comment.$error"
										ng-if="myForm.comment.$dirty">
										<div ng-messages-include="errors"></div>
									</div>
								</div>
							</div>
						</div>
						<!-- End: Dynamic Content Options -->
						<br>
						<!-- Start: Action -->
						<div class="row">
							<div class="col-md-3  col-md-offset-3">
								<select ng-model="one.selectedStatus" data-toggle="tooltip"
									data-placement="top" title="Action Assignment"
									ng-change="one.selectedStatusChange(one.selectedStatus)"
									ng-disabled="!(one.complaint.usergroupByNextUserGroupId.name=='${sessionScope.UserGroup[0].name}')"
									class="form-control">
									<option value="">-Select Action-</option>
									<option value="Open">Open</option>
									<option value="Closed"
										ng-if="(one.complaint.usergroupByNextUserGroupId.division | lowercase) == 'vocm'">Closed</option>
									<option value="Hold">Hold</option>
									<option value="Release">Release</option>
									<option value="Reopen"
										ng-if="!((one.complaint.usergroupByNextUserGroupId.division | lowercase) == 'technology')">Reopen</option>
									<option
										ng-if="(one.complaint.wfheader.type | lowercase)=='fixed'"
										value="Rollback">Rollback</option>
									<option value="RequestForCloser"
										ng-if="(one.complaint.wfheader.type | lowercase)=='dynamic'">Request
										for closer</option>
								</select>
							</div>
							<div class="col-md-3">
								<fieldset class="form-group">
									<select ng-model="one.selectedGroup" class="form-control"
										data-toggle="tooltip" data-placement="top"
										title="Action Group Assignment"
										ng-disabled="(one.complaint.wfheader.type | lowercase)!='dynamic'
										 || !((one.complaint.usergroupByNextUserGroupId.name | lowercase)==('${sessionScope.UserGroup[0].name}' | lowercase))
										 ||((one.selectedStatus | lowercase)=='requestforcloser')
										 ||((one.selectedStatus | lowercase)=='closed')
										 || !(one.selectedISCM==null || one.selectedISCM=='' 
										 || one.getCurrentGroup(('${sessionScope.UserGroup[0].name}' | lowercase))!='rp')
										 || (one.complaint.subGroupParentHopId!=null)">
										<option value="">-Select Group-</option>
										<c:forEach var="aGroup" items="${requestScope.allgroupslist}">
											<option value="${aGroup}">${aGroup}</option>
										</c:forEach>
									</select>
								</fieldset>
							</div>
							<div class="col-md-3">
								<button type="button"
									class="btn btn-primary btn-block form-control"
									ng-disabled="myForm.$invalid 
									|| !((one.complaint.usergroupByNextUserGroupId.name | lowercase)==('${sessionScope.UserGroup[0].name}' | lowercase))"
									ng-click="one.submit(('${sessionScope.UserGroup[0].name}' | lowercase))">Submit</button>
							</div>
						</div>
						<%-- <p>{{!(one.complaint.usergroupByNextUserGroupId.name=='${sessionScope.UserGroup[0].name}')}}</p>
						<p>{{myForm.$invalid}}</p> --%>
						<!-- End: Action -->
						<!-- Start: Message -->
						<div class="row">
								<button class="btn btn-lg btn-warning col-md-12" data-ng-show="one.showLoading">
									<span
									 class="glyphicon glyphicon-refresh glyphicon-refresh-animate">
									</span> Working.....
								</button>
							<div id="successMssages" class="alert alert-success col-md-12"
								style="margin-top: 10px;" data-ng-show="one.successMessages"
								data-ng-bind="one.successMessages"></div>
							<div id="errorMessages" class="alert alert-danger col-md-12"
								style="margin-top: 10px;" data-ng-show="one.errorMessages"
								data-ng-bind="one.errorMessages"></div>
						</div>
						<!-- Start: Message -->
					</form>
					<!-- End: Ticket Details Form -->
				</div>
			</div>


			<div class="row" style="overflow: scroll">
				<div class="col-md-12">
					<legend><h4 class="form-header text-primary">Service Request History:</h4></legend>					
					<table
					class="table table-bordered table-inverse table-sm">
					<thead>
						<tr>
							<th ng-click="predicate='name'; reverse=!reverse">Service
								Request No</th>
							<th ng-click="predicate='name'; reverse=!reverse">Category</th>
							<th ng-click="predicate='name'; reverse=!reverse">Issues/Solution</th>
							<th ng-click="predicate='type'; reverse=!reverse">Customer
								Number</th>
							<th ng-click="predicate='active'; reverse=!reverse">User
								Group</th>
							<th ng-click="predicate='active'; reverse=!reverse">Status</th>
							<th ng-click="predicate='active'; reverse=!reverse">Target
								SLA for Division</th>
							<th ng-click="predicate='active'; reverse=!reverse">Target
								SLA for Group</th>
							<th ng-click="predicate='active'; reverse=!reverse">Comments</th>
							<th ng-click="predicate='active'; reverse=!reverse">Created
								Date</th>
							<th ng-click="predicate='active'; reverse=!reverse">Created
								By</th>
							<th ng-click="predicate='active'; reverse=!reverse">Completed
								Date</th>
						</tr>
					</thead>
					<tbody>
						<tr ng-repeat="is in one.ticketHistoryData">
							<td>{{is[0]}}</td>
							<td>{{is[1]}}</td>
							<td>{{is[2]}}</td>
							<td>{{is[3]}}</td>
							<td>{{is[4]}}</td>
							<td>{{is[5]}}</td>
							<td>{{is[6]}}</td>
							<td>{{is[7]}}</td>
							<td>{{is[8]}}</td>
							<td>{{is[9] | date :'yyyy-MM-dd H:mm:ss' }}</td>
							<td>{{is[10]}}</td>
							<td>{{is[11]}}</td>
						</tr>
					</tbody>
				</table>
					
				</div>
				
			</div> 



		</div>
	</div>
</body>
</html>
