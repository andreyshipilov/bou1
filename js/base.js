/* jshint strict: true, indent: 4, trailing: true, onevar: true */
/* global google */

var map,
    adelaide = new google.maps.LatLng(-34.93, 138.6);

function initializeMap() {
    'use strict';

    var marker,
        mapOptions;

    // Contacts map.
    mapOptions = {
        zoom: 12,
        center: adelaide,
        disableDefaultUI: true,
        zoomControl: false,
        scaleControl: false,
        scrollwheel: false,
        disableDoubleClickZoom: true,
        navigationControl: false,
        mapTypeControl: false,
        draggable: false
    };
    map = new google.maps.Map(document.getElementById('map'), mapOptions);

    // Marker.
    marker = new google.maps.Marker({
        position: adelaide,
        map: map,
        icon: '/i/map-marker.png'
    });
}

function redrawMap() {
    'use strict';

    // Set center and trigger resize.
    google.maps.event.trigger(map, 'resize');
    map.setCenter(adelaide);
}

google.maps.event.addDomListener(window, 'resize', function () {
    'use strict';

    // Redraw on resize.
    redrawMap();
});

$(function () {
    'use strict';

    var menu = $('#menu');

    // We also love validation.
    $('<meta></meta>').attr({
        'name': 'apple-mobile-web-app-title',
        'content': 'BOU'
    }).appendTo('head')

    // Init map.
    initializeMap();

    // Init fullPage.js.
    $.fn.fullpage({
        anchors: ['hello', 'about', 'work', 'contact', 'goodbye'],
        menu: '#menu',
        scrollingSpeed: 250,
        verticalCentered: false,
        easing: false,
        resize: false,
        slidesNavigation: true,
        afterLoad: function (anchorLink, index) {
            switch (index) {
            case 1:
            case 3:
            case 5:
                menu.addClass('bright').removeClass('dark');
                break;
            case 2:
            case 4:
                menu.addClass('dark').removeClass('bright');
                break;
            }
            redrawMap();
        }
    });
});
