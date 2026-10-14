jQuery( document ).ready( function() {

    jQuery( '#trigger-menu' ).click(function(e) {
            
        e.preventDefault();
        abc_toggle_menu();
    });

    jQuery( '#trigger-menu-small' ).click( function() {

        abc_close_menu();
    });

    jQuery( '.toggle_sub' ).click(function() {

        abc_toggle_submenu( jQuery( this ) );
    });

    jQuery( '#menu_on_body_click' ).click(function() {
        
        abc_close_menu();
    });
});

function abc_toggle_menu() {

    var menu                = jQuery( '#min_responsive_menu' );
    var trigger             = jQuery( '#trigger-menu' );
    var menu_page_wrapper   = jQuery( '#menu_on_body_click' );

    // If menu is not open
    if( menu.hasClass( 'open' ) == false ) {
    
        // Open menu        
        menu.addClass( 'open' );

        // Change trigger state
        trigger.addClass( 'active' );

        // Change trigger icon
        trigger.html( '<i class="fa fa-times fa-fw" aria-hidden="true"></i>' );

        // Show wrapper
        menu_page_wrapper.show();

    // If menu is open
    }else{

        // Close menu
        menu.removeClass( 'open' );

        // Change trigger state
        trigger.removeClass( 'active' );

        // Change trigger icon
        trigger.html( '<i class="fa fa-bars fa-fw" aria-hidden="true"></i>' );

        // Hide page wrapper
        menu_page_wrapper.hide();

        abc_close_all_submenus();
    }
}

function abc_open_menu() {

    var menu                = jQuery( '#min_responsive_menu' );
    var trigger             = jQuery( '#trigger-menu' );
    var menu_page_wrapper   = jQuery( '#menu_on_body_click' );

    // Menu is not open
    if( menu.hasClass( 'open' ) == false ) {

        // Open menu        
        menu.addClass( 'open' );

        // Change trigger state
        trigger.addClass( 'active' );

        // Change trigger icon
        trigger.html( '<i class="fa fa-times fa-fw" aria-hidden="true"></i>' );

        // Show wrapper
        menu_page_wrapper.show();
    }
}

function abc_close_menu() {

    var menu                = jQuery( '#min_responsive_menu' );
    var trigger             = jQuery( '#trigger-menu' );
    var menu_page_wrapper   = jQuery( '#menu_on_body_click' );

    // Menu is open
    if( menu.hasClass( 'open' ) == true ) {

        // Close menu
        menu.removeClass( 'open' );

        // Change trigger state
        trigger.removeClass( 'active' );

        // Change trigger icon
        trigger.html( '<i class="fa fa-bars fa-fw" aria-hidden="true"></i>' );

        // Hide page wrapper
        menu_page_wrapper.hide();

        abc_close_all_submenus();
    }
}

function abc_toggle_submenu( trigger ) {

    var submenu = trigger.next( '.responsive-submenu' );

    submenu.stop();

    // Submenu is not open
    if( submenu.hasClass( 'open' ) == false ) {

        // Open submenu
        submenu.slideDown( 'fast' );

        // Give submenu open class
        submenu.addClass( 'open' );

        // Change submenu trigger state
        trigger.addClass( 'active' );

        // Change submenu trigger icon
        trigger.html( '<i class="fa fa-chevron-down fa-fw" aria-hidden="true">' );

    }else{

        // Close submenu
        submenu.slideUp( 'fast' );

        // Remove open class
        submenu.removeClass( 'open' );

        // Change submenu trigger state
        trigger.removeClass( 'active' );

        trigger.html( '<i class="fa fa-chevron-right fa-fw" aria-hidden="true">' );
    }
}

function abc_close_all_submenus() {

    jQuery( '.toggle_sub' ).each(function( index ) {

        var trigger = jQuery( this );
        var submenu = trigger.next( '.responsive-submenu' );

        if( submenu.hasClass( 'open' ) == true ) {

            submenu.delay(500).slideUp( 'fast' );

            submenu.removeClass( 'open' );

            trigger.removeClass( 'active' );

            trigger.html( '<i class="fa fa-chevron-right fa-fw" aria-hidden="true">' );
        }
    });
}