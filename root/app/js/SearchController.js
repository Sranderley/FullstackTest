angular
	.module( 'app' )
	.controller( 'SearchController', SearchController )

SearchController.$inject = [ 'SearchService', '$state' ]

function SearchController ( SearchService, $state ) {

	// Controller globals, aliases
	var sc = this
	var s = SearchService

	// API
	// If a request object returns a result set, the request object
	// is stored in sc.request to be used in additional queries
	sc.request = {}
	sc.submit = submit
	sc.next = next
	sc.showNext = showNext
	sc.previous = previous
	sc.showPrevious = showPrevious
	sc.updateLimit = updateLimit

	// Defaults
	sc.type = 'artist'
	sc.limit = '20'

	function submit ( parameter, type, offset ) {

		if ( !parameter ) {

			alert( "Please type a name into the search field to search for your " + type  + "!" )

		} else {

			var request = {
				parameter: parameter.replace( " ", "+" ),
				type: type,
				limit: sc.limit,
				offset: offset
			};

			sendRequest( request )
		}
	}

	function next() {

		// Change the offset parameter and resubmit the query
		sc.request.offset = s.results.offset + s.results.limit
		sendRequest( sc.request )
	}

	function showNext() {

		// Returns 'true' to the DOM if there more results can be displayed
		return ( s.results.offset + s.results.limit ) < s.results.total
	}

	function previous() {

		// Change the offset parameter to get the previous set of results
		var new_offset = s.results.offset - s.results.limit

		// Change offset to zero if new_offset is less than zero
		sc.request.offset = Math.max(new_offset, 0)
		sendRequest( sc.request )
	}

	function showPrevious() {

		return s.results.offset > 0
	}

	function updateLimit() {

		// Checks to see if a request has been sent, if so,
		// updates the limit and resubmits the query
		if ( s.route ) {

			sc.request.limit = sc.limit
			sendRequest( sc.request )
		}
	}

	function sendRequest ( request ) {

		// Determines if the query returns a result set, if so, stores the
		// request object in 'sc.request', routes the application to the
		// appropriate page.
		SearchService.submitSearch ( request ).then ( function ( response ) {

			if ( !response ) {

				alert( "There are no " + request.type + "s by that name!" )

			} else {

				sc.request = request
				$state.go( s.route )
			}
		})
	}
}