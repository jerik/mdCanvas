export class sidebar { 

	constructor(  ) { 
		this.mdfiles = [];
		this.init(  );
		this.say = "This is the sidebar module.";
	}

	init() {
		this.checkForMdFiles();
	}

	checkForMdFiles() {
		//let url = window.location.href;
		//let path = window.location.pathname;
		//console.log(url, path)
		this.checkForFilesShttp();
	}

	checkForFilesShttp() {
		// @todo check if its the correct directory if possible?

		var doParse = (html) => {
			let document = $(html);
			//console.log("document: ", document);

			let mdAnker = document.find('a[href$=".md"]');

			// iterate through an javascript object 
			Object.keys(mdAnker).forEach((key) => { 
				// check if key is a number, then do the stuff
				if (!isNaN(parseFloat(key) && isFinite(key))) {
					//console.log("key; ", key, $(mdAnker[key]).text());
					this.mdfiles.push($(mdAnker[key]).text());
				}

			})

			//this.mdfiles[1] = 2;
			console.log(this.mdfiles);
			return this.mdfiles; // for the next promise, if there is one
		}

		this.ajax( "." )
			.then( 
				doParse
				// @todo , doReject
				
			); // @todo, doFail
	}

	// @todo NON dry, this is the same function in mdCanvas.js, perhaps source out?
	ajax( options ) { 
		return new Promise( function( resolve, reject ) { 
			$.get( options ).done( resolve ).fail( reject );
		});
	}
}
