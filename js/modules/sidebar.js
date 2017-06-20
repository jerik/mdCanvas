export class sidebar { 

	constructor(  ) { 
		// could be used, to show only the available files, if no url-param, the show the first file
		this.mdfiles = [];
		this.init(  );
		this.say = "This is the sidebar module.";
		//this.remove();
		this.status();
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

			//console.log(this.mdfiles);
			// clean array that it only has relevant mdfiles 
			this.mdfiles = this.cleanFiles(this.mdfiles);
			this.remove(this.mdfiles);
			console.log(this.mdfiles);
			return this.mdfiles; // for the next promise, if there is one
		}

		var doPopulate = (mdfiles) => {
			this.populateSidebar(mdfiles);
		}

		var doReject = function( data ) { 
			console.log( "Reject: ", data );
		}

		this.ajax( "." )
			.then( 
				doParse,
				doReject
			) 
			.then(  
				doPopulate, 
				doReject
			).catch( function( error ) { 
				console.error( "Catched: ", error )
			} );
	}

	populateSidebar(mdfiles) {
		// console.log( "lets do the", mdfiles);
		$.each( mdfiles, function( key, value ) { 
			console.log( value );
			var li = $( '<li>' ).appendTo( '#link' );
			var name = value.slice( 0,-3 );
			// $( '<a>', { text: value, href: '?md=' + value.slice( 0,-3 ) } ).appendTo( '#link' );
			$( '<a>', { text: name, href: '?md=' + name } ).appendTo( li );
		});
	}

	// @todo NON dry, this is the same function in mdCanvas.js, perhaps source out?
	ajax( options ) { 
		return new Promise( function( resolve, reject ) { 
			$.get( options ).done( resolve ).fail( reject );
		});
	}

	/* @todo WIP integrated sidebar functionality (copy paste)
	 * not sure if this works as I think
	 */

	// @todo how to refactor this better
	cleanFiles(mdfiles) {
		let files = $.map(mdfiles, function(n) {
			return ((/readme/i).test(n) ? null : n);
		});
		return files;
	}

	remove(mdfiles) {
		if (mdfiles.length < 2) {
			$('#sidebar').remove();
		}
		if (mdfiles.length == 0) {
			$('#mdc-canvas').html("No 'mdCanvas.md' file available");
		}
	}
	
	// Closure: http://javascriptissexy.com/understand-javascript-closures-with-ease/
	state(  ) { 
		const stateClose = 'close'; 
		const stateOpen = 'open';

		return {  

			open:  function(  ) { 
			   $( '#sidebar' ).css( 'width', 200 );
			   $( '#toggler' ).html( '&laquo;' );
			   $( '#link' ).css( 'display', 'inline');
			   this.setState( stateOpen );
			},

			close: function (  ) { 
			   $( '#sidebar' ).css( 'width', 29 );
			   $( '#toggler' ).html( '&raquo;' );
			   $( '#link' ).css( 'display', 'none');
			   this.setState( stateClose );
		   	},

			setState: function ( setState ) { 
				if ( setState == stateOpen ) {  
					// if there will be more localStorage action, create a object for it
					// that do formal checks, if storage available, etc
					localStorage.setItem( 'stateSidebar', stateOpen );
				} else {  
					// this has the advantage that a new loaded page and a closed sidebar have the same state
					localStorage.removeItem( 'stateSidebar' ); // value is null
				}

				console.log("sidebar state is now", setState);
			}, 
			
			getState: function(  ) {
				console.log("current state is now", localStorage.getItem('stateSidebar'));
				return localStorage.getItem( 'stateSidebar' );
		    },

			toggle: function(  ) { 
				if ( this.getState(  ) == stateOpen ) { 
					this.close(  );
				} else { 
					this.open(  );
				}
			}, 

			start: function( ) {
				if ( this.getState() == stateOpen ) {
					this.open( );
				}
			}
		}
	}

	status() {
		var self = this;
		this.state().start();
		$(document).on('click', '#toggler', function() {
			var nsiba = self.state();
			nsiba.toggle();
		});
	}
}