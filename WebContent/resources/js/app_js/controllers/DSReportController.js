// angular controller area 
'use strict';
App
		.controller(
				'SocWReprtController',
				[
						'$scope',
						'$timeout',
						'SOCReportService',
						'NgTableParams','$window',
						function($scope, $timeout, SOCReportService,NgTableParams,$window) {
							var self = this;
							
							
							$scope.exportData = function() {
								var blob = new Blob(
										[ document.getElementById('exportable').innerHTML ],
										{
											type : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
										});
								saveAs(blob, "SOC.xls");
							};

							

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
							
							
							self.fetchReport = function() {
								
								if($scope.ticketNumber=="")
								{
									$scope.ticketNumber=null;
								}
								if($scope.issueCategorymap==undefined)
								{
									$scope.issueCategorymap={"id": null,"name":null};
								}
								
								if($scope.ticketCreator=="")
								{
									$scope.ticketCreator=null;
								}
								if($scope.companyCode=="")
								{
									$scope.companyCode=null;
								}
								if($scope.collectionMode=="")
								{
									$scope.collectionMode=null;
								}
								if($scope.deliveryNumber=="")
								{
									$scope.deliveryNumber=null;
								}
								
								SOCReportService
                                .fetchReport(
                                            $scope.ticketNumber, $scope.issueCategorymap.id, $scope.ticketCreator,
                                            $scope.companyCode, $scope.collectionMode, $scope.deliveryNumber)
                                .then(
                                            function(d) {
                                          		self.rptData = d;
                                            },
                                            function(errResponse) {
                                                  console
                                                              .error('Error while fetching Department wise SLA');
                                            });

							};							
							
							self.fetchReportByDate = function() {

								$scope.fromDate = angular.element("#t").val();
								$scope.toDate = angular.element("#t1").val();

								SOCReportService
                                .fetchReportByDate(
                                            $scope.fromDate, $scope.toDate)
                                .then(
                                            function(d) {
                                                  self.rptData = d;

                                                  self.temp = d;
                                                  
                                            },
                                            function(errResponse) {
                                                  console
                                                              .error('Error while fetching Department wise SLA');
                                            });

							};
							
							self.loadIssueSolutionCategoryMap = function(){
								SOCReportService.fetchAllIssueSolutionCategoryMapDS()
								.then(
										function(d) {
											$scope.IssuesSolutionCategoryMaps = d;
											$scope.iscm = undefined;
											$scope.iscmKeyValue = []
											$scope.l = {
												id : null,
												name : null
											};
											for (var i = 0; i < $scope.IssuesSolutionCategoryMaps.length; i++) {
												$scope.l.id = $scope.IssuesSolutionCategoryMaps[i].issueSolutionCategoryMapId;
												$scope.l.name = $scope.IssuesSolutionCategoryMaps[i].issuesolutioncategory.name
														+ "-"
														+ $scope.IssuesSolutionCategoryMaps[i].issuesolution.name;
												$scope.iscmKeyValue[i] = $scope.l;
												$scope.l = {
													id : null,
													name : null
												};
											}
											$scope.loading = false;
										},
										function(errResponse) {
											console
													.error('Error while fetching category and problem');
										});
							};		
							
							self.gotoLandingPage = function(){
								$window.location.href = "landingpage";
							};

						} ]);
