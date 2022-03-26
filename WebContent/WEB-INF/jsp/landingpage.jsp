<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!Doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<script type="text/javascript" src="resources/js/bstable.js"></script>
<script type="text/javascript" src="resources/js/angular-messages.js"></script>

<script
	src="<c:url value='/resources/js/app_js/landingpage_service_controller.js' />"></script>

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

@
-webkit-keyframes spin2 {from { -webkit-transform:rotate(0deg);
	
}

to {
	-webkit-transform: rotate(360deg);
}

}
@
keyframes spin {from { transform:scale(1)rotate(0deg);
	
}

to {
	transform: scale(1) rotate(360deg);
}

}
table, thead, tr, td {
	border: 1px solid silver;
}

.table>thead>tr>th {
	border: 1px solid silver;
	background-color: #e6e6e6;
}

.wrap_able {
	overflow: hidden;
	max-width: 400px;
	word-wrap: break-word;
	/* word-break: break-all; */
	white-space: normal;
}
</style>
</head>
<body>
	<div class="container">
		<div class="row">
			<div class="col-md-12"
				data-ng-controller="LandingpageController as FirstCtrl">
				<!-- Total bubble of every type of ticket-->
				<div class="row" style="margin-bottom: 10px;">
					<div class="col-md-3">
						<p class="text-uppercase" style="">
							<b>Service Request Summary</b>
						</p>
					</div>
					<div class="col-md-2">
						<span class="label label-info">Total Open <span
							class="badge">${requestScope.totalopen}</span></span>
					</div>
					<div class="col-md-2">
						<span class="label label-info">Total Hold <span
							class="badge">${requestScope.totalhold}</span></span>
					</div>
					<div class="col-md-2">
						<span class="label label-info">Total RequestForCloser <span
							class="badge">${requestScope.totalrequestforcloser}</span></span>
					</div>
					<div class="col-md-3">
						<label class="control-label">Group: <b>${sessionScope.UserGroup[0].name}</b></label>
					</div>
				</div>
				<br />
				<div class="row" data-ng-show="FirstCtrl.showLoading">
					<button class="btn btn-lg btn-warning col-md-12">
						<span
							class="glyphicon glyphicon-refresh glyphicon-refresh-animate">
						</span> Loading...
					</button>
				</div>

				<div class="table-responsive" ng-if="!FirstCtrl.showLoading">
					<table ng-table="FirstCtrl.tableParams" class="table"
						style="white-space: nowrap;" show-filter="true">
						<tr ng-repeat="contact in $data"
							ng-style="FirstCtrl.getColorCss(contact.groupSlastatus)">
							<td>
								<div class="form-check" style="text-align: center;">
									<label class="form-check-label"><input
										class="form-check-input" type="checkbox"
										ng-disabled="{{contact.status == 'Closed'}}"
										ng-checked="FirstCtrl.massTicked(contact.ticketHopsId)"
										ng-click="FirstCtrl.addMass(contact.ticketHopsId)" /></label>
								</div>
							</td>
							<td data-title="''"><button type="button"
									class="btn btn-info btn-sm" ng-disabled="{{contact.status == 'Closed' || ('${sessionScope.UserGroup[0].name}' == 'Direct Sales' && '${sessionScope.windowsloginid}' != contact.ticketsummary.ticketCreatedBy)}}"
									ng-click="FirstCtrl.redirectToTicketdetails(contact)">Details</button></td>

							<td data-title="'Severity'" sortable="'ticketsummary.severity'"
								filter="{ 'ticketsummary.severity': 'text' }"
								ng-if="FirstCtrl.gridColumnVisibleDecision('Severity')">{{contact.ticketsummary.severity}}
							</td>

							<td data-title="'Customer Number'"
								sortable="'ticketsummary.customerNumber'"
								filter="{ 'ticketsummary.customerNumber': 'text' }"
								ng-if="FirstCtrl.gridColumnVisibleDecision('Customer Number')">{{contact.ticketsummary.customerNumber}}
							</td>

							<td data-title="'Loyalty Indicator'"
								sortable="'ticketsummary.loyaltyIndicator'"
								filter="{ 'ticketsummary.loyaltyIndicator': 'text' }"
								ng-if="FirstCtrl.gridColumnVisibleDecision('Loyalty Indicator')">{{contact.ticketsummary.loyaltyIndicator}}
							</td>
							<td data-title="'BSCode'" sortable="'ticketsummary.bscode'"
								filter="{ 'ticketsummary.bscode': 'text' }"
								ng-if="FirstCtrl.gridColumnVisibleDecision('BSCode')">{{contact.ticketsummary.bscode}}
							</td>
							<td data-title="'Vip Flag'" sortable="'ticketsummary.vipflag'"
								filter="{ 'ticketsummary.vipflag': 'text' }"
								ng-if="FirstCtrl.gridColumnVisibleDecision('Vip Flag')">{{contact.ticketsummary.vipflag}}
							</td>
							<td data-title="'CircleThana'"
								sortable="'ticketsummary.circleThana'"
								filter="{ 'ticketsummary.circleThana': 'text' }"
								ng-if="FirstCtrl.gridColumnVisibleDecision('CircleThana')">{{contact.ticketsummary.circleThana}}
							</td>
							<td data-title="'Problem Component(VoCM_TCM)'"
								sortable="'ticketsummary.ticketdynamicfield.d30'"
								filter="{ 'ticketsummary.ticketdynamicfield.d30': 'text' }"
								ng-if="FirstCtrl.gridColumnVisibleDecision('Problem Component(VoCM_TCM)')">{{contact.ticketsummary.ticketdynamicfield.d30}}</td>

							<td data-title="'Problem Component(SOC)'"
								sortable="'ticketsummary.problemComponent'"
								filter="{ 'ticketsummary.problemComponent': 'text' }"
								ng-if="FirstCtrl.gridColumnVisibleDecision('Problem Component(SOC)')">{{contact.ticketsummary.problemComponent}}</td>

							<td data-title="'Task Target Time'" sortable="'groupSladate'"								
								ng-if="FirstCtrl.gridColumnVisibleDecision('Task Target Time')">{{contact.groupSladate
								| date :'dd-MM-yyyy HH:mm:ss'}}</td>

							<td data-title="'E2E SLA Status'"
								sortable="'FirstCtrl.e2eSlaStatus'"
								filter="{ 'FirstCtrl.e2eSlaStatus': 'text' }"
								ng-if="FirstCtrl.gridColumnVisibleDecision('E2E SLA Status')">{{FirstCtrl.getE2ESlaStatus(contact.ticketsummary.committedFeedbackDate)}}</td>

							<!-- | date :''yyyy-MM-dd HH:mm:ss Z' -->

							<td data-title="'Agent Comment'"
								sortable="'ticketsummary.comment'"
								filter="{ 'ticketsummary.comment': 'text' }"
								ng-if="FirstCtrl.gridColumnVisibleDecision('Agent Comment')">{{contact.ticketsummary.comment}}
							</td>
							
							<td data-title="'Group SLA Date'" sortable="'groupSladate'"
								ng-if="FirstCtrl.gridColumnVisibleDecision('Group SLA Date')">{{contact.groupSladate
								| date :'dd-MM-yyyy HH:mm:ss'}}</td>
							<!-- filter="{ 'contact.groupSladate': 'text' }" -->
							<td data-title="'Group SLA Deviation'"
								sortable="'groupSlastatus'"
								filter="{ 'groupSlastatus': 'text' }"
								ng-if="FirstCtrl.gridColumnVisibleDecision('Group SLA Deviation')">{{contact.groupSlastatus}}
							</td>
							<td data-title="'Committed Feedback Date'"
								sortable="'ticketsummary.committedFeedbackDate'"
								ng-if="FirstCtrl.gridColumnVisibleDecision('Committed Feedback Date')">{{contact.ticketsummary.committedFeedbackDate
								| date :'dd-MM-yyyy HH:mm:ss'}}</td>
							<!-- filter="{ 'ticketsummary.committedFeedbackDate': 'text' }" -->
							<td data-title="'Committed Solution Date'"
								sortable="'ticketsummary.committedSolutionDate'"
								ng-if="FirstCtrl.gridColumnVisibleDecision('Committed Solution Date')">{{contact.ticketsummary.committedSolutionDate
								| date :'dd-MM-yyyy HH:mm:ss'}}</td>
							<!-- filter="{ 'ticketsummary.committedSolutionDate': 'text' }" -->
							<td data-title="'Ticket Creation Date'"
								sortable="'ticketsummary.ticketCreationDate'"
								ng-if="FirstCtrl.gridColumnVisibleDecision('Ticket Creation Date')">{{contact.ticketsummary.ticketCreationDate
								| date :'dd-MM-yyyy HH:mm:ss'}}</td>
							<!-- filter="{ 'ticketsummary.ticketCreationDate': 'text' }" -->
							<td data-title="'Ticket Created By'"
								sortable="'ticketsummary.ticketCreatedBy'"
								filter="{ 'ticketsummary.ticketCreatedBy': 'text' }"
								ng-if="FirstCtrl.gridColumnVisibleDecision('Ticket Created By')">{{contact.ticketsummary.ticketCreatedBy}}
							</td>
							<td data-title="'Mass Tag'" sortable="'massTag'"
								filter="{ 'massTag': 'text' }"
								ng-if="FirstCtrl.gridColumnVisibleDecision('Mass Tag')">{{contact.massTag}}</td>
							<td data-title="'Type'" sortable="'ticketsummary.complainType'"
								filter="{ 'ticketsummary.complainType': 'text' }"
								ng-if="FirstCtrl.gridColumnVisibleDecision('Type')">{{contact.ticketsummary.complainType}}
							</td>
							<td data-title="'Media'" sortable="'ticketsummary.media'"
								filter="{ 'ticketsummary.media': 'text' }"
								ng-if="FirstCtrl.gridColumnVisibleDecision('Media')">{{contact.ticketsummary.media}}
							</td>
							<td data-title="'Product'" sortable="'ticketsummary.product'"
								filter="{ 'ticketsummary.product': 'text' }"
								ng-if="FirstCtrl.gridColumnVisibleDecision('Product')">{{contact.ticketsummary.product}}
							</td>

							<td data-title="'Attachment'"
								ng-if="FirstCtrl.gridColumnVisibleDecision('Attachment')">
								<img src='resources/img/paperclip-128.png' alt="No Image"
								width='19' height='19' style="margin: auto; display: block;"
								ng-if="contact.ticketsummary.attachment === 'Yes'" />
							</td>


						</tr>
					</table>
				</div>
				<!--  -->
				<!-- Submit Confirmation Modal -->
				<div class="modal fade" id="confirmationModal" tabindex="-1"
					role="dialog">
					<div class="modal-dialog modal-sm">
						<div class="modal-content">
							<div class="modal-header">
								<button type="button" class="close" data-dismiss="modal"
									aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div class="modal-body">Are you sure you want to Submit?</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-default"
									data-dismiss="modal">Cancel</button>
								<button type="button" class="btn btn-primary"
									ng-click="FirstCtrl.submit()" data-dismiss="modal">Submit</button>
							</div>
						</div>
						<!-- /.modal-content -->
					</div>
					<!-- /.modal-dialog -->
				</div>
				<!-- End of Submit Confirmation Modal -->
				<br />
				<form name="smsForm" class="form-horizontal" role="form">
					<div class="form-group"  ng-if="('${sessionScope.UserGroup[0].division}'| lowercase) == 'vocm'">
						<label class="control-label col-sm-2" for="smsText">SMS
							Text:</label>
						<div class="col-sm-8"
							ng-class="{ 'has-error': smsForm.smsText.$dirty && smsForm.smsText.$invalid }">
							<textarea class="form-control" rows="4" id="smsText"
								name="smsText" ng-model="FirstCtrl.smsText" required></textarea>
							<div class="help-block" ng-messages="smsForm.smsText.$error"
								ng-if="smsForm.smsText.$dirty">
								<div ng-messages-include="errors"></div>
							</div>
						</div>
						<div class="col-sm-2">
							<button type="button" class="btn btn-primary btn-block"
								ng-disabled="smsForm.$invalid" ng-click="FirstCtrl.submitSms()">Send
								SMS</button>
						</div>
					</div>
				</form>
				<form name="myForm" class="form-horizontal" role="form">
					<div class="form-group" ng-show="false"
						ng-class="{ 'has-error': myForm.comment.$dirty && myForm.comment.$invalid }">
						<label class="control-label col-sm-2" for="active">Comment:</label>
						<div class="col-sm-10">
							<textarea class="form-control" rows="4" id="comment"
								name="comment" ng-model="FirstCtrl.comment" required></textarea>
							<div class="help-block" ng-messages="myForm.comment.$error"
								ng-if="myForm.comment.$dirty">
								<div ng-messages-include="errors"></div>
							</div>
						</div>
					</div>
					<div class="col-sm-3  col-sm-offset-9" ng-show="false">
						<button type="button" class="btn btn-primary btn-block"
							ng-disabled="myForm.$invalid" ng-click="FirstCtrl.submit()">Submit</button>
					</div>
				</form>

				<div class="row">
					<div id="successMssages" class="alert alert-success col-md-12"
						style="margin-top: 10px;" data-ng-show="FirstCtrl.successMessages"
						data-ng-bind="FirstCtrl.successMessages"></div>
					<div id="errorMessages" class="alert alert-danger col-md-12"
						style="margin-top: 10px;" data-ng-show="FirstCtrl.errorMessages"
						data-ng-bind="FirstCtrl.errorMessages"></div>
				</div>
			</div>
		</div>
	</div>

	<div class="modal fade" id="confirmationModal" tabindex="-1">
		<div class="modal-dialog modal-sm">
			<div class="modal-content">
				<div class="modal-header"></div>
				<div class="modal-body">
					<label>User Name:</label> <input type="text" /><br /> <label>Password:</label>
					<input type="password" />
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary" ng-click=""
						data-dismiss="modal">Login</button>
				</div>
			</div>
			<!-- /.modal-content -->
		</div>
	</div>
</body>
</html>