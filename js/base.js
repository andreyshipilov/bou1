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

    var $menu = $('#menu');

    // We also love validation.
    $('<meta></meta>').attr({
        'name': 'apple-mobile-web-app-title',
        'content': 'BOU'
    }).appendTo('head');

    // Init map.
    initializeMap();

    // Init fullPage.js.
    $('#bou-page').fullpage({
        anchors: ['hello', 'we', 'are', 'bou', 'goodbye'],
        menu: '#menu',
        scrollingSpeed: 500,
        verticalCentered: false,
        paddingTop: 0,
        paddingBottom: 0,
        slidesNavigation: true,
        fitToSectionDelay: 0,
        controlArrows: false,
        afterLoad: function (anchorLink, index) {
            ga('send', 'event', 'Section / ' + anchorLink, 'Scroll');
            switch (index) {
                case 1:
                case 5:
                    $menu.addClass('bright').removeClass('dark');
                    break;
                case 2:
                case 3:
                case 4:
                    $menu.addClass('dark').removeClass('bright');
                    break;
            }
            redrawMap();
        },
        afterSlideLoad: function (anchorLink, index, slideAnchor, slideIndex) {
            ga('send', 'event', 'Work / ' + slideAnchor, 'Swipe');
        }
    });

    $('#previous-slide').on('click', function (e) {
        e.preventDefault();
        $.fn.fullpage.moveSlideLeft();
    });

    $('#next-slide').on('click', function (e) {
        e.preventDefault();
        $.fn.fullpage.moveSlideRight();
    });
});
