(function ($) {
    const names = [
        ['Poper', '1.svg'],
        ['Noger',  '2.svg'],
        ['Ruker', '3.svg'],
        ['Golover', '4.svg'],
        ['Glazer', '5.svg']
    ];

    const $allDocument = $('html');
    const $dropDown = $('.drop-down');
    const animationTime = 200;

    // construct dropDown
    $.each(names, function (userIndex) {
        const $dropDownElementBuilder = $('<div class="drop-down-element" style="display: none">');
        const $dropDownLogo = $('<div class="drop-down-logo">').append($(`<img src="css/font/people/${names[userIndex][1]}">`));
        const $dropDownName = $('<div class="drop-down-name">');
        $dropDownName.text(names[userIndex][0]);
        $dropDownElementBuilder.append($dropDownLogo);
        $dropDownElementBuilder.append($dropDownName);
        $dropDown.append($dropDownElementBuilder);
    });


    // animation dropDown

    const $dropDownElement = $('.drop-down-element');

    $allDocument.on('click', function () {
        // hide when click on all document
        if (!$('.drop-down-element:animated').length && !$('.drop-down-element:hidden').length) {
            console.log('hide');
            $dropDownElement.hide(animationTime);
        }
    });

    // choice elements
    $dropDownElement.on('click', function () {
        $('.drop-down-element-main .drop-down-name').text(this.lastChild.textContent);
        $('.drop-down-element-main .drop-down-logo').html(`<img src="${this.firstChild.firstChild.src}">`);
    });

    // toggle $dropDown on click him
    $dropDown.on('click', function () {
        if (!$('.drop-down-element:animated').length) {
            console.log('toggle');
            $dropDownElement.toggle(animationTime);
        }
    });
})(jQuery);
