(function ($) {
    const element = ['#products', '#about', '#contacts'];
    const $scrollButton = $('.scroll-button');
    const $allDocument = $('html, body');


    const positionShowButton = 200;
    const timeHideButton = 150;
    const timeShowButton = 300;

    let isAnimatedButton = false;
    let isAnimatedDocument = false;

// stop animation after scroll wheel
    $allDocument.on('mousewheel', function () {
        if (isAnimatedDocument) {
            $allDocument.stop();
            isAnimatedDocument = false;
        }
    });

// event for click header links
    $('.header__link_item').on('click', function () {
        isAnimatedDocument = true;
        const linkClass = element[$(this).index()];
        $allDocument.animate({
            scrollTop: $(linkClass).offset().top + $(linkClass).height() / 2 - $(window).height() / 2
        }, 500, function () {
            isAnimatedDocument = false;
        });
    });

// event for click scroll button
    $scrollButton.on('click', function () {
        if (!isAnimatedDocument) {
            isAnimatedDocument = true;
            $allDocument.animate({scrollTop: 0}, 800);
        }
    });

// hide and show scroll button
    $(window).on('scroll', function () {
        if (($(window).scrollTop()) > positionShowButton && !isAnimatedButton) {
            isAnimatedButton = true;
            $scrollButton.fadeIn(timeShowButton, function () {
                if ($(window).scrollTop() < positionShowButton) {
                    $scrollButton.fadeOut(timeHideButton);
                }
                isAnimatedButton = false;
            });
        } else if (!isAnimatedButton) {
            isAnimatedButton = true;
            $scrollButton.fadeOut(timeHideButton, function () {
                if ($(window).scrollTop() > positionShowButton) {
                    $scrollButton.fadeIn(timeShowButton);
                }
                isAnimatedButton = false;
            });
        }
    });
})(jQuery);
