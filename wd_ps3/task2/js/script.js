
const names = {
    Poper : "1.svg",
    Noger:  "2.svg",
    Ruker: "3.svg",
    Golover: "4.svg",
    Glazer: "5.svg"
};

let animate = false;
const $dropDown = $('.drop-down');

$.each(names, function (key) {
    const $dropDownElementBuilder = $('<div class="drop-down-element" style="display: none">');
    const $dropDownLogo = $('<div class="drop-down-logo">').append($(`<img src="css/font/people/${names[key]}">`));
    const $dropDownName = $('<div class="drop-down-name">');
    $dropDownName.text(key);
    $dropDownElementBuilder.append($dropDownLogo);
    $dropDownElementBuilder.append($dropDownName);
    $dropDown.append($dropDownElementBuilder);
});

const $dropDownElement = $('.drop-down-element');

$('*').click(function () {

    // choice elements
    $dropDownElement.click(function () {
        $('.drop-down-element-main .drop-down-name').text(this.lastChild.textContent);
        $('.drop-down-element-main .drop-down-logo').html(`<img src="${this.firstChild.firstChild.src}">`);
    });
    // hide when click on all document
    if (!animate) {
        animate = true;
        $dropDownElement.hide(200, function () {
            animate = false;
        });
    }
});

// toggle $dropDown on click him
$dropDown.click(function () {
    if (!animate) {
        animate = true;
        $dropDownElement.toggle(200, function () {
            animate = false;
        });
    }
});

