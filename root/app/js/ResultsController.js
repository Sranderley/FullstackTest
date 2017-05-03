angular
	.module( 'app' )
	.controller( 'ResultsController', ResultsController )

ResultsController.$inject = [ 'SearchService', '$state' ]

// A controller which is used to return query results to the
// DOM. The checkRoute method is used to force the state of
// the application to 'home' if there are no results to display

function ResultsController ( SearchService, $state ) {

	var rc = this
	var s = SearchService

	rc.checkRoute = checkRoute
	rc.getResultsText = getResultsText
	rc.getResults = getResults

	function checkRoute() {

		if ( !s.route ) $state.go( 'home' )
	}

	function getResultsText() {

		// Determines the number of the final result displayed on the page
		var max = Math.min( s.results.offset + s.results.limit, s.results.total )

		var text = "Displaying " + s.results.offset
		text += "-" + max + " of "
		text += s.results.total + " results"

		return text
	}

	function getResults() {

		return s.results.items
	}
}