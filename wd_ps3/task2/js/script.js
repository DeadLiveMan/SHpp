
const names = {
                Poper : "1.svg",
                Noger:  "2.svg",
                Ruker: "3.svg",
                Golover: "4.svg",
                Glazer: "5.svg"
};

let animate = false;

const dropDown = $('.drop-down');
$.each(names, function (key) {
    const dropDownElement = $('<div class="drop-down-element" style="display: none">');
    const dropDownLogo = $('<div class="drop-down-logo">').append($(`<img src="css/font/people/${names[key]}">`));
    const dropDownName = $('<div class="drop-down-name">');
    dropDownName.text(key);
    dropDownElement.append(dropDownLogo);
    dropDownElement.append(dropDownName);
    dropDown.append(dropDownElement);
});

// $('*').click(function (e) {
//     e.stopPropagation();
//     console.log(this);
// });

$('.drop-down-element').click(function (e) {
    e.stopPropagation();
    //console.log(this);
    $('.drop-down-element-main .drop-down-name').text(this.lastChild.textContent);
    $('.drop-down-element-main .drop-down-logo').html(`<img src="${this.firstChild.firstChild.src}">`);
    if (!animate) {
        animate = true;
        $('.drop-down-element').toggle(200, function () {
            animate = false;
        });
    }
});

dropDown.click(function () {
    //console.log(this);
   if (!animate) {
       animate = true;
       $('.drop-down-element').toggle(200, function () {
           animate = false;
       });
   }
});

