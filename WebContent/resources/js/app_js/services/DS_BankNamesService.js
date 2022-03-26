/* Service Code */
'use strict';
 
App.factory('BankService', ['$http', '$q', 'url',function($http, $q, url){
	
 
    return {
         
    	fetchAllBankName: function() {
                  //  return $http.get('http://localhost:8097/CTMS/user/')
            	 return $http.get(url+'fetchAllBankName/') 
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while fetching bank names');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
             
            createBankName: function(bankNamesId){
                    //return $http.post('http://localhost:8080/TTS_Spring/user/', user)
            	return $http.post(url+'createBankName/', bankNamesId)
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while creating bank names');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
             
            updateBankName: function(bankNames, id){
                  //  return $http.put('http://localhost:8097/CTMS/user/'+id, user)
            	return $http.put(url+'updateBankName/'+id, bankNames)
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while updating bank names');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
             
            deleteBankName: function(id){
                    //return $http.delete('http://localhost:8097/CTMS/user/'+id)
            	 return $http.delete(url+'deleteBankName/'+id)
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while deleting Bank Names');
                                        return $q.reject(errResponse);
                                    }
                            );
            }
         
    };
 
}]);
/* End of Service Code */