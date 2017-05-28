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

			// https://developers.google.com/web/fundamentals/getting-started/primers/promises
			// old working version, but should be replaced
			// this.getFile(filename);

			var mdPath = filename + '.md';

			var doResolve = function ( data ) { 
				console.log( "doResolve :", data );
				return data; // important for the next promise in chain
			}

			var doResolveNow = function ( data ) { 
				console.log( "doResolveNow :", data );
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
	getFile( filename ) { 
		var pathmd = filename + ".md";
		var content = "";
		// @todo here I have to dig in!!! with closure?
		// http://javascriptissexy.com/understand-javascript-closures-with-ease/
		// https://oli.me.uk/2013/06/29/equipping-vim-for-javascript/
		var foobar = "";

		// @todo need to merge
		var parse = function(content) {
			// console.log("do the parsing on: " + content)
			foobar = "parse";
			getSections(content);
		}

		// @todo need to merge
		var getSections = function( content ) { 
			if ( content == undefined ) { 
				return new Error( "Missing parameter 'content'" );
			}
			var parts = content.split( '#' ); // @todo works only is not # is used as numbere list
			foobar = "getSections";

			// tidy up array, remove first empty entry
			if ( Array.isArray( parts ) && parts.length > 1) { 
				if ( parts[0] == "" ) { 
					parts.shift(  );
				}
			}
			console.log( parts );
			//return parts;
			buildData(parts);

		}

		// @todo 20170426 create dataObject 
		// @todo need to merge
		var getHeading = function( parts ) { 
			var heading = parts.slice( 0, parts.indexOf("\n" ));
			console.log( 'Heading: ' + heading );
			foobar = "getHeading";
			return heading;

			// @todo bastel object with heading and content: { mdc-costs: "this is the \n text of the box" }
		}

		// @todo need to merge
		var buildData = function(parts) {
			foobar = "buildData";
			getHeading(parts);

		}

		// @todo can be removed obsolet
		$.get( pathmd, function( data ) { 
			//console.log( data );
			//return data;
			content = data;
		}, 'text' )
		.done( function(  ){ 
			parse( content );
			console.log('get.done: ' + foobar);
			return foobar;
		} );
	}

	// https://davidwalsh.name/write-javascript-promises
	// http://www.htmlgoodies.com/beyond/javascript/making-promises-with-jquery-deferred.html
	// http://joseoncode.com/2011/09/26/a-walkthrough-jquery-deferred-and-promise/
	// https://developers.google.com/web/fundamentals/getting-started/primers/promises
	getFilePromise( filename ) { 
		var pathmd = filename + ".md";

		//return new Promise(resolve, reject) { }
		$.get( pathmd, function( data ) { 
			//console.log( data );
			//return data;
			content = data;
		}, 'text' )
		.done( function(  ){ 
			console.log('get.done: ' + content);
			return content;
		} );
	}



}
