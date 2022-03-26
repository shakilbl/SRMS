App
        .service(
                'TicketCreationService',
                [
                    '$http',
                    'url',
                    function ($http, url) {

                        this.theFinalData;

                        this.theNewFinalDataSet;

                        this.twoObj = {
                            theJson: null
                        };

                        this.setTheNewDataSet = function () {
                            this.twoObj.theJson = hello
                        }

                        this.setDataSet = function (oneData) {
                            this.theFinalData = oneData;
                        }

                        this.setArray = function (theVarArray) {
                            this.theArrayObj = theVarArray;
                        }

                        this.oneObj = {};

                        // For messages in page
                        this.successMessages = null;
                        this.errorMessages = null;


                        var a = {};

                        this.setValueObj = function (value) {
                            this.oneObj.issueSolutionCategoryMapId = value.issCatMapId;
                            // this.oneObj.issueId = value.issId;
                            this.oneObj.customerNumber = value.cusNo;
                        }

                        this.createOto = function (a) {
                            return $http
                                    .post(
                                            'http://localhost:8099/CTMS/onetoone/',
                                            a)
                                    .then(
                                            function (response) {
                                                return response.data;
                                            },
                                            function (errResponse) {
                                                console
                                                        .error('Error while creating service request');
                                                return $q
                                                        .reject(errResponse);
                                            });
                        };

                        this.loadSearchGrid = function (searchCriteria,
                                searchText) {
                            return $http.get(
                                    url + 'onetoone_search/' + searchCriteria + "/" + searchText).then(function (response) {
                                hello = response.data;

                                return response.data;
                            });
                        };

                        this.getData = function () {
                            return $http.get(url + 'onetoone/').then(
                                    function (response) {
                                        return response.data
                                    });
                        };

                        this.getCatSub = function () {
                            return $http.get(url + 'onetoone/').then(
                                    function (response) {
                                        return response.data
                                    });
                        };

                        var hello;

                        this.getDataByCustomerNumberIssueCategory1 = function (
                                cusNum, issueCat, issueSol) {
                            return $http.get(
                                    url + 'onetoone/' + cusNum + "/"
                                    + issueCat + "/" + issueSol)
                                    .then(function (response) {
                                        hello = response.data;
                                        return response.data;
                                    });
                        };

                        this.getDataByCustomerNumberIssueCategory = function (
                                cusNum, issueSolMapId) {
                            return $http.get(
                                    url + 'onetoone/' + cusNum + "/"
                                    + issueSolMapId).then(
                                    function (response) {
                                        hello = response.data;
                                        return response.data;
                                    });
                        };

                        this.postData = function(theTicket) {
                        	console.log("Inside postdata");
                        	console.log(theTicket);
                            return $http.post(url + 'onetoonedatasave/', theTicket).then(
                                          function(response) {
                                                 return response.data;
                                          }, function(errResponse) {
                                                 console.log('Error while creating service request');
                                                 return $q.reject(errResponse);
                                          });
                        },

                        this.updateData = function (id) {

                        };

                        this.removeData = function (id) {

                        }
                        
                        // For Repeated Request
                        this.submitRepeatedDate = 
                        	function (ticketNumber, customerVoice, comments) {
                        	/*alert("Inside repeated functions: "+ticketNumber + 
									" repeatedCustomerVoice: " + customerVoice + 
									" repeatedComments:" +comments);*/
                        	return $http
							.get(
									url + 'submitRepeatedDate/' + ticketNumber
											+ '/' + customerVoice+ '/' +comments).then(
                                    function (response) {
                                        return response.data
                                    });
                        };

						// Fetch all repeated data
                        this.fetchAllIRepeatedComplian = function(ticketNumber) { 
                            return $http.get(url+'GetRepeatedComplian/'+ticketNumber)
                                    .then(
                                            function(response){
                                                return response.data;                                       
                                            }, 
                                            function(errResponse){
                                                console.error('Error while fetching issuesolution list');
                                                return $q.reject(errResponse);
                                            }
                                    );
                    };                        

                    }]);
