
<!-- 		<p>Issue ID: {{one.issueId}}</p>
                <p>Area ID: {{one.areaId}}</p>
                <p>{{allIssueSolutions.issuesolutioncategories[0].name}}</p>
                <p>{{allIssueSolutions.thanas[0].name}}</p> -->

<head>
<!-- <script type="text/javascript">
	$('button:button').click(function() {

		$('button:button').attr("disabled", true);
	});
</script> -->

<script>
	function countChar(val) {
		var len = val.value.length+1;
		if (len >= 1000) {
			val.value = val.value.substring(0, 999);
		} else {
			$('#charNum').text(1000 - len + "/1000");
		}
	};
</script>
</head>

<div ng-controller="TicketCreationController as ticketCtrl">
	<div class="row">

		<div id="successMssages" class="alert alert-success"
			data-ng-show="successMessages" data-ng-bind="successMessages"></div>

		<div id="errorMessages" class="alert alert-danger"
			data-ng-show="errorMessages" data-ng-bind="errorMessages"></div>
		<br />

		<div>
			<input id='id_role_current' type='hidden' value='ticket_creator' />
			<input id='id_role_done' type='hidden' value='' />
		</div>
	</div>

	<form name="oneToOneForm" class="form-horizontal">
		<div class="panel-group" id="accordion">
			<div class="panel panel-default">
				<div class="panel-heading">
					<h4 class="panel-title">
						<a data-toggle="collapse" data-parent="#accordion"
							href="/#collapse1">DS Ticket Summary</a>
					</h4>
				</div>
				<div id="collapse1" class="panel-collapse collapse in">
					<div class="panel-body">
						<div class="row">
							<div class="col-md-12">

								<!-- Start: Row0 -->
								<div class="row">
									<div class="col-md-6 form-group">
										<label class="col-md-4 control-label" for="issue-ticket">Issue
											Category</label>
										<div class="col-md-8">
											<input type="text" class="form-control"
												ng-model="one.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.name"
												disabled />
										</div>
									</div>
									<div class="col-md-6 form-group">
										<label class="col-md-4 control-label" for="issue-ticket">Issue-Sub
											Category</label>
										<div class="col-md-8">
											<input type="text"
												ng-model="one.ticketsummary.issuesolutioncategorymap.issuesolution.name"
												class="form-control" disabled />
										</div>
									</div>

								</div>
								<!-- End: Row0 -->

								<!-- Start: Row10 -->
								<div class="row">
									<div class="col-md-6 form-group">
										<label class="col-md-4 control-label" for="delivery-number">Delivery
											Number</label>
										<div class="col-md-8">
											<input type="text"
												ng-model="deliveryNumber"
												class="form-control" placeholder="Enter numeric value" />
										</div>
									</div>
									<div class="col-md-6 form-group">
										<label class="col-md-4 control-label" for="collection-amount">Collection
											Amount(BDT)</label>
										<div class="col-md-8">
											<input type="number"
												ng-model="collectionAmount"
												class="form-control" placeholder="Enter numeric value" />

										</div>
									</div>
								</div>
								<!-- End: Row10 -->

								<!-- Start: Row1 -->

								<div class="row">
									<div class="col-md-6 form-group">
										<label class="col-md-4 control-label" for="collection-mode">Collection
											Mode <font size="5" color=red>*</font>
										</label>
										<div class="col-md-8">
											<select class="form-control"
												ng-change=" can call controller function "
												ng-model="collectionMode">
												<option value=""></option>
												<option value="Card">Card</option>
												<option value="PO">PO</option>
												<option value="Deposit By Client">Deposit By client</option>
											</select>
										</div>
									</div>
									<div class="col-md-6 form-group">
										<label class="col-md-4 control-label" for="company-bscode">
											Company BS-Code</label>
										<div class="col-md-8">
											<input type="text"
												ng-model="companyBsCode"
												class="form-control" />
										</div>
									</div>
								</div>
								<!-- End: Row1 -->

								<!-- Start: Row2 -->
								<div class="row">
									<div class="col-md-6 form-group">
										<label class="col-md-4 control-label" for="complain-type">Deposit Date</label>
										<div class="col-md-8" id="complain-type">
											<select class="form-control"
												ng-change="showhide(one.ticketsummary.complainType)"
												ng-model="one.ticketsummary.complainType">
												<option value=""></option>
												<option value="Interaction">Interaction</option>
												<option value="Complaint">Complaint</option>
												<option value="Voice">Voice</option>
												<option value="Feedback">Feedback</option>
												<option value="Report">Report</option>
											</select>
										</div>
									</div>
									<div class="col-md-6 form-group">
										<label class="col-md-4 control-label" for="additional-number">Deposit
											Bank</label>
										<div class="col-md-8">
											<select class="form-control" id="depositBank"
												ng-model="one.ticketsummary.priority">
												<option value="SCB">SCB</option>
												<option value="HSBC">HSBC</option>
												<option value="Prime bank">Prime bank</option>
												<option value="SIBL">SIBL</option>
												<option value="SouthEast">SouthEast</option>
												
											</select>
										</div>
									</div>
								</div>
								<!-- End: Row2 -->

			
								<!-- Start: Row9 -->
								<div class="row">

									<div class="col-md-6 form-group">
										<label class="col-md-4 control-label" for="description">Description
											</label>
										<div class="col-md-8">

											<!--  id="field" -->
											<textarea class="form-control" onkeypress="countChar(this)"
												name="description" ng-model="description"
												rows="4"></textarea>

											<div id="charNum"></div>
										</div>
									</div>


								</div>
							</div>
						</div>
						<!-- End: Row9 -->
						.
					</div>
				</div>
			</div>

			
			<div class="panel panel-default">
				<div class="panel-heading">
					<h4 class="panel-title">
						<a data-toggle="collapse" data-parent="#accordion"
							href="/#collapse2">Attachment</a>
					</h4>
				</div>
				<div id="collapse2" class="panel-collapse collapse">
					<div class="panel-body">
						<div ng-show="attachment">


							<!-- <div ng-controller="FileUploadController"> -->
							<div>
								<div class="row">
									<div class="col-md-12">
										<div class="dropzone" dropzone="" id="dropzone"
											style="padding: 0;">
											<div class="dz-message" data-dz-message>
												<span class="text-primary"> Drop Files Here to Upload
													<br />OR<br />
													<button type="button" class="btn btn-info">Click
														Here</button>
												</span>
											</div>
										</div>
									</div>
								</div>
								<div class="row">
									<div class="col-md-12">
										<br />
										<button type="button" ng-disabled="isUploadfileDisable"
											ng-model="isUploadfileDisable" class="btn btn-danger"
											ng-click="reset()">Reset Dropzone</button>
									</div>
								</div>
							</div>

						</div>
					</div>
				</div>
			</div>

			<!-- Show Messages -->
			<div id="successMssages" class="alert alert-success"
				data-ng-show="successMessages" data-ng-bind="successMessages"></div>

			<div id="errorMessages" class="alert alert-danger"
				data-ng-show="errorMessages" data-ng-bind="errorMessages"></div>
			<br />

			<div class="col-md-12 form-group">
				<hr />
				<button type="button" ng-click="gotoServiceRequestPage()"
					ng-disabled="isSubmitDisable" ng-model="isSubmitDisable"
					class="btn btn-primary pull-right" style="margin-right: 5px;">Back</button>
				<button type="button" ng-click="someFun()"
					class="btn btn-primary pull-right" 
					ng-disabled="isSaveDisabled" style="margin-right: 5px;">Save</button> <!-- ng-model="isSaveDisabled" oneToOneForm.$invalid -->
			</div>


		</div>
	</form>
</div>
<!-- </div> -->


