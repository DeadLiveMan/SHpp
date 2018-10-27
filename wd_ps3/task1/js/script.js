
const element = ['.content', '.menu', '.footer'];
const $scrollButton = $('.scroll-button');
const $allDocument = $('*');

const scrollShowPosition = 300;
const timeHide = 150;
const timeShow = 300;
const maxOpacity = 'show';
const minOpacity = 'hide';

let isAnimated = false;
let isAnimatedDocument = false;

// stop animation after scroll wheel
$allDocument.on('mousewheel', function () {
    if(isAnimatedDocument) {
        $allDocument.stop();
        isAnimatedDocument = false;
    }
});

// event for click header links
$(".header__link_item").click(function() {
    isAnimatedDocument = true;
    $allDocument.animate( {
            scrollTop: $(element[$(this).index()]).offset().top + $(element[$(this).index()]).height() / 2 - $(window).height() / 2
        }, 500);
});

// event for click scroll button
$scrollButton.click(function () {
    if(!isAnimatedDocument) {
        isAnimatedDocument = true;
        $allDocument.animate({scrollTop: 0}, 800);
    }
});

// hide and show scroll button
$(window).scroll(function () {
    if(($(window).scrollTop()) > scrollShowPosition && !isAnimated) {
        isAnimated = true;
        $scrollButton.animate({opacity: maxOpacity}, timeShow, function () {
            if ($(window).scrollTop() < scrollShowPosition) {$scrollButton.animate({opacity: minOpacity}, timeHide)}
            isAnimated = false;
        });
    } else if (!isAnimated){
        isAnimated = true;
        $scrollButton.animate({opacity: minOpacity}, timeHide, function () {
            if ($(window).scrollTop() > scrollShowPosition) {$scrollButton.animate({opacity: maxOpacity}, timeShow)}
            isAnimated = false;
        });
    }
});





