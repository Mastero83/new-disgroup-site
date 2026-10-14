jQuery( document ).ready( function() {

	var nav_class = jQuery( '.sticky-menu' );

	if( jQuery( '.sticky-menu' ).length ) {
	    
		var pos = nav_class.offset().top;

		jQuery( window ).scroll( function() {

			var nav_height = nav_class.outerHeight();
			
			if(jQuery( 'body.admin-bar' )[0] ){
				
				if(jQuery(this).scrollTop() + 32 > pos){

					nav_class.addClass( 'sticky-active' ).css('top','32px');
					nav_class.parent().css('margin-top',nav_height);

				}else{

					nav_class.removeClass( 'sticky-active' ).removeAttr('style');
					nav_class.parent().removeAttr('style');
				}

			}else{

				if(jQuery(this).scrollTop() > pos){

					nav_class.addClass( 'sticky-active' );
					nav_class.parent().css('margin-top',nav_height);
				}else{

					nav_class.removeClass( 'sticky-active' );
					nav_class.parent().removeAttr('style');
				}
			}
		
		});
	}
});
