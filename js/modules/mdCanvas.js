export class main { 
	constructor(  ) { 
		var url = window.location.search.substring( 1 ); // get the params after ? in the url
		var filename = this.getFilenameFrom( url );
		this.getFile( filename );
		this.say = "This is a es6 main test module:" + filename;
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

		return getUrlParameter( 'md', currentUrl ) || 'mdCanvas';
	}

	getFile( filename ) { 
		var pathmd = filename + ".md";
		$.get( pathmd, function( data ) { 
			console.log( data );
			return data;
		}, 'text' );
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

		// @todo get header, by spliting the first line \n
		// @todo bastel object with heading and content
	}

}
