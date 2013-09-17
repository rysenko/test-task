(function ($) {
    $.event.special.leftClick = {
        setup: function (data, namespaces) {
            var elem = this, $elem = jQuery(elem);
            $elem.bind('click', jQuery.event.special.leftClick.handler);
        },
        teardown: function (namespaces) {
            var elem = this, $elem = jQuery(elem);
            $elem.unbind('click', jQuery.event.special.leftClick.handler)
        },
        handler: function (event) {
            var elem = this, $elem = jQuery(elem);
            if (event.which === 1) {
                event.type = "leftClick";
                if (jQuery.event.handle === undefined) {
                    jQuery.event.dispatch.apply(this, arguments);
                } else { // jQuery < 1.9
                    jQuery.event.handle.apply(this, arguments);
                }
            }
        }

    };
})(jQuery);

$(function () {
    $('#clickLeft').on('leftClick', function () {
        alert('Clicked');
    });
    $('#clickAny').on('click', function () {
        alert('Clicked');
    });
});