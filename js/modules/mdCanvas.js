export class main { 
	constructor(  ) { 
		var furl = this.getMdFiles(  );
		this.say = "This is a es6 main test module:" + furl;
	}

	getMdFiles(  ) { 
		// http://stackoverflow.com/a/21903119/1933185
		var getUrlParameter = function getUrlParameter(sParam) {
			var sPageURL = decodeURIComponent(window.location.search.substring(1)),
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

		return getUrlParameter( 'md' ) || 'mdCanvas';
	}

}
