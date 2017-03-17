export class main { 
	constructor(  ) { 
		var url = window.location.search.substring( 1 ); // get the params after ? in the url
		var furl = this.getMdFiles( url );
		this.say = "This is a es6 main test module:" + furl;
	}

	getMdFiles( currentUrl ) { 
		// http://stackoverflow.com/a/21903119/1933185
		// relocated window.location.search.substring( 1 ), to make it better testable with qunit
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

}
