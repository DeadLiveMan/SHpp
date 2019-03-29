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

const SLIDER_CURRENT = $('.slider-current');
const SLIDER_PREVIEW = $('.slider-previews');

// create slider/preview elements
$(IMAGES).each(function (index) {
    const sliderImages = document.createElement('img');
    $(sliderImages).attr({
        src : API_URL + BIG_SIZE + IMAGES[index],
        alt : 'image',
        style : 'display : none'
    });
    SLIDER_CURRENT.append(sliderImages);

    const li = document.createElement('li');
    const previewImage = document.createElement('img');
    $(previewImage).attr({src : API_URL + SMALL_SIZE + IMAGES[index]});
    $(li).append(previewImage);
    $(SLIDER_PREVIEW).append(li);

    // add event to li
    $(li).on('click', function () {
        sliding(index);
    });
});

const CURRENT_IMAGES = $('.slider-current img');
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
        return IMAGES.length - 1;
    }
    if (index >= IMAGES.length) {
        return 0;
    }
    return index;
}

function sliding(indexSlider) {
    index = indexSlider;
    for (let i = 0; i < IMAGES.length; i++) {
        $(SLIDER_PREVIEW[0].childNodes[i]).removeClass('current');
        $(CURRENT_IMAGES[i]).hide();
    }
    $(SLIDER_PREVIEW[0].childNodes[indexSlider]).addClass('current');
    $(CURRENT_IMAGES[indexSlider]).show();
}

