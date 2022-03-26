/* Service Code */
'use strict';
 
App.factory('UsercategoryService', ['$http', '$q', 'url',function($http, $q, url){
	
 
    return {
         
    	fetchAllCategory: function() {
                  //  return $http.get('http://localhost:8097/CTMS/user/')
            	 return $http.get(url+'fetchAllCategory/') 
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while fetching usercategorys');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
             
            createUserCategory: function(userCategoryId){
                    //return $http.post('http://localhost:8080/TTS_Spring/user/', user)
            	return $http.post(url+'Createusercategory/', userCategoryId)
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while creating usercategorys');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
             
            updateusercategory: function(usercategory, id){
                  //  return $http.put('http://localhost:8097/CTMS/user/'+id, user)
            	return $http.put(url+'Updateusercategory/'+id, usercategory)
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while updating usercategory');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
             
            deleteusercategory: function(id){
                    //return $http.delete('http://localhost:8097/CTMS/user/'+id)
            	 return $http.delete(url+'deleteusercategory/'+id)
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while deleting usercategory');
                                        return $q.reject(errResponse);
                                    }
                            );
            }
         
    };
 
}]);
/* End of Service Code */