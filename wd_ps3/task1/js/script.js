// $('.header__link_item').click($.scrollTo($('#products'), 1000));
const element = ['.content', '.menu', '.footer'];
const $scrollButton = '.scroll-button';

$(".header__link_item").click(function() {
    $(this).each(function() {
        $('html, body').animate( {
            scrollTop: $(element[$(this).index()]).offset().top + $(element[$(this).index()]).height() / 2 - $(window).height() / 2
        }, 500);
    });
});

$($scrollButton).click(function () {
    $('html, body').animate( {scrollTop: 0}, 800);
});

let $isAnimated = false;
const $scrollShowPosition = 300;
const $timeHide = 150;
const $timeShow = 300;
const $maxOpacity = 'show';
const $minOpacity = 'hide';
$(window).scroll(function () {
    if(($(window).scrollTop()) > $scrollShowPosition && !$isAnimated) {
        $isAnimated = true;
        $($scrollButton).animate({opacity: $maxOpacity}, $timeShow, function () {
            if ($(window).scrollTop() < $scrollShowPosition) {$($scrollButton).animate({opacity: $minOpacity}, $timeHide)}
            $isAnimated = false;
        });
    } else if (!$isAnimated){
        $isAnimated = true;
        $($scrollButton).animate({opacity: $minOpacity}, $timeHide, function () {
            if ($(window).scrollTop() > $scrollShowPosition) {$($scrollButton).animate({opacity: $maxOpacity}, $timeShow)}
            $isAnimated = false;
        });
    }
});





