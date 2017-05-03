<?php

// A simple API class to wrap a function that takes four arguments
// and uses them to build a GET URL for spotify's API, then echoing
// the results of the GET query

class SpotifyApi {

	function querySpotify ( $parameter, $type, $limit, $offset ) {

		$query = array(
			"q" => $parameter,
			"type" => $type,
			"limit" => $limit,
			"offset" => $offset
		);

		$url = "https://api.spotify.com/v1/search?" . http_build_query( $query );

		$json = file_get_contents( $url );

		echo $json;
	}
}

$postdata = file_get_contents( "php://input" );
$request = json_decode( $postdata );

header( "Content-Type: application/json" );

$api = new SpotifyApi();
$api->querySpotify( $request->parameter, $request->type, $request->limit, $request->offset );

?>