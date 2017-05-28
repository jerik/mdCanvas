export class main { 

	constructor(  ) { 
		this.init(  );
		this.say = "This is a es6 main test module.";
		this.canvas = { first: "item" }
	}

	// for integration tests 
	// @todo integration test not possible as getFile has no return result...
	init( url ) { 
		// windows.location 		contains the full url 	> http://www.test.de?foo=bar&here=wegoagain
		// windows.location.search 	contains the parameters > 					?foo=bar&here=wegoagain
		// windows.location.search.substring( 1 ) removes the ? from the parameters
		var url = url || window.location.search.substring( 1 ); // get the test url or the real parameters
		var filename = this.getFilenameFrom( url );

		var mdPath = filename + '.md';

		// resolve function 
		var doResolve = function ( data ) { 
			console.log( "doResolve :", data );
			return data; // important for the next promise in chain
		}

		// https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Functions/Pfeilfunktionen
		var doResolveNow = ( data ) => {  // doResolveNow should be doResolve !!
			this.parse( data );
			// console.log( "doResolveNow :", data );
			return data; // important for the next promise in chain
		}

		var doReject = function( data ) { 
			console.log( "Reject: ", data );
		}

		this.ajax( mdPath )
			.then( 
				doResolve,
				/* function( data ) { 
					var tmp = data.replace( 'content', 'BAAAR' );
					console.log( "2. resolve: ", tmp );
					return tmp;
				}, */
				doReject
				/* function( data ) { // reject
					console.log( "reject: ", data );
				} */
			)
			.then(  // work on the first promise result
				doResolveNow, 
				doReject
			).catch( function( error ) { 
				console.error( "Catched: ", error )
			} );
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
	
	// try promises from foo.html
	ajax( options ) { 
		return new Promise( function( resolve, reject ) { 
			$.get( options ).done( resolve ).fail( reject );
		});
	}

	/* 
	 * parse(  ) { 
	 * 	 var contentFile;
	 * 	 var contentArr; // is that needed?
	 * 	 var contentObj;
	 * 	 getFile(  ) { this.contentFile }
	 * 	 getSections(  ) {  } // aka parseSections
	 * 	 getHeading(  ) {  this.contentObj }
	 * 	 ...
	 * }
	 */
	parse( content ) { 
		// run parse
		var parts = this.getSections(content);
		var heading = this.getHeading( parts );
		console.log( this.canvas );
	}

	getSections( content ) { 
		if ( content == undefined ) { 
			return new Error( "Missing parameter 'content'" );
		}
		var parts = content.split( '#' ); // @todo works only is not # is used as numbere list

		// tidy up array, remove first empty entry
		if ( Array.isArray( parts ) && parts.length > 1) { 
			if ( parts[0] == "" ) { 
				parts.shift(  );
			}
		}
		console.log( "THIS Parts: ", parts );
		return parts;
		//this.getHeading( parts );
	}

	getHeading( parts ) { 
		var heading = parts.slice( 0, parts.indexOf("\n" ));
		console.log( 'HEading: ' + heading );
		return heading;

		// @todo bastel object with heading and content: { mdc-costs: "this is the \n text of the box" }
		// http://2ality.com/2014/08/es6-today.html
	}
}
