(function ($) {
    const $scrollButton = $('.scroll-button');
    const $allDocument = $('html, body');

    const positionShowButton = 300;
    const timeShowButton = 100;

    const positionHideButton = 100;
    const timeHideButton = 50;


// stop animation after scroll wheel
    $allDocument.on('wheelwheel, DOMMouseScroll, mousewheel', function () {
        if ($allDocument.animate.length) {
            $allDocument.stop();
        }
    });

// event for click header links
    $('nav a').on('click', function (e) {
        e.preventDefault();
        const targetElement = e.target.hash;
        const targetElementOffset = $(targetElement).offset().top;
        const targetElementCenter = $(targetElement).height() / 2;
        const windowCenter = $(window).height() / 2;
        const scrollPosition = targetElementOffset + targetElementCenter - windowCenter;
        $allDocument.animate({
            scrollTop: scrollPosition
        }, 500);
    });

// event for click scroll button
    $scrollButton.on('click', function () {
        if (!$('.html:animated').length) {
            $allDocument.animate({scrollTop: 0}, 800);
        }
    });

// hide and show scroll button after scrolling
    $(window).on('scroll', function () {
        if (!$('.scroll-button:animated').length) {
            if (($(window).scrollTop()) > positionShowButton) {
                $scrollButton.fadeIn(timeShowButton, function () {
                    if ($(window).scrollTop() < positionShowButton) {
                        $scrollButton.fadeOut(timeHideButton);
                    }
                });
            } else if (($(window).scrollTop()) < positionHideButton){
                $scrollButton.fadeOut(timeHideButton, function () {
                    if ($(window).scrollTop() > positionShowButton) {
                        $scrollButton.fadeIn(timeShowButton);
                    }
                });
            }
        }
    });
})(jQuery);

