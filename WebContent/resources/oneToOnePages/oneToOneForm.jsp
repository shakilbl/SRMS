<style>
.nav-tabs>li.active>a, .nav-tabs>li.active>a:focus, .nav-tabs>li.active>a:hover
	{
	color: blue;
	cursor: default;
	background-color: #fff;
	border: 1px solid #ddd;
	border-bottom-color: transparent;
}

.nav-tabs>li>a {
	background-color: #ddd;
	color: #f91e03;
}
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
</style>


<br />

<div ng-controller="OneController">

	<%-- dfsdfdsf : {{'${sessionScope.msisdn}'}} --%>

	<input name="hiddenMsisdn" type="hidden" value={{ '${sessionScope.msisdn}'}} />

	<!-- <p>{{one.oneToOneGridWrapperList}}</p> -->
	<!-- Start: Tab -->
	<div class="row">

		<div class="col-md-8 col-md-offset-2">

			<ul class="nav nav-tabs">


				<li class="col-md-6" ng-class="{active: showCreate}"><a
					ng-click="createTicket()">Create Service Request</a></li>


				<li class="col-md-6" ng-class="{active: showSearch}"><a
					ng-click="search()">Search</a></li>

			</ul>
		</div>

	</div>
	<!-- End: Tab -->

	<br /> <br /> <br /> <br />

	<!-- Start: Search Page -->
	<div class="row" ng-show="showSearch">
		<div class="col-md-8 col-md-offset-2">
			<div class="row">
				<!-- <div class="col-md-1">
                        <label class="control-label" for="theSearch">Search</label>
                </div> -->
				<div class="col-md-12">
					<div id="errorMessages" class="alert alert-danger"
						data-ng-show="errorMessages" data-ng-bind="errorMessages"></div>
					<label>Searching Criteria: </label>
				</div>
				<div
					style="display: inline-block; vertical-align: top; overflow: hidden;">
					<select name="search_criteria" ng-model="search_criteria.id"
						class="form-control">
						<option value="mobile">Customer Mobile Number</option>
						<option value="srms">SRMS Ticket Number</option>
						<option value="old_gptts">Old GPTTS Ticket Number</option>
					</select>

				</div>

				<div>
					<div style="width: 5px; height: 5px;"></div>
					<input type="text" id="theSearch" class="form-control"
						ng-model="searchText" placeholder="Search.." />
					<div style="width: 5px; height: 5px;"></div>
				</div>
			</div>
		</div>
		<button type="button" class="btn btn-primary col-md-4 col-md-offset-4"
			ng-show="showSearch" style="margin-right: 5px;" ng-click="doSearch()">Search</button>


		<br /> <br /> <br /> <br /> <br />







	</div>
	<!-- End: Search Page -->

	<!-- Start: Ticket Creation -->

	<!--  <div class="panel-group" id="accordion"> 
		 <div class="panel panel-default"> 
			 <div class="panel-heading"> -->
	<div class="row" ng-show="showCreate">
		<div class="col-md-8 col-md-offset-2">

			<div class="col-md-12 form-group">
				<label class="col-md-3 control-label" for="issue-ticket">Issue
					Category</label>
				<div class="col-md-9">
					<!-- 					IS ID:{{iscm.id}} <br> IS Name:{{iscm.name}} 
					<br> Select IS: -->
					<input class="form-control" type="text" ng-model="iscm"
						typeahead="isc as isc.name for isc in abc | filter:$viewValue" />
				</div>
			</div>


			<br>
			<div class="col-md-12 form-group">
				<label class="col-md-3 control-label" for="customer-number">Customer
					Number</label>
				<div class="col-md-9">
					(MSISDN start with 88017xxxxxxxx) : <input type="text"
						ng-model="selectedCustomerNumber"
						value='{{one.ticketsummary.customernumber}}' class="form-control" />
				</div>
			</div>


			<div class="col-md-12 form-group">
				<label class="col-md-3 control-label" for="customer-number"></label>
				<div class="col-md-9">
					<button type="button"
						class="btn btn-primary col-md-6 col-md-offset-4 pull-right"
						ng-show="showCreate" ng-click="formDataLoad()">Submit</button>
				</div>
			</div>



		</div>


		<br> <br>

		<!-- Load waiting -->
		<div  class="col-md-8 col-md-offset-2" data-ng-show="showLoading">
			<button class="btn btn-lg btn-warning col-md-12">
				<span class="glyphicon glyphicon-refresh glyphicon-refresh-animate">
				</span> Loading...
			</button>
		</div>

		<!-- Show Sucess / Error Message -->
		<div class="col-md-8 col-md-offset-2">
			<div id="successMssages" class="alert alert-success"
				data-ng-show="successMessages" data-ng-bind="successMessages"></div>

			<div id="errorMessages" class="alert alert-danger"
				data-ng-show="errorMessages" data-ng-bind="errorMessages"></div>
		</div>

	</div>
	<!-- End: Ticket Creation -->
	<!--  </div> -->
	<!-- </div>  -->
	<br>

	<!--        search_criteria : {{search_criteria}}-->
	<!-- <div ng-include="'resources/dynamic-field-html/blackberry_bes.html'"></div> -->

	<div ng-show="showSearch" class="table-responsive">
		<div style="margin-left: 0.8%;">
			<div class="row-fluid span12">
				<div>
					<table class="table table-hover table-condensed table-striped">
						<thead>
							<tr>
								<th><a
									data-ng-click="sortType = 'name';
                                                       sortReverse = !sortReverse"
									style="color: white; text-decoration: none;">MSISDN</a></th>
								<th><a
									data-ng-click="sortType = 'name';
                                                       sortReverse = !sortReverse"
									style="color: white; text-decoration: none;">SR Number</a></th>
								<th><a
									data-ng-click="sortType = 'name';
                                                       sortReverse = !sortReverse"
									style="color: white; text-decoration: none;">I/S Category</a></th>
								<th><a
									data-ng-click="sortType = 'name';
                                                       sortReverse = !sortReverse"
									style="color: white; text-decoration: none;">I/S Sub
										Category</a></th>

								<!-- <th><a
										data-ng-click="sortType = 'name';
                                                       sortReverse = !sortReverse"
										style="color: white; text-decoration: none;">District
									</a></th> -->
								<th><a
									data-ng-click="sortType = 'name';
                                                       sortReverse = !sortReverse"
									style="color: white; text-decoration: none;">Circle Thana</a></th>


								<th><a
									data-ng-click="sortType = 'name';
                                                       sortReverse = !sortReverse"
									style="color: white; text-decoration: none;">SR Status</a></th>
								<th><a
									data-ng-click="sortType = 'name';
                                                       sortReverse = !sortReverse"
									style="color: white; text-decoration: none;">Solution Type</a></th>
								<th><a
									data-ng-click="sortType = 'name';
                                                       sortReverse = !sortReverse"
									style="color: white; text-decoration: none;">Committed
										Solution Date</a></th>
								<th><a
									data-ng-click="sortType = 'name';
                                                       sortReverse = !sortReverse"
									style="color: white; text-decoration: none;">Committed
										Feedback Date</a></th>
								<th><a
									data-ng-click="sortType = 'name';
                                                       sortReverse = !sortReverse"
									style="color: white; text-decoration: none;">SR Creation
										Date</a></th>

								<th><a
									data-ng-click="sortType = 'name';
                                                       sortReverse = !sortReverse"
									style="color: white; text-decoration: none;">Agent Comments</a></th>

								<th><a
									data-ng-click="sortType = 'name';
                                                       sortReverse = !sortReverse"
									style="color: white; text-decoration: none;">Last Comment</a></th>

								<th><a
									data-ng-click="sortType = 'name';
                                                       sortReverse = !sortReverse"
									style="color: white; text-decoration: none;">Complaint Type</a></th>

								<th><a
									data-ng-click="sortType = 'name';
                                                       sortReverse = !sortReverse"
									style="color: white; text-decoration: none;">Media</a></th>

								<th><a
									data-ng-click="sortType = 'name';
                                                       sortReverse = !sortReverse"
									style="color: white; text-decoration: none;">Mass Tag</a></th>


							</tr>
						</thead>
						<tbody
							data-ng-repeat="oneToOneGridWrapper in one.oneToOneGridWrapperList | orderBy:sortType:sortReverse">
							<tr id="oneToOneGridWrapper.ticketsummary" class="clickableRow"
								title="Click to toggle collapse/expand day summaries for this store."
								data-ng-click="selectTableRow($index, oneToOneGridWrapper.ticketsummary)">
								<td>{{oneToOneGridWrapper.ticketsummary.customerNumber}}</td>
								<td>{{oneToOneGridWrapper.ticketsummary.ticketNumber}}</td>
								<td>{{oneToOneGridWrapper.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.name}}</td>
								<td>{{oneToOneGridWrapper.ticketsummary.issuesolutioncategorymap.issuesolution.name}}</td>
								<!-- <td>{{oneToOneGridWrapper.ticketsummary.thana.district.name}}</td> -->
								<td>{{oneToOneGridWrapper.ticketsummary.circleThana}}</td>
								<td>{{oneToOneGridWrapper.ticketsummary.status}}</td>
								<td>{{oneToOneGridWrapper.ticketsummary.issuesolutioncategorymap.issuesolution.name}}</td>
								<td>{{oneToOneGridWrapper.ticketsummary.committedSolutionDate
									| date :'dd-MMM-yyyy HH:mm:ss'}}</td>
								<td>{{oneToOneGridWrapper.ticketsummary.committedFeedbackDate|
									date :'dd-MMM-yyyy HH:mm:ss'}}</td>
								<td>{{oneToOneGridWrapper.ticketsummary.ticketCreationDate|
									date :'dd-MMM-yyyy HH:mm:ss'}}</td>
								<td>{{oneToOneGridWrapper.ticketsummary.comment}}</td>
								<td>{{oneToOneGridWrapper.ticketsummary.lastComment}}</td>
								<td>{{oneToOneGridWrapper.ticketsummary.complainType}}</td>
								<td>{{oneToOneGridWrapper.ticketsummary.media}}</td>
								<td>{{getMassTag(oneToOneGridWrapper.ticketsummary.ticketNumber)}}</td>

							</tr>
							<tr data-ng-show="!dayDataCollapse[$index]">
								<td colspan="2">&nbsp;</td>
								<td colspan="7">
									<div style="float: left; margin-left: -10%; width: 100%;">
										<div class="pull-right">
											<table class="table table-condensed table-striped"
												style="background-color: #EEEEEE">
												<thead>
													<tr>
														<th></th>
														<th>Hops ID</th>
														<th>Issue Category Name</th>
														<th>Issue Solution Name</th>
														<th>Task Creator Group</th>
														<th>Task Created By</th>
														<th>Task Creation Date</th>
														<th>Task Owner Group</th>
														<th>Task Owner Name</th>
														<th>Task Completed Date</th>
														<th>Division SLA</th>
														<th>Group SLA</th>
														<th>Mass Tag</th>
														<th>Hop wise Comments</th>
														<th>SR Status</th>
														<th>Hop Status</th>

													</tr>
												</thead>
												<tbody
													data-ng-repeat="tickethop in oneToOneGridWrapper.tickethops">
													<tr>
														<td class="pullright">
															<button type="btn btn-small"
																title="Click to show transactions for this specific day..."
																data-ng-click="tickethop.issuesolution = !tickethop.issuesolution"
																id="btn_list_icon"></button>
														</td>
														<td>{{tickethop.ticketHopsId}}</td>
														<td>{{tickethop.issuesolutioncategorymap.issuesolutioncategory.name}}</td>
														<td>{{tickethop.issuesolutioncategorymap.issuesolution.name}}</td>
														<td>{{tickethop.usergroupByPreviousUserGroupId.name}}</td>
														<td>{{tickethop.taskCreatedBy}}</td>
														<td>{{tickethop.taskCreationDate | date :'dd-MMM-yyyy
															HH:mm:ss'}}</td>
														<td>{{tickethop.usergroupByNextUserGroupId.name}}</td>
														<td>{{tickethop.taskCompletedby}}</td>
														<td>{{tickethop.taskCompletionDate | date
															:'dd-MMM-yyyy HH:mm:ss'}}</td>
														<td>{{tickethop.divisionE2esladate | date
															:'dd-MMM-yyyy HH:mm:ss'}}</td>
														<td>{{tickethop.groupSladate | date :'dd-MMM-yyyy
															HH:mm:ss'}}</td>
														<td>{{tickethop.massTag}}</td>
														<td>{{getHopwiseComment(tickethop.ticketHopsId)}}</td>
														<!-- SRMS08201600003758 -->
														<td>{{tickethop.ticketsummary.status}}</td>
														<td>{{tickethop.status}}</td>

													</tr>
													<tr data-ng-show="tickethop.issuesolution">
														<td>&nbsp;</td>
														<td colspan="6">
															<div>
																<div>
																	<table
																		class="table table-hover table-condensed table-striped">
																		<thead>
																			<tr>
																				<th></th>
																				<th>LockUnlockID</th>
																				<th>Ticket Hop ID</th>
																				<th>Date</th>
																				<th>Ticket Status</th>
																				<th>Activity By</th>
																			</tr>
																		</thead>
																		<tbody
																			data-ng-repeat="ticketlockunlockdetailList in oneToOneGridWrapper.ticketlockunlockdetails">
																			<tr
																				data-ng-repeat="ticketlockunlockdetail in ticketlockunlockdetailList"
																				ng-if="ticketlockunlockdetail.ticketHopsId == tickethop.ticketHopsId">
																				<td>&nbsp;</td>
																				<td>{{ticketlockunlockdetail.ticketLockUnlockId}}</td>
																				<td>{{ticketlockunlockdetail.ticketHopsId}}</td>
																				<td>{{ticketlockunlockdetail.activityDate |
																					date :'dd-MMM-yyyy HH:mm:ss'}}</td>
																				<td>{{ticketlockunlockdetail.flag}}</td>
																				<td>{{ticketlockunlockdetail.activityBy}}</td>
																			</tr>
																		</tbody>
																	</table>
																</div>
															</div>
														</td>
													</tr>




												</tbody>
											</table>
										</div>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>

	</div>




	<!-- </div>  -->
	<!-- End: Ticket Creation -->

	<!-- Start: Buttons -->

	<!-- End: Buttons -->

	<!-- Search Grid
     Added By Reazul -->

</div>