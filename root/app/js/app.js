angular.module( 'app' , [ 'ui.router' ])

angular
	.module( 'app' )
	.config( config )

config.$inject = [ '$stateProvider', '$urlRouterProvider' ]

function config ( $stateProvider, $urlRouterProvider ) {

	// Defines the default page for the site
	$urlRouterProvider.otherwise( 'home' )

	// Assigns URLs and templates to state names
	$stateProvider

	.state( 'home', {
		url: '/',
		templateUrl: 'app/html/results.html'
	})

	.state( 'home.artists', {
		url: 'artists',
		templateUrl: 'app/html/artists.html'
	})

	.state( 'home.tracks', {
		url: 'tracks',
		templateUrl: 'app/html/tracks.html'
	})

	.state( 'home.albums', {
		url: 'albums',
		templateUrl: 'app/html/albums.html'
	})
}