angular
	.module( 'app' )
	.factory( 'SearchService', SearchService );

SearchService.$inject = [ 'HttpService' ];

// A service used to submit the searches to the php endpoint
// and store the results of the search queries

function SearchService ( HttpService ) {

	// API for the service
	// s.route is assigned the site routing info if there are any results
	// s.results is where the returned JSON will reside, defaults are 0s
	var s = {
		route: false,
		submitSearch: submitSearch,
		results: {
			limit: 0,
			offset: 0,
			total: 0
		}
	};

	return s;

	function submitSearch ( request ) {

		var promise = HttpService.send ( request ).then ( function ( response ) {

			if ( response[ request.type + "s" ].total > 0 ) {

				// Stores the results of query in 's.results', regardless of 'type'
				s.results = response[ request.type + "s" ]

				// Determines the route of the page used to display results
				s.route = "home." + request.type + "s"

			} else {

				// If there are no results, the promise returns false
				return false
			}

			return response
		})

		return promise
	}

}