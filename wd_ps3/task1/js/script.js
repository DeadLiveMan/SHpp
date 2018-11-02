(function ($) {
    const element = ['#products', '#about', '#contacts'];
    const $scrollButton = $('.scroll-button');
    const $allDocument = $('html, body');

    const positionShowButton = 200;
    const timeHideButton = 150;
    const timeShowButton = 300;

// stop animation after scroll wheel
    $allDocument.on('mousewheel', function () {
        if ($allDocument.animate.length) {
            $allDocument.stop();
            //isAnimatedDocument = false;
        }
    });

// event for click header links
    $('.header__link_item').on('click', function () {
        const linkClass = element[$(this).index()];
        $allDocument.animate({
            scrollTop: $(linkClass).offset().top + $(linkClass).height() / 2 - $(window).height() / 2
        }, 500);
    });

// event for click scroll button
    $scrollButton.on('click', function () {
        if (!$('.html:animated').length) {
            $allDocument.animate({scrollTop: 0}, 800);
        }
    });

// hide and show scroll button
    $(window).on('scroll', function () {
        if (!$('.scroll-button:animated').length && ($(window).scrollTop()) > positionShowButton) {
            $scrollButton.fadeIn(timeShowButton, function () {
                if ($(window).scrollTop() < positionShowButton) {
                    $scrollButton.fadeOut(timeHideButton);
                }
            });
        } else if (!$('.scroll-button:animated').length) {
            $scrollButton.fadeOut(timeHideButton, function () {
                if ($(window).scrollTop() > positionShowButton) {
                    $scrollButton.fadeIn(timeShowButton);
                }
            });
        }
    });
})(jQuery);
