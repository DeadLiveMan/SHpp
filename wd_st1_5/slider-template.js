const API_URL = 'https://picsum.photos/';
const BIG_SIZE = '600/400';
const SMALL_SIZE = '60';
const IMAGES = [
    '?image=1080',
    '?image=1079',
    '?image=1069',
    '?image=1063',
    '?image=1050',
    '?image=1039'
];

let index = 0;

const SLIDER_CURRENT = $('.slider-current');
const SLIDER_PREVIEW = $('.slider-previews');

$(IMAGES).each(function (index) {
    SLIDER_CURRENT.append('<img src="' + API_URL + BIG_SIZE + IMAGES[index] + '" alt="0" style="display:none">');
    SLIDER_PREVIEW.append($('<li>').append($('<img src="' + API_URL + SMALL_SIZE + IMAGES[index] + '">')).on('click', function () {
        sliding(index);
    }));
});

const CURRENT_IMAGES = $('.slider-current img');
sliding(0);

$(document).keydown(function (e) {
    if (e.which === 37) {
        index--;
        if (index < 0) {
            index = IMAGES.length - 1;
        }
    }
    if(e.which === 39) {
        index++;
        if (index >= IMAGES.length) {
            index = 0;
        }
    }
    sliding(index);
});

function sliding(indexSlider) {
    index = indexSlider;
    for (let i = 0; i < IMAGES.length; i++) {
        $(SLIDER_PREVIEW[0].childNodes[i]).removeClass('current');
        $(CURRENT_IMAGES[i]).hide();
    }
    $(SLIDER_PREVIEW[0].childNodes[indexSlider]).addClass('current');
    $(CURRENT_IMAGES[indexSlider]).show();
}

