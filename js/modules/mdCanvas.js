export class main { 

	constructor(  ) { 
		this.init(  );
		this.say = "This is a es6 main test module.";
	}

	// for integration tests 
	// @todo integration test not possible as getFile has no return result...
	init( url ) { 
		// windows.location 		contains the full url 	> http://www.test.de?foo=bar&here=wegoagain
		// windows.location.search 	contains the parameters > 					?foo=bar&here=wegoagain
		// windows.location.search.substring( 1 ) removes the ? from the parameters
		var url = url || window.location.search.substring( 1 ); // get the test url or the real parameters
		var filename = this.getFilenameFrom( url );
		this.getFile( filename );
	}

	getUrlParams( url ) {  // parameter is for testing purpose
		// if url contains only "bar=foo&this=that", the follwing sliece does work and seams to return the untouched url. Thats ok for now.
		var urlParams = url.slice( url.indexOf( '?' ) + 1 );
		console.log( 'urlParams: ' + urlParams );
		return urlParams;
	}

	getFilenameFrom( currentUrl ) { 
		// http://stackoverflow.com/a/21903119/1933185
		// relocated window.location.search.substring( 1 ) as parameter currentUrl, to make it better testable with qunit
		var getUrlParameter = function getUrlParameter(sParam, url) {
			var sPageURL = decodeURIComponent(url),
				sURLVariables = sPageURL.split('&'),
				sParameterName,
				i;

			for (i = 0; i < sURLVariables.length; i++) {
				sParameterName = sURLVariables[i].split('=');

				if (sParameterName[0] === sParam) {
					return sParameterName[1] === undefined ? true : sParameterName[1];
				}
			}
		};

		var urlParams = this.getUrlParams( currentUrl );

		//return getUrlParameter( 'md', currentUrl ) || 'mdCanvas';
		return getUrlParameter( 'md', urlParams ) || 'mdCanvas';
	}

	/* 
	 * parse(  ) { 
	 * 	 var contentFile;
	 * 	 var contentArr; // is that needed?
	 * 	 var contentObj;
	 * 	 getFilename(  ) { this.contentFile }
	 * 	 getSections(  ) {  } // aka parseSections
	 * 	 getHeading(  ) {  this.contentObj }
	 * 	 ...
	 * }
	 */
	getFile( filename ) { 
		var pathmd = filename + ".md";
		var content = "";
		// @todo here I have to dig in!!! with closure?
		// http://javascriptissexy.com/understand-javascript-closures-with-ease/
		var foo = function( a ) { console.log( "##### DATA MATA" + a ); }

		$.get( pathmd, function( data ) { 
			console.log( data );
			//return data;
			content = data;
		}, 'text' )
		.done( function(  ){ 
			foo( content );
		} );
	}

	parseSections( content ) { 
		if ( content == undefined ) { 
			return new Error( "Missing parameter 'content'" );
		}
		var parts = content.split( '#' );

		// tidy up array, remove first empty entry
		if ( Array.isArray( parts ) && parts.length > 1) { 
			if ( parts[0] == "" ) { 
				parts.shift(  );
			}
		}
		console.log( parts );
		return parts;

	}

	getHeading( content ) { 
		var heading = content.slice( 0, content.indexOf("\n" ));
		console.log( 'Heading: ' + heading );
		return heading;
		
		// @todo bastel object with heading and content: { mdc-costs: "this is the \n text of the box" }
	}

}
