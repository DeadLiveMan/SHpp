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

const KEY_CODE_LEFT = 37;
const KEY_CODE_RIGHT = 39;

let index = 0;

const CURRENT_PREVIEW_CLASS = 'current';
const CURRENT_IMAGES_CLASS = '.slider-current img';

const CURRENT_SLIDER = $('.slider-current');
const PREVIEW_SLIDER = $('.slider-previews');
const IMAGES_COUNT = IMAGES.length;

// create slider/preview elements
$(IMAGES).each(function (index) {
    const sliderImages = document.createElement('img');
    $(sliderImages).attr({
        src : API_URL + BIG_SIZE + IMAGES[index],
        alt : 'image',
        style : 'display : none'
    });
    CURRENT_SLIDER.append(sliderImages);

    const li = document.createElement('li');
    const previewImage = document.createElement('img');
    $(previewImage).attr({src : API_URL + SMALL_SIZE + IMAGES[index]});
    $(li).append(previewImage);
    $(PREVIEW_SLIDER).append(li);

    // add event to li element
    $(li).on('click', function () {
        sliding(index);
    });
});
const CURRENT_IMAGES = $(CURRENT_IMAGES_CLASS);
sliding(0);

$(document).keydown(function (e) {
    if (e.which === KEY_CODE_LEFT) {
        index--;
    }
    if(e.which === KEY_CODE_RIGHT) {
        index++;
    }
    index = correctionIndex(index);
    sliding(index);
});

function correctionIndex(index) {
    if (index < 0) {
        return IMAGES_COUNT - 1;
    }
    if (index >= IMAGES_COUNT) {
        return 0;
    }
    return index;
}

function sliding(indexSlider) {
    index = indexSlider;
    for (let i = 0; i < IMAGES_COUNT; i++) {
        $(PREVIEW_SLIDER[0].childNodes[i]).removeClass(CURRENT_PREVIEW_CLASS);
        $(CURRENT_IMAGES[i]).hide();
    }
    $(PREVIEW_SLIDER[0].childNodes[indexSlider]).addClass(CURRENT_PREVIEW_CLASS);
    $(CURRENT_IMAGES[indexSlider]).show();
}

