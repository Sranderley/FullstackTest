angular
	.module( 'app' )
	.factory( 'HttpService', HttpService )

HttpService.$inject = [ '$http' ]

// An $http wrapper which points to the API.php endpoint,
// exposing a single method, 'send', which takes a request
// object and returns a promise

function HttpService ( $http ) {

	var service = {
		send: send
	}

	return service

    function send ( request ) {

    	var promise = $http ({
    		method: "post",
    		url: "../API.php",
    		headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    		data: request
    	})
        .then ( function ( response ) {

    		return response.data
    	})

    	return promise
    }
}