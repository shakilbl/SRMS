App
        .service(
                'SearchService',
                [
                    '$http',
                    'url',
                    function ($http, url) {

                        this.theFinalData;

                        this.theNewFinalDataSet;

                        this.twoObj = {
                            theJson: null
                        };

//                        this.setTheNewDataSet = function () {
//                            this.twoObj.theJson = hello
//                        }

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

        
                        this.getCatSub = function () {
                            return $http.get(url + 'getProlemCatSubcategory/').then(
                                    function (response) {
                                        return response.data
                                    });
                        };                        
                        
                        this.getUserGroup = function () {
                            return $http.get(url + 'getUserGroup/').then(
                                    function (response) {
                                        return response.data
                                    });
                        };
                        //var a = {};

                        this.setValueObj = function (value) {
                            this.oneObj.issueSolutionCategoryMapId = value.issCatMapId;
                            // this.oneObj.issueId = value.issId;
                            this.oneObj.customerNumber = value.cusNo;
                        }

                   
                        this.loadSearchGrid = function (
                                searchText,severity,status,problemComponent,iscm,usergroup,faultEscalationDate,targetDate) {
//                        	alert("Inside repeated functions: "+searchText + 
//							" severity: " + severity + 
//							" status:" +status+
//							" problemComponent:" +problemComponent+
//							" iscm:" +iscm +
//							" userGroup: "+usergroup
//							
//							);
							
                            return $http.get(	
                                    url + 'search/' +  searchText+ " /" + severity+ " /" + status+ " /" + problemComponent+ " /" + iscm + " /" + usergroup+"/"+faultEscalationDate+"/"+targetDate).then(function (response) {
                                hello = response.data;

                                return response.data;
                            });
                        };
                     
                        //var hello;


                    }]);
