
<form name="myForm">
<p>Repeated Ticket</p>
	
<div ng-controller="OneController">
<div id="successMssages" class="alert alert-success"
					data-ng-show="isCtrl.successMessages"
					data-ng-bind="isCtrl.successMessages"></div>
				<div id="errorMessages" class="alert alert-danger"
					data-ng-show="isCtrl.errorMessages"
					data-ng-bind="isCtrl.errorMessages"></div>
<br />
		
	<div class="row">
		<div class="col-md-12 form-group">
			<label class="col-md-2 control-label" for="issueTicket">Ticket
				Number</label>
			<div class="col-md-6">
				<input type="text" name="txtIssueTicket" id="issueTicket"
					ng-model="one.ticketNumber" class="form-control" disabled />
			</div>
		</div>
	</div>

<!-- 	<div class="row">
		<div class="col-md-12 form-group">
			<label class="col-md-2 control-label" for="customerVoice">Customer
				Voice</label></label>
			<div class="col-md-10">
				<textarea class="form-control" id="customerVoice" 
					name="txtAreaCustomerVoice" ng-model="one.customerVoice"></textarea>
			</div>
		</div>
	</div> -->

	<div class="row">
		<div class="col-md-12 form-group">
			<label class="col-md-2 control-label" for="repeatedComments" style="color:red; font-size:medium;">Comments*</label>
			<div class="col-md-10">
				<textarea class="form-control" name="repeatedComments" id="repeatedComments" required autofocus
					name="txtAreaRepeatedComments" ng-model="one.comments"></textarea>
					<span style="color:red; font-size:medium;" ng-show="myForm.repeatedComments.$touched && myForm.repeatedComments.$invalid">The field is required.</span>
			</div>
		</div>
	</div>
	

	<div class="row">
		<div class="col-md-12 form-group">
			<div class="col-md-12">
				<button type="button" class="btn btn-primary pull-right"
					ng-click="submitRepeatedDate(one.ticketNumner,one.customerVoice,one.comments)">Submit</button>
			</div>
		</div>
	</div>
	

<div data-ng-init="fetchAllIRepeatedComplian(one.ticketNumber)"></div>

	<table 
		class="table table-hover table-bordered table-condensed table-responsive"
		ng-table="tableParams">
		<thead>
			<tr>
				<th ng-click="predicate='name'; reverse=!reverse">Ticket Number</th>
				<th ng-click="predicate='type'; reverse=!reverse">Category</th>
				<th ng-click="predicate='active'; reverse=!reverse">Problem</th>
				<th ng-click="predicate='active'; reverse=!reverse">Thana</th>
				<th ng-click="predicate='active'; reverse=!reverse">Created By</th>
				<th ng-click="predicate='active'; reverse=!reverse">Creation Date</th>
				<th ng-click="predicate='active'; reverse=!reverse">Status</th>
			</tr>
		</thead>
		<tbody>
			<tr
				ng-repeat="is in $data">
				<td>{{is.ticketNumber}}</td>
				<td>{{is.issuesolutioncategorymap.issuesolutioncategory.name}}</td>
				<td>{{is.issuesolutioncategorymap.issuesolution.name}}</td>	
				<td>{{is.thana.name}}</td>
				<td>{{is.ticketCreatedBy}}</td>			
				<td>{{is.ticketCreationDate}}</td>
				<td>{{is.status}}</td>
			</tr>
		</tbody>
	</table>
	



<div data-ng-init="fetchAllTicketHistory(one.ticketNumber)"></div>	
		<table 
		class="table table-hover table-bordered table-condensed table-responsive"
		>
		<thead>
			<tr>
				<th ng-click="predicate='name'; reverse=!reverse">Ticket Number</th>
				<th ng-click="predicate='name'; reverse=!reverse">Category</th>
				<th ng-click="predicate='name'; reverse=!reverse">Issues/Solution</th>
				<th ng-click="predicate='type'; reverse=!reverse">Customer Number</th>
				<th ng-click="predicate='active'; reverse=!reverse">User Group</th>
				<th ng-click="predicate='active'; reverse=!reverse">Status</th>
				<th ng-click="predicate='active'; reverse=!reverse">Division SLS</th>
				<th ng-click="predicate='active'; reverse=!reverse">Group SLA</th>
				<th ng-click="predicate='active'; reverse=!reverse">Comments</th>
				<th ng-click="predicate='active'; reverse=!reverse">Created By</th>
			</tr>
		</thead>
		<tbody>
			<tr
				ng-repeat="is in ticketHistoryData">
				<td>{{is[0]}}</td>
				<td>{{is[1]}}</td>
				<td>{{is[2]}}</td>	
				<td>{{is[3]}}</td>
				<td>{{is[4]}}</td>			
				<td>{{is[5]}}</td>
				<td>{{is[6]}}</td>
				<td>{{is[7]}}</td>
				<td>{{is[8]}}</td>
				<td>{{is[9] | date :'dd-MMM-yyyy hh:mm:ss'}}</td>
			</tr>
		</tbody>
	</table>


	<div style="color: red">{{message}}</div>


</div>

</form>