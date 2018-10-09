
$('.code__rect').click(function () {
    if ($(this).text() === "0") {
        $(this).text("1");
    } else {
        $(this).text("0");
    }


    let dec = 0;
    $('.code__rect').text(function (index, value) {
        if (index < 8) {
            dec += Math.pow(2, 7 - index) * Number(value);
            $('.dec-code h1:last').text(dec);
            $('.hex-code h1:last').text((dec + Math.pow(16, 2)).toString(16).substr(-2).toUpperCase());
        }
    });



});

$('.settings label input').click(function () {
    if (this.checked) {
        $('.content__code-second, .content__code-result').fadeIn(1500);
    } else {
        $('.content__code-second, .content__code-result').fadeOut(1500);
    }
});





