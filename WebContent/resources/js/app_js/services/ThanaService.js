/* Service Code */
'use strict';
 
App.factory('ThanaService', ['$http', '$q', 'url',function($http, $q, url){
	
 
    return {
         
    	fetchAllThana: function() {
                  //  return $http.get('http://localhost:8097/CTMS/user/')
            	 return $http.get(url+'thana/') 
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while fetching thana');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
            fetchAllDistrict: function() {
                //  return $http.get('http://localhost:8097/CTMS/user/')
          	 return $http.get(url+'fetchdistrict/') 
                          .then(
                                  function(response){
                                      return response.data;
                                  }, 
                                  function(errResponse){
                                      console.error('Error while fetching district');
                                      return $q.reject(errResponse);
                                  }
                          );
          },
             
            createThana: function(thanaId){
                    //return $http.post('http://localhost:8097/CTMS/user/', user)
            	return $http.post(url+'createThana/', thanaId)
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while creating Thanas');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
             
            updateThana: function(thana, id){
                  //  return $http.put('http://localhost:8097/CTMS/user/'+id, user)
            	return $http.put(url+'updatethana/'+id, thana)
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while updating Thanas');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
             
            deleteThana: function(id){
                    //return $http.delete('http://localhost:8097/CTMS/Thana/'+id)
            	 return $http.delete(url+'deletethana/'+id)
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while deleting Thana');
                                        return $q.reject(errResponse);
                                    }
                            );
            }
         
    };
 
}]);
/* End of Service Code */