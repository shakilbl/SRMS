// angular controller area 
'use strict';
App
		.controller(
				'ReportController',
				[
						'$scope',
						'$timeout',
						'ReportService',
						function($scope, $timeout, ReportService) {
							var self = this;
							self.fetchAllIssueSolution = function() {
								ReportService
										.fetchAllIssueSolution()
										.then(
												function(d) {
													self.IssuesSolutions = d;
													self.row14 = [];
													var a14 = [ 0 ];
													self.column14 = []; // ['Network
													// Problem',
													// 'Repeater',
													// 'Slow
													// Speed'];
													self.finalData14 = [];
													self.date14 = [];
													for (var i = 0; i < self.IssuesSolutions.length; i++) {
														if ($
																.inArray(
																		self.IssuesSolutions[i][2],
																		self.column14) === -1) {
															self.column14
																	.push(self.IssuesSolutions[i][2]);
														}

														if ($
																.inArray(
																		$.datepicker
																				.formatDate(
																						"M-yy",
																						new Date(
																								new Date(
																										self.IssuesSolutions[i][1]))),
																		self.date14) === -1) {
															self.date14
																	.push($.datepicker
																			.formatDate(
																					"M-yy",
																					new Date(
																							new Date(
																									self.IssuesSolutions[i][1]))));
														}
													}

													for (var j = 0; j < self.date14.length; j++) {
														for (var i = 0; i < self.column14.length; i++) {
															var f = 0;
															for (var k = 0; k < self.IssuesSolutions.length; k++)
																if (self.date14[j] == $.datepicker
																		.formatDate(
																				"M-yy",
																				new Date(
																						new Date(
																								self.IssuesSolutions[k][1])))) {
																	if (self.column14[i] == self.IssuesSolutions[k][2]) {

																		self.row14
																				.push([ self.IssuesSolutions[k][0] ]);
																		f = 1;
																	}
																}

															if (f == 0)
																self.row14
																		.push(a14);

														}

														self.finalData14
																.push(self.row14);
														self.row14 = [];
													}

													// console("length :
													// ",self.IssuesSolutions.length);

													// console
													// .log(self.finalData14);
													self.graphDate14 = self.finalData14;
													self.series14 = self.date14;

												},
												function(errResponse) {
													console
															.error('Error while fetching Currencies');
												});
							};

							self.fetchTopTenTrend = function() {
								ReportService
										.fetchTopTenTrend()
										.then(
												function(d) {
													self.TopTenTrend = d;

													// console
													// .log("Top Ten value list:
													// "
													// + d);
													self.row = [];
													var a = [ 0 ];
													self.column = []; // ['Network
													// Problem',
													// 'Repeater',
													// 'Slow
													// Speed'];
													self.finalData = [];
													self.date = [];

													for (var i = 0; i < self.TopTenTrend.length; i++) {
														if ($
																.inArray(
																		self.TopTenTrend[i][2],
																		self.column) === -1) {
															self.column
																	.push(self.TopTenTrend[i][2]);
														}
														self.date
																.push($.datepicker
																		.formatDate(
																				"dd-MM-yy",
																				new Date(
																						new Date(
																								self.TopTenTrend[i][1]))));
													}

													for (var i = 0; i < self.TopTenTrend.length; i++) {
														for (var j = 0; j < self.column.length; j++) {
															if (self.column[j] == self.TopTenTrend[i][2]) {
																self.row
																		.push([ self.TopTenTrend[i][0] ]);
															} else {
																self.row
																		.push(a);
															}
														}
														self.finalData
																.push(self.row);
														self.row = [];
													}

													// console.log(self.finalData);
													self.graphDate = self.finalData;
													self.series = self.date;
													/*
													 * for(var i = 0; i <
													 * self.TopTenTrend.length;
													 * i++) {
													 * row.push([self.TopTenTrend[i][0]]); }
													 */
												},
												function(errResponse) {
													console
															.error('Error while fetching Currencies');
												});
							};

							self.fetchSubIssue = function() {
								ReportService
										.fetchSubIssue()
										.then(
												function(d) {
													self.subIssue = d;
													// console
													// .log("Sub category list:
													// "
													// + d);
													self.row1 = [];
													var a1 = [ 0 ];
													self.column1 = []; // ['Network
													// Problem',
													// 'Repeater',
													// 'Slow
													// Speed'];
													self.finalData1 = [];
													self.option1 = [];
													self.option2 = [];
													self.date1 = [];

													for (var i = 0; i < self.subIssue.length; i++) {
														if ($
																.inArray(
																		self.subIssue[i][0],
																		self.option1) === -1) {
															self.option1
																	.push(self.subIssue[i][0]);
														}
														if ($
																.inArray(
																		self.subIssue[i][3],
																		self.option2) === -1) {
															self.option2
																	.push(self.subIssue[i][3]);
														}
														if ($
																.inArray(
																		self.subIssue[i][2],
																		self.column1) === -1) {

															self.column1
																	.push(self.subIssue[i][2]);
														}
														if ($
																.inArray(
																		self.subIssue[i][3],
																		self.date1) === -1) {
															self.date1
																	.push(self.subIssue[i][3]);
														}
													}

													for (var i = 0; i < self.subIssue.length; i++) {
														for (var j = 0; j < self.column1.length; j++) {
															if (self.column1[j] == self.subIssue[i][2]) {
																self.row1
																		.push([ self.subIssue[i][1] ]);
															} else {
																self.row1
																		.push(a1);
															}
														}
														self.finalData1
																.push(self.row1);
														self.row1 = [];
													}

													// console
													// .log(self.finalData1);
													self.graphDate1 = self.finalData1;
													self.series1 = self.date1;
												},
												function(errResponse) {
													console
															.error('Error while fetching Currencies');
												});
							};

							self.fetchWeeklyStatusReport = function() {
								ReportService
										.fetchWeeklyStatusReport()
										.then(
												function(d) {
													self.WeeklyStatusReport = d;
													// console
													// .log("Sub category list:
													// "
													// + d);
													self.row10 = [];
													var a10 = [ 0 ];
													self.column10 = []; // ['Network
													// Problem',
													// 'Repeater',
													// 'Slow
													// Speed'];
													self.finalData10 = [];
													self.option10 = [];
													// self.option2 = [];
													self.date10 = [];

													for (var i = 0; i < self.WeeklyStatusReport.length; i++) {

														if ($
																.inArray(
																		self.WeeklyStatusReport[i][3],
																		self.option10) === -1) {
															self.option10
																	.push(self.WeeklyStatusReport[i][3]);
														}
														if ($
																.inArray(
																		self.WeeklyStatusReport[i][2],
																		self.column10) === -1) {

															self.column10
																	.push(self.WeeklyStatusReport[i][2]);
														}
														if ($
																.inArray(
																		self.WeeklyStatusReport[i][3],
																		self.date10) === -1) {
															self.date10
																	.push(self.WeeklyStatusReport[i][3]);
														}
													}

													for (var i = 0; i < self.WeeklyStatusReport.length; i++) {
														for (var j = 0; j < self.column10.length; j++) {
															if (self.column10[j] == self.WeeklyStatusReport[i][2]) {
																self.row10
																		.push([ self.WeeklyStatusReport[i][1] ]);
															} else {
																self.row10
																		.push(a10);
															}
														}
														self.finalData10
																.push(self.row10);
														self.row10 = [];
													}

													// console.log(self.option10);
													self.graphDate10 = self.finalData10;
													self.series10 = self.date10;
												},
												function(errResponse) {
													console
															.error('Error while fetching Currencies');
												});
							};

							self.fetchCompliantSolutionStatus = function() {
								ReportService
										.fetchCompliantSolutionStatus()
										.then(
												function(d) {
													self.CompliantSolutionStatus = d;
													// console
													// .log("Sub category list
													// in Dhaka-Gazipur Circle:
													// "
													// + d);
													self.row3 = [];
													var a3 = [ 0 ];
													self.column3 = []; // ['Network
													// Problem',
													// 'Repeater',
													// 'Slow
													// Speed'];
													self.finalData3 = [];
													self.date3 = [];

													for (var i = 0; i < self.CompliantSolutionStatus.length; i++) {
														if ($
																.inArray(
																		self.CompliantSolutionStatus[i][3],
																		self.column3) === -1) {
															self.column3
																	.push(self.CompliantSolutionStatus[i][3]);
														}
														self.date3
																.push(self.CompliantSolutionStatus[i][0]);
													}

													for (var i = 0; i < self.CompliantSolutionStatus.length; i++) {
														for (var j = 0; j < self.column3.length; j++) {
															if (self.column3[j] == self.CompliantSolutionStatus[i][3]) {
																self.row3
																		.push([ self.CompliantSolutionStatus[i][2] ]);
															} else {
																self.row3
																		.push(a3);
															}
														}
														self.finalData3
																.push(self.row3);
														self.row3 = [];
													}

													// console
													// .log(self.finalData3);
													self.graphDate3 = self.finalData3;
													self.series3 = self.date3;

												},

												function(errResponse) {
													console
															.error('Error while fetching Dhk-Gzp data');
												});
							};

							self.fetchOpenOrClose = function() {
								ReportService
										.fetchOpenOrClose()
										.then(
												function(d) {
													self.OpenOrClose = d;
													if(document.getElementById("dates")){
														document
														.getElementById("dates").hidden = true;
													
													}
													if(document.getElementById("dates1")){
													document
															.getElementById("dates1").hidden = true;
													}
													if(document.getElementById("btnYear")){
													document
															.getElementById("btnYear").style.background = '#aaccee';
													}
													if(document.getElementById("fromWeekOC")){
													document
															.getElementById("fromWeekOC").hidden = true;
													}
													if(document.getElementById("toWeekOC")){
													document
															.getElementById("toWeekOC").hidden = true;
													}
													// console
													// .log("Open or Closed
													// List: "
													// + d);
													self.row2 = [];
													var a2 = [ 0 ];
													self.column2 = []; // ['Network
													// Problem',
													// 'Repeater',
													// 'Slow
													// Speed'];
													self.finalData2 = [];
													self.date2 = [];
													self.year = [];
													self.circle = [];
													self.series2 = [];
													for (var i = 0; i < self.OpenOrClose.length; i++) {
														if ($
																.inArray(
																		self.OpenOrClose[i][0],
																		self.circle) === -1) {
															self.circle
																	.push(self.OpenOrClose[i][0]);
														}
														if ($
																.inArray(
																		self.OpenOrClose[i][3],
																		self.year) === -1) {
															self.year
																	.push(self.OpenOrClose[i][3]);
														}
														if ($
																.inArray(
																		self.OpenOrClose[i][2],
																		self.series2) === -1)
															self.series2
																	.push(self.OpenOrClose[i][2]);

													}

													for (var i = 0; i < self.OpenOrClose.length; i++) {
														if ($
																.inArray(
																		self.OpenOrClose[i][0],
																		self.column2) === -1) {
															self.column2
																	.push(self.OpenOrClose[i][0]);
														}

														self.date2
																.push(self.OpenOrClose[i][2]);

													}
													for (var i = 0; i < self.series2.length; i++) {
														for (var k = 0; k < self.column2.length; k++) {
															var f = 0;
															for (var j = 0; j < self.OpenOrClose.length; j++) {
																if (self.OpenOrClose[j][2] == self.series2[i]
																		&& self.OpenOrClose[j][0] == self.column2[k]) {

																	self.row2
																			.push([ self.OpenOrClose[j][1] ]);
																	f = 1;
																	// alert("x");
																}

															}
															if (f == 0)
																self.row2
																		.push(a2);

														}
														self.finalData2
																.push(self.row2);
														self.row2 = [];
													}

													// console
													// .log(self.finalData2);
													self.graphDate2 = self.finalData2;
													// self.series2 =
													// self.date2;

												},
												function(errResponse) {
													console
															.error('Error while fetching Dhk-Gzp data');
												});
							};
							self.fetchOpenOrCloseWeekly = function() {
								ReportService
										.fetchOpenOrCloseWeekly()
										.then(
												function(d) {
													self.OpenOrClose = d;
													self.OpOrCl = d;
												},
												function(errResponse) {
													console
															.error('Error while fetching Dhk-Gzp data');
												});
							};
							self.fetchOpenOrCloseDate = function() {
								ReportService
										.fetchOpenOrCloseDate()
										.then(
												function(d) {
													self.OpenOrClose = d;
													self.OpOrCl = d;
													for (var i = 0; i < self.OpenOrClose.length; i++) {
														self.OpenOrClose[i][3] = $.datepicker
																.formatDate(
																		"d-M-yy",
																		new Date(
																				new Date(
																						self.OpenOrClose[i][3])));
													}

												},
												function(errResponse) {
													console
															.error('Error while fetching Dhk-Gzp data');
												});
							};
							self.fetchYearlyComliantStatus = function() {
								ReportService
										.fetchYearlyComliantStatus()
										.then(
												function(d) {
													self.YearlyCompliantStatus = d;
													// console
													// .log("Sub category list
													// in Dhaka-Gazipur Circle:
													// "
													// + d);
													self.row4 = [];
													var a4 = 0;
													self.column4 = [];
													self.finalData4 = [];
													self.date4 = [];
													self.optionY = [];

													for (var i = 0; i < self.YearlyCompliantStatus.length; i++) {
														if ($
																.inArray(
																		self.YearlyCompliantStatus[i][3],
																		self.optionY) === -1) {
															self.optionY
																	.push(self.YearlyCompliantStatus[i][3]);
														}

														self.column4[i] = self.YearlyCompliantStatus[i][0];
														self.finalData4[i] = self.YearlyCompliantStatus[i][2];
													}

													// console
													// .log(self.finalData4);
													self.graphDate4 = self.finalData4;

												},

												function(errResponse) {
													console
															.error('Error while fetching Dhk-Gzp data');
												});
							};
							self.fetchProductionReport = function() {
								ReportService
										.fetchProductionReport()
										.then(
												function(d) {
													self.optionY = [];
													self.ProductionReports = d;
													self.ProRepS = d;
													self.optionTeam = [];
													/*console
															.log(
																	"Pro rep: ",
																	self.ProductionReports);*/
													if(document.getElementById("from")){
													self.maxdate("from");
													}
													if(document.getElementById("to")){
													self.maxdate("to");
													}
													for (var i = 0; i < self.ProductionReports.length; i++) {
														if ($
																.inArray(
																		self.ProductionReports[i][1],
																		self.optionTeam) === -1) {
															self.optionTeam
																	.push(self.ProductionReports[i][1]);
														}
														if ($
																.inArray(
																		self.ProductionReports[i][3],
																		self.optionY) === -1) {
															self.optionY
																	.push(self.ProductionReports[i][3]);
														}
													}
												},
												function(errResponse) {
													console
															.error('Error while fetching Currencies');
												});
							};
							self.fetchNewSiteBudgetConstraint = function() {
								ReportService
										.fetchNewSiteBudgetConstraint()
										.then(
												function(d) {
													self.NewSiteBudgetConstraint = d;
													self.column16 = [];
													self.series16 = [ 'Count of Complaint' ];
													self.finalData16 = [];
													self.data16 = [];
													// console
													// .log(
													// 'NSBC ',
													// self.NewSiteBudgetConstraint.length);

													for (var i = 0; i < self.NewSiteBudgetConstraint.length; i++) {
														self.column16
																.push(self.NewSiteBudgetConstraint[i][0]);
													}
													for (var j = 0; j < self.series16.length; j++) {
														for (var i = 0; i < self.NewSiteBudgetConstraint.length; i++) {
															self.data16
																	.push(self.NewSiteBudgetConstraint[i][1]);
														}
														self.finalData16
																.push(self.data16);
														self.data16 = [];
													}

													self.graphDate16 = self.finalData16;
													// console.log('Column ',
													// self.column16);
													// console.log('Series ',
													// self.series16);
													// console.log('Graphdata',
													// self.graphDate16);
												},
												function(errResponse) {
													console
															.error('Error while fetching Currencies');
												});
							};
							self.fetchHighCategorywise = function() {
								ReportService
										.fetchHighCategorywise()
										.then(
												function(d) {
													self.HighCategorywise = d;
													self.column9 = [];
													self.finalData9 = [];
													self.row9 = [];
													self.date9 = [];

													self.column9.push('W01');
													self.column9.push('W02');
													self.column9.push('W03');
													self.column9.push('W04');
													self.column9.push('W05');
													self.column9.push('W06');
													self.column9.push('W07');

													for (var i = 0; i < self.HighCategorywise.length; i++) {
														for (var j = 0; j < self.column9.length; j++) {
															self.row9
																	.push([ self.HighCategorywise[i][j + 1] ]);

														}
														self.finalData9
																.push(self.row9);
														self.row9 = [];
													}

													for (var i = 0; i < self.HighCategorywise.length; i++) {
														self.date9
																.push(self.HighCategorywise[i][0]);
													}

													/*
													 * self.finalData5 = [
													 * [1,1,1,1,1,1,1],
													 * [2,1,1,1,1,1,1],
													 * [2,1,2,3,2,3,3] ];
													 */
													// self.type = 'StackedBar';
													// console.log(self.column6);
													// console
													// .log(self.finalData6);
													self.graphDate9 = self.finalData9;
													self.series9 = self.date9;
													/*
													 * for(var i = 0; i <
													 * self.TopTenTrend.length;
													 * i++) {
													 * row.push([self.TopTenTrend[i][0]]); }
													 */

												},
												function(errResponse) {
													console
															.error('Error while fetching Currencies');
												});
							};
							self.fetchResolution = function() {
								ReportService
										.fetchResolution()
										.then(
												function(d) {

													self.Resolutions = d;
													self.Resolution = [ [], [],
															[] ];
													self.Resolution[0][0] = self.Resolutions[0][0];
													self.Resolution[0][1] = self.Resolutions[0][1];
													self.Resolution[0][2] = self.Resolutions[0][2];
													self.Resolution[1][0] = self.Resolutions[0][3];
													self.Resolution[1][1] = self.Resolutions[0][4];
													self.Resolution[1][2] = self.Resolutions[0][5];
													self.Resolution[2][0] = self.Resolutions[0][6];
													self.Resolution[2][1] = self.Resolutions[0][7];
													self.Resolution[2][2] = self.Resolutions[0][8];

												},
												function(errResponse) {
													console
															.error('Error while fetching Currencies');
												});
							};

							self.fetchWeeklyReportComplaintHit = function() {
								ReportService
										.fetchWeeklyReportComplaintHit()
										.then(
												function(d) {

													self.WeeklyReportComplaintHit = d;
													self.column17 = [];
													self.series17 = [
															'Total Complaint at Frontend',
															'Complaint Escalate to 2nd Tier',
															'Complaint Escalate to VOCM',
															'Complaint Escalate to 3rd Tier',
															'Complaint Escalate to Technology' ];
													self.data17 = [];
													self.finalData17 = [];
													self.row17 = [];
													for (var i = 0; i < self.WeeklyReportComplaintHit.length; i++)
														self.column17
																.push(self.WeeklyReportComplaintHit[i][5]);

													for (var i = 0; i < self.series17.length; i++) {
														for (var j = 0; j < self.WeeklyReportComplaintHit.length; j++) {
															self.row17
																	.push(self.WeeklyReportComplaintHit[j][i]);
														}
														self.finalData17
																.push(self.row17);
														self.row17 = [];
													}
													// console.log("data",
													// self.finalData17);
													// console.log("column",
													// self.column17);

													// console.log("series",
													// self.series17);
													self.data17 = self.series17;

													self.graphDate17 = self.finalData17;

												},
												function(errResponse) {
													console
															.error('Error while fetching Currencies');
												});
							};

							self.fetchComplaintwiseE2ESla = function() {
								ReportService
										.fetchComplaintwiseE2ESla()
										.then(
												function(d) {
													self.ComplaintwiseE2ESla = d;
													// self.WeeklyReportComplaintHit
													// = d;
													self.column18 = [];
													self.series18 = [
															'Network Complaint SLA Achievement',
															'Mass Technology Complaint SLA Achievement',
															'Others Complaint SLA Status',
															'Total' ];
													self.data18 = [];
													self.finalData18 = [];
													self.row18 = [];
													for (var i = 0; i < self.ComplaintwiseE2ESla.length; i++)
														self.column18
																.push(self.ComplaintwiseE2ESla[i][4]);

													for (var i = 0; i < self.series18.length; i++) {
														for (var j = 0; j < self.ComplaintwiseE2ESla.length; j++) {
															self.row18
																	.push(self.ComplaintwiseE2ESla[j][i]);
														}
														self.finalData18
																.push(self.row18);
														self.row18 = [];
													}
													// console.log("data",
													// self.finalData18);
													// console.log("column",
													// self.column18);

													// console.log("series",
													// self.series18);

													self.graphDate18 = self.finalData18;
												},
												function(errResponse) {
													console
															.error('Error while fetching Currencies');
												});
							};

							self.fetchWeeklyComplaintStatus = function() {
								ReportService
										.fetchWeeklyComplaintStatus()
										.then(
												function(d) {
													self.WeeklyComplaintStatus = d;
													self.row5 = [];
													var a5 = [ 0 ];
													self.column5 = []; // ['Network
													// Problem',
													// 'Repeater',
													// 'Slow
													// Speed'];
													self.finalData5 = [];
													self.date5 = [];

													self.column5.push('W01');
													self.column5.push('W02');
													self.column5.push('W03');
													self.column5.push('W04');
													self.column5.push('W05');
													self.column5.push('W06');
													self.column5.push('W07');

													for (var i = 0; i < self.WeeklyComplaintStatus.length; i++) {
														for (var j = 0; j < self.column5.length; j++) {
															self.row5
																	.push([ self.WeeklyComplaintStatus[i][j + 1] ]);

														}
														self.finalData5
																.push(self.row5);
														self.row5 = [];
													}

													/*
													 * self.finalData5 = [
													 * [1,1,1,1,1,1,1],
													 * [2,1,1,1,1,1,1],
													 * [2,1,2,3,2,3,3] ];
													 */
													self.type = 'StackedBar';
													// console.log(self.column5);
													// console
													// .log(self.finalData5);
													self.graphDate5 = self.finalData5;
													// self.series5 =
													// self.date5;
													/*
													 * for(var i = 0; i <
													 * self.TopTenTrend.length;
													 * i++) {
													 * row.push([self.TopTenTrend[i][0]]); }
													 */

												},
												function(errResponse) {
													console
															.error('Error while fetching Currencies');
												});
							};

							self.fetchSubCatNetCom = function() {
								ReportService
										.fetchSubCatNetCom()
										.then(
												function(d) {
													self.SubCatNetCom = d;
													self.row6 = [];
													var a6 = [ 0 ];
													self.column6 = []; // ['Network
													// Problem',
													// 'Repeater',
													// 'Slow
													// Speed'];
													self.finalData6 = [];
													self.date6 = [];

													self.column6.push('W01');
													self.column6.push('W02');
													self.column6.push('W03');
													self.column6.push('W04');
													self.column6.push('W05');
													self.column6.push('W06');
													self.column6.push('W07');

													for (var i = 0; i < self.SubCatNetCom.length; i++) {
														for (var j = 0; j < self.column6.length; j++) {
															self.row6
																	.push([ self.SubCatNetCom[i][j + 1] ]);

														}
														self.finalData6
																.push(self.row6);
														self.row6 = [];
													}

													for (var i = 0; i < self.SubCatNetCom.length; i++) {
														self.date6
																.push(self.SubCatNetCom[i][0]);
													}

													/*
													 * self.finalData5 = [
													 * [1,1,1,1,1,1,1],
													 * [2,1,1,1,1,1,1],
													 * [2,1,2,3,2,3,3] ];
													 */
													// self.type = 'StackedBar';
													// console.log(self.column6);
													// console
													// .log(self.finalData6);
													self.graphDate6 = self.finalData6;
													self.series6 = self.date6;
													/*
													 * for(var i = 0; i <
													 * self.TopTenTrend.length;
													 * i++) {
													 * row.push([self.TopTenTrend[i][0]]); }
													 */

												},
												function(errResponse) {
													console
															.error('Error while fetching Currencies');
												});
							};
							self.fetchMajorSevenThana = function() {
								ReportService
										.fetchMajorSevenThana()
										.then(
												function(d) {
													self.MajorSevenThana = d;

													self.column7 = [];
													self.date7 = [];
													self.row7 = [];
													self.finalData7 = [];
													self.option7Thana = [];
													var a7 = [ 0 ];
													for (var i = 0; i < self.MajorSevenThana.length; i++) {
														if ($
																.inArray(
																		self.MajorSevenThana[i][3],
																		self.option7Thana) === -1)
															self.option7Thana
																	.push(self.MajorSevenThana[i][3]);
														if ($
																.inArray(
																		self.MajorSevenThana[i][0],
																		self.column7) === -1) {
															self.column7
																	.push(self.MajorSevenThana[i][0]);
														}
														if ($
																.inArray(
																		$.datepicker
																				.formatDate(
																						"M-yy",
																						new Date(
																								new Date(
																										self.MajorSevenThana[i][1]))),
																		self.date7) === -1) {
															self.date7
																	.push($.datepicker
																			.formatDate(
																					"M-yy",
																					new Date(
																							new Date(
																									self.MajorSevenThana[i][1]))));
														}
													}
													self.option7Thana
															.push("All");

													for (var i = 0; i < self.date7.length; i++) {

														for (var j = 0; j < self.column7.length; j++) {
															var f = 0;
															for (var k = 0; k < self.MajorSevenThana.length; k++) {

																if (self.column7[j] == self.MajorSevenThana[k][0]
																		&& self.date7[i] == $.datepicker
																				.formatDate(
																						"M-yy",
																						new Date(
																								new Date(
																										self.MajorSevenThana[k][1])))) {
																	self.row7
																			.push([ self.MajorSevenThana[k][2] ]);
																	f = 1;
																}
															}
															if (f == 0) {
																self.row7
																		.push(a7);
															}
														}
														self.finalData7
																.push(self.row7);
														self.row7 = [];
													}
													self.graphDate7 = self.finalData7;
													self.series7 = self.date7;

												},
												function(errResponse) {
													console
															.error('Error while fetching Currencies');
												});
							};

							self.fetchMajorSevenThana1 = function(x) {
								ReportService
										.fetchMajor(x)
										.then(
												function(d) {
													self.MajorSevenThana = d;

													self.column7 = [];
													self.date7 = [];
													self.row7 = [];
													self.finalData7 = [];
													// self.option7Thana = [];
													var a7 = [ 0 ];
													for (var i = 0; i < self.MajorSevenThana.length; i++) {

														if ($
																.inArray(
																		self.MajorSevenThana[i][0],
																		self.column7) === -1) {
															self.column7
																	.push(self.MajorSevenThana[i][0]);
														}
														if ($
																.inArray(
																		$.datepicker
																				.formatDate(
																						"M-yy",
																						new Date(
																								new Date(
																										self.MajorSevenThana[i][1]))),
																		self.date7) === -1) {
															self.date7
																	.push($.datepicker
																			.formatDate(
																					"M-yy",
																					new Date(
																							new Date(
																									self.MajorSevenThana[i][1]))));
														}
													}

													for (var i = 0; i < self.date7.length; i++) {

														for (var j = 0; j < self.column7.length; j++) {
															var f = 0;
															for (var k = 0; k < self.MajorSevenThana.length; k++) {

																if (self.column7[j] == self.MajorSevenThana[k][0]
																		&& self.date7[i] == $.datepicker
																				.formatDate(
																						"M-yy",
																						new Date(
																								new Date(
																										self.MajorSevenThana[k][1])))) {
																	self.row7
																			.push([ self.MajorSevenThana[k][2] ]);
																	f = 1;
																}
															}
															if (f == 0) {
																self.row7
																		.push(a7);
															}
														}
														self.finalData7
																.push(self.row7);
														self.row7 = [];
													}
													self.graphDate7 = self.finalData7;
													self.series7 = self.date7;

												},
												function(errResponse) {
													console
															.error('Error while fetching Currencies');
												});
							};

							self.fetchSectionwiseOpen = function() {
								ReportService
										.fetchSectionwiseOpen()
										.then(
												function(d) {
													self.SectionwiseOpen = d;
													self.row8 = [];
													var a8 = [ 0 ];
													self.column8 = []; // ['Network
													// Problem',
													// 'Repeater',
													// 'Slow
													// Speed'];
													self.finalData8 = [];
													self.date8 = [ 'Open at Technology' ];
													for (var i = 0; i < self.SectionwiseOpen.length; i++) {
														if ($
																.inArray(
																		self.SectionwiseOpen[i][0],
																		self.column8) === -1) {
															self.column8
																	.push(self.SectionwiseOpen[i][0]);
														}
													}

													for (var i = 0; i < self.date8.length; i++) {
														for (var j = 0; j < self.column8.length; j++) {

															self.row8
																	.push([ self.SectionwiseOpen[j][2] ]);
															// self.row
															// .push([
															// self.PendingSRStatus[j][2]
															// ]);

														}
														self.finalData8
																.push(self.row8);
														self.row8 = [];
													}

													self.graphDate8 = self.finalData8;
													self.series8 = self.date8;

												},
												function(errResponse) {
													console
															.error('Error while fetching Currencies');
												});
							};

							self.IssuesSolutions = [

							];
							self.HighCategorywise = [];

							self.TopTenTrend = [

							];

							self.subIssue = [

							];
							self.CompliantSolutionStatus = [

							];
							self.OpenOrClose = [

							];
							self.YearlyCompliantStatus = [

							];
							self.NewSiteBudgetConstraint = [];
							self.ProductionReports = [

							];
							self.Resolutions = [

							];
							self.WeeklyReportComplaintHit = [];
							self.WeeklyComplaintStatus = [

							];
							self.ComplaintwiseE2ESla = [];
							self.SubCatNetCom = [

							];
							self.WeeklyStatusReport = [];

							self.MajorSevenThana = [];
							self.SectionwiseOpen = [];
							self.weekFrom = [];
							for (var i = 1; i < 54; i++)
								self.weekFrom.push(i);

							//self.fetchAllIssueSolution();
							//self.fetchWeeklyStatusReport();

							//self.fetchTopTenTrend();

							//self.fetchSubIssue();

							//self.fetchYearlyComliantStatus();
							//self.fetchCompliantSolutionStatus();
							//self.fetchOpenOrClose();
							//self.fetchNewSiteBudgetConstraint();
							self.fetchProductionReport();
							//console.log("pr: ", self.ProductionReports);
							//self.fetchResolution();
							//self.fetchWeeklyComplaintStatus();
							//self.fetchSubCatNetCom();
							//self.fetchMajorSevenThana();
							//self.fetchSectionwiseOpen();
							//self.fetchHighCategorywise();
							self.fetchWeeklyReportComplaintHit();
							//self.fetchComplaintwiseE2ESla();

							/*
							 * for (var j = 0; j < self.date14.length; j++) {
							 * for (var i = 0; i < self.column14.length; i++) {
							 * var f = 0; for (var k = 0; k <
							 * self.IssuesSolutions.length; k++) if
							 * (self.date14[j] == $.datepicker .formatDate(
							 * "M-yy", new Date( new Date(
							 * self.IssuesSolutions[k][1])))) { if
							 * (self.column14[i] == self.IssuesSolutions[k][2]) {
							 * 
							 * self.row14 .push([ self.IssuesSolutions[k][0] ]);
							 * f = 1; } }
							 * 
							 * if (f == 0) self.row14 .push(a14); }
							 * 
							 * self.finalData14 .push(self.row14); self.row14 =
							 * []; }
							 */
							$scope.filterData = function(x) {
								// var x = $scope.selectedItem.name;
								// alert("dfsfsf");
								var a11 = [ 0 ];
								self.column11 = [];
								self.date11 = [];
								self.row11 = [];
								self.finalData11 = [];
								for (var i = 0; i < self.subIssue.length; i++) {
									if ($.inArray(self.subIssue[i][3],
											self.date11) === -1) {
										self.date11.push(self.subIssue[i][3]);
									}
								}
								for (var i = 0; i < self.subIssue.length; i++) {
									if (self.subIssue[i][0] == x) {
										if ($.inArray(self.subIssue[i][2],
												self.column11) === -1) {

											self.column11
													.push(self.subIssue[i][2]);
										}

									}
								}

								for (var i = 0; i < self.date11.length; i++) {
									for (var j = 0; j < self.column11.length; j++) {
										var x1 = 0;
										for (var k = 0; k < self.subIssue.length; k++) {
											if (self.subIssue[k][0] == x) {
												if (self.column11[j] == self.subIssue[k][2]
														&& self.date11[i] == self.subIssue[k][3]) {
													self.row11
															.push(self.subIssue[k][1]);
													x1 = 1;
												}
											}
										}
										if (x1 == 0) {
											self.row11.push(a11);
										}
									}
									self.finalData11.push(self.row11);
									self.row11 = [];
								}
								for (var i = 0; i < self.column11.length; i++)
									self.column11[i] = "Week-"
											+ self.column11[i];

								// console.log(self.finalData11);
								self.graphDate11 = self.finalData11;
								self.series11 = self.date11;
								// alert(self.date11.length);
								// alert(self.subIssue.length);
								// alert("ddd");
								// self.fetchSubIssue();
							}

							$scope.filterDataX = function(x) {
								// var x = $scope.selectedItem.name;
								// alert("dfsfsf");
								var a15 = [ 0 ];
								self.column15 = [];
								self.date15 = [];
								self.row15 = [];
								self.finalData15 = [];
								for (var i = 0; i < self.WeeklyStatusReport.length; i++) {
									if ($.inArray(
											self.WeeklyStatusReport[i][0],
											self.date15) === -1) {
										self.date15
												.push(self.WeeklyStatusReport[i][0]);
									}
								}
								for (var i = 0; i < self.WeeklyStatusReport.length; i++) {
									if (self.WeeklyStatusReport[i][3] == x) {
										if ($.inArray(
												self.WeeklyStatusReport[i][2],
												self.column15) === -1) {

											self.column15
													.push(self.WeeklyStatusReport[i][2]);
										}

									}
								}

								for (var i = 0; i < self.date15.length; i++) {
									for (var j = 0; j < self.column15.length; j++) {
										var x1 = 0;
										for (var k = 0; k < self.WeeklyStatusReport.length; k++) {
											if (self.WeeklyStatusReport[k][3] == x) {
												if (self.column15[j] == self.WeeklyStatusReport[k][2]
														&& self.date15[i] == self.WeeklyStatusReport[k][0]) {
													self.row15
															.push(self.WeeklyStatusReport[k][1]);
													x1 = 1;
												}
											}
										}
										if (x1 == 0) {
											self.row15.push(a15);
										}
									}
									self.finalData15.push(self.row15);
									self.row15 = [];
								}

								for (var i = 0; i < self.column15.length; i++)
									self.column15[i] = "Week-"
											+ self.column15[i];

								// console.log(self.finalData15);
								self.graphDate15 = self.finalData15;
								self.series15 = self.date15;

							}

							$scope.filterDataY = function(x) {
								// var x = $scope.selectedItem.name;
								// alert(x);
								self.column12 = [];
								self.finalData12 = [];
								var cc = 0;
								var tot = 0;

								for (var i = 0; i < self.YearlyCompliantStatus.length; i++) {

									if (self.YearlyCompliantStatus[i][3] == x) {
										tot += self.YearlyCompliantStatus[i][1];

									}
								}
								for (var i = 0; i < self.YearlyCompliantStatus.length; i++) {

									if (self.YearlyCompliantStatus[i][3] == x) {
										self.YearlyCompliantStatus[i][2] = parseFloat(
												Math
														.round(self.YearlyCompliantStatus[i][1]
																/ tot
																* 100
																* 100) / 100)
												.toFixed(2);

										self.column12[cc] = self.YearlyCompliantStatus[i][0];
										self.finalData12[cc] = self.YearlyCompliantStatus[i][2];
										cc++;
									}
								}
								self.graphDate12 = self.finalData12;
							}

							$scope.filterDataW = function(x) {
								// var x = $scope.selectedItem.name;
								// alert("dfsfsf");
								var a13 = [ 0 ];
								self.column13 = [];
								self.date13 = [];
								self.row13 = [];
								self.finalData13 = [];
								for (var i = 0; i < self.subIssue.length; i++) {
									if ($.inArray(self.subIssue[i][0],
											self.date13) === -1) {
										self.date13.push(self.subIssue[i][0]);
									}
								}
								for (var i = 0; i < self.subIssue.length; i++) {
									if (self.subIssue[i][3] == x) {
										if ($.inArray(self.subIssue[i][2],
												self.column13) === -1) {

											self.column13
													.push(self.subIssue[i][2]);
										}

									}
								}

								for (var i = 0; i < self.subIssue.length; i++) {
									for (var j = 0; j < self.column13.length; j++) {
										if (self.subIssue[i][3] == x) {
											if (self.column13[j] == self.subIssue[i][2]) {
												self.row13
														.push([ self.subIssue[i][1] ]);
											} else {
												self.row13.push(a13);
											}
										}
									}
									self.finalData13.push(self.row13);
									self.row13 = [];
								}

								// console.log(self.finalData13);
								self.graphDate13 = self.finalData13;
								self.series13 = self.date13;

							}

							$scope.filter7Thana = function(x) {
								self.column71 = [];
								self.date71 = [];
								self.row71 = [];
								self.finalData71 = [];
								var a71 = [ 0 ];
								for (var i = 0; i < self.MajorSevenThana.length; i++) {
									if ($.inArray(self.MajorSevenThana[i][0],
											self.column71) === -1) {
										if (self.MajorSevenThana[i][3] == x)
											self.column71
													.push(self.MajorSevenThana[i][0]);
									}
									if ($
											.inArray(
													$.datepicker
															.formatDate(
																	"M-yy",
																	new Date(
																			new Date(
																					self.MajorSevenThana[i][1]))),
													self.date71) === -1) {
										self.date71
												.push($.datepicker
														.formatDate(
																"M-yy",
																new Date(
																		new Date(
																				self.MajorSevenThana[i][1]))));
									}
								}

								for (var i = 0; i < self.date71.length; i++) {

									for (var j = 0; j < self.column71.length; j++) {
										var f = 0;
										for (var k = 0; k < self.MajorSevenThana.length; k++) {

											if (self.column71[j] == self.MajorSevenThana[k][0]
													&& self.date71[i] == $.datepicker
															.formatDate(
																	"M-yy",
																	new Date(
																			new Date(
																					self.MajorSevenThana[k][1])))) {
												self.row71
														.push([ self.MajorSevenThana[k][2] ]);
												f = 1;
											}
										}
										if (f == 0) {
											self.row71.push(a71);
										}
									}
									self.finalData71.push(self.row71);
									self.row71 = [];
								}
								self.graphDate71 = self.finalData71;
								self.series71 = self.date71;
								// alert("X = "+x);
							}

							$scope.xxx = function(x) {
								self.optionY1 = [];
								for (var i = 0; i < self.optionY.length; i++)
									if (self.optionY[i] != x) {
										self.optionY1.push(self.optionY[i]);
									}
							}

							$scope.exportData = function() {
								var blob = new Blob(
										[ document.getElementById('exportable').innerHTML ],
										{
											type : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
										});
								saveAs(blob, "CircleReport.xls");
							};
							$scope.filterWeek = function(x) {
								self.weekTo = [];
								for (var i = x; i <= 53; i++)
									self.weekTo.push(i);
							}
							self.filterDataOC = function(x, y) {
								// self.fetchOpenOrCloseWeekly();
								self.OpenOrClosed = [];
								for (var i = 0; i < self.OpOrCl.length; i++) {
									if (self.OpOrCl[i][3] >= x
											&& self.OpOrCl[i][3] <= y)
										self.OpenOrClosed.push(self.OpOrCl[i]);
								}
								// console.log("Neww: ",self.OpenOrClosed);
								self.OpenOrClose = [];

								self.OpenOrClose = self.OpenOrClosed;
							}
							$scope.filterDataFromWeek = function(x, y) {
								// console.log("X = ", x);
								// console.log("Y = ", y);
								self.column171 = [];
								self.series171 = [
										'Total Complaint at Frontend',
										'Complaint Escalate to 2nd Tier',
										'Complaint Escalate to VOCM',
										'Complaint Escalate to 3rd Tier',
										'Complaint Escalate to Technology' ];
								self.data171 = [];
								self.finalData171 = [];
								self.xx = [];
								self.row171 = [];
								self.temp = [];
								var count = 0;
								for (var i = x; i <= y; i++) {
									self.column171.push(i);
									// count++;
								}
								for (var i = 0; i < self.column171.length; i++) {
									var f = 0;
									for (var j = 0; j < self.WeeklyReportComplaintHit.length; j++) {
										if (self.WeeklyReportComplaintHit[j][5] == self.column171[i]) {
											self.temp
													.push(self.WeeklyReportComplaintHit[j]);
											f = 1;
										}
									}
									self.xx = [];
									self.xx.push(0);
									self.xx.push(0);
									self.xx.push(0);
									self.xx.push(0);
									self.xx.push(0);
									self.xx.push(self.column171[i]);
									if (f == 0) {
										self.temp.push(self.xx);
									}
								}
								// console.log("col: ",self.column171);

								for (var i = 0; i < self.series171.length; i++) {
									for (var j = 0; j < self.temp.length; j++) {
										self.row171.push(self.temp[j][i]);
									}
									self.finalData171.push(self.row171);
									self.row171 = [];
								}
								// self.

								// console.log("column : ", self.column171);
								// console.log("data : ", self.finalData171);
								// console.log("dataOR : ", self.finalData17);

								self.graphDate171 = self.finalData171;

							}

							self.maxdate = function(x) {
								var input = document.getElementById(x);
								var today = new Date();
								var day = today.getDate() - 1;
								// Set month to string to add leading 0
								var mon = new String(today.getMonth() + 1); // January
								// is
								// 0!
								var yr = today.getFullYear();

								if (mon.length < 2) {
									mon = "0" + mon;
								}

								var date = new String(yr + '-' + mon + '-'
										+ day);

								input.disabled = false;
								input.setAttribute('max', date);

							}
							self.prodFilter = function(x, y) {
								self.ProductionReports = self.ProRepS;
								x = $.datepicker.formatDate("dd-MM-yy",
										new Date(new Date(x)));
								y = $.datepicker.formatDate("dd-MM-yy",
										new Date(new Date(y)));
								self.proRep = [];

								for (var i = 0; i < self.ProductionReports.length; i++) {
									var p = $.datepicker
											.formatDate(
													"dd-MM-yy",
													new Date(
															new Date(
																	self.ProductionReports[i][5])));
									// var p = $filter('date')((),
									// "dd/MM/yyyy");
									if (p >= x && p <= y)
										self.proRep
												.push(self.ProductionReports[i]);
								}
								self.ProductionReports = self.proRep;
							}

							self.yearly = function() {
								self.fetchOpenOrClose();
								document.getElementById("thname").innerHTML = "Year";
								document.getElementById("chart").hidden = false;
								document.getElementById("cb").hidden = false;
								document.getElementById("dates").hidden = true;
								document.getElementById("dates1").hidden = true;
								document.getElementById("yearOC").hidden = false;
								document.getElementById("btnYear").style.background = '#aaccee';
								document.getElementById("btnWeek").style.background = '#ffffff';
								document.getElementById("btnDate").style.background = '#ffffff';
								document.getElementById("fromWeekOC").hidden = true;
								document.getElementById("toWeekOC").hidden = true;

							}
							self.weekly = function() {
								self.fetchOpenOrCloseWeekly();
								document.getElementById("thname").innerHTML = "Week";
								document.getElementById("chart").hidden = true;
								document.getElementById("cb").hidden = true;
								document.getElementById("dates").hidden = true;
								document.getElementById("dates1").hidden = true;
								document.getElementById("yearOC").hidden = true;
								document.getElementById("btnYear").style.background = '#ffffff';
								document.getElementById("btnWeek").style.background = '#aaccee';
								document.getElementById("btnDate").style.background = '#ffffff';
								document.getElementById("fromWeekOC").hidden = false;
								document.getElementById("toWeekOC").hidden = false;

							}
							self.datespecific = function() {
								self.fetchOpenOrCloseDate();
								document.getElementById("chart").hidden = true;
								document.getElementById("cb").hidden = true;
								document.getElementById("thname").innerHTML = "Date";
								document.getElementById("dates").hidden = false;
								document.getElementById("dates1").hidden = false;
								document.getElementById("yearOC").hidden = true;
								document.getElementById("btnYear").style.background = '#ffffff';
								document.getElementById("btnWeek").style.background = '#ffffff';
								document.getElementById("btnDate").style.background = '#aaccee';
								document.getElementById("fromWeekOC").hidden = true;
								document.getElementById("toWeekOC").hidden = true;
								for (var i = 0; i < self.OpenOrClose.length; i++) {
								}

							}

							self.maxDateOC = function(d) {
								var input = document.getElementById(d);
								var today = new Date();
								var day = today.getDate();
								// Set month to string to add leading 0
								var mon = new String(today.getMonth() + 1); // January
								// is
								// 0!
								var yr = today.getFullYear();

								if (mon.length < 2) {
									mon = "0" + mon;
								}

								var date = new String(yr + '-' + mon + '-'
										+ day);

								input.disabled = false;
								input.setAttribute('max', date);
							}
							if (document.getElementById("fromDateOC")) {
								self.maxDateOC("fromDateOC");
							}
							if (document.getElementById("toDateOC")) {
								self.maxDateOC("toDateOC");
							}
							self.fromDateOC = function(x) {
								var input = document.getElementById("toDateOC");
								var today = new Date(x);
								var day = today.getDate();
								// Set month to string to add leading 0
								var mon = new String(today.getMonth() + 1); // January
								// is
								// 0!
								var yr = today.getFullYear();

								if (mon.length < 2) {
									mon = "0" + mon;
								}

								var date = new String(yr + '-' + mon + '-'
										+ day);

								input.disabled = false;
								input.setAttribute('min', date);
								self.fetchOpenOrCloseDate();
							}
							self.select = function(item) {
								$scope.selected = item;
							};

							self.isActive = function(item) {
								return $scope.selected === item;
							};
							self.toDateOC = function(x, y) {
								// self.OpOrCl = [];
								self.OpenOrClosed = [];
								x = parseInt($.datepicker.formatDate("yymmdd",
										new Date(new Date(x))), 10);
								y = parseInt($.datepicker.formatDate("yymmdd",
										new Date(new Date(y))), 10);
								// console.log("x:", x);
								// console.log("opOrCl: ", self.OpOrCl);

								for (var i = 0; i < self.OpOrCl.length; i++) {

									var p = parseInt($.datepicker.formatDate(
											"yymmd", new Date(new Date(
													self.OpOrCl[i][3]))), 10);
									if (p >= x && p <= y)
										self.OpenOrClosed
												.push(self.OpenOrClose[i]);
								}
								// console.log("p:", p);
								self.OpenOrClose = [];
								self.OpenOrClose = self.OpenOrClosed;
								// console.log("new: ", self.OpenOrClose);
							}

							$scope.exportPdf = function() {
								html2canvas(document.getElementById('expor'), {
									background : '#fff',
									onrendered : function(canvas) {
										var data = canvas
												.toDataURL('image/jpeg');
										var doc = new jsPDF('landscape');
										doc.fillStyle = "#FFFFFF";
										doc.addImage(data, 'JPEG', 10, 20, 280,
												150);
										doc.output('save', 'CircleReport.pdf');
									}
								});
							}

							$scope.exportImg = function() {

								d3.selectAll("svg text").style({
									'font-size' : '12px'
								});
								d3.selectAll(".c3-axis path").style({
									'fill' : 'none',
									'stroke' : '#000'
								});
								d3.selectAll(".c3-chart-arc path").style({
									'stroke' : '#FFFFFF'
								});
								d3.selectAll(".c3-chart-arc text").style({
									'fill' : '#FFFFFF'
								});

								html2canvas(document.getElementById('expor'), {
									onrendered : function(canvas) {
										var a = document.createElement("a");
										a.download = "CircleReport.png";
										a.href = canvas.toDataURL("image/png");
										a.click();
									}
								});
							}

						} ]);
