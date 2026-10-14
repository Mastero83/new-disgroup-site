// Set default
var searchActive = false;

// Toggle script
jQuery( document ).ready( function() {

jQuery( '#theme-search i' ).click( function() {

	var $this = jQuery(this).parent().next();

	$this.fadeToggle( 'fast' );
});

});

// Set values
jQuery( document )
.on( 'mouseenter', '#main-header', function(){

	searchActive = true;
})
.on( 'mouseleave', '#main-header', function(){

	searchActive = false;
});

// Remove searchform on document click
jQuery( document ).click( function() {

	if(!searchActive) {

		jQuery( '#theme-search + .search-form' ).fadeOut( 'fast' );
	}
});