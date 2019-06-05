$(function() {

    const textArea = document.getElementById('text-area');
    const regInput = document.getElementById('input-reg');
    const outputDiv = document.getElementById('output-text');

    const flagsInfo = $('#flags-info h2');
    const button = $('#btn');
    const flagReg = $('.flag-reg');

    let flags;
    flagReg.on('click', function () {
        flags = '';
        flagReg.each(function () {
            if(this.checked) {
                flags += this.value;
            }
            flagsInfo[0].innerText = '/' + flags + '/';
        });
        checkReg();
    });


    textArea.oninput = function () {
        checkReg();
    };

    regInput.oninput = function () {
        checkReg();
    };

    button.click(function(e) {
        e.preventDefault();
        checkReg();
    });

    function checkReg() {
        if (!regInput.value) {
            return;
        }

        const regExp = new RegExp(regInput.value, flags);

        const mark  = {
            open: '<mark>',
            close: '</mark>'
        };

        const text = textArea.value;

        let markedText = (text.replace(regExp, function (findElement) {
            return mark.open + findElement + mark.close;
        }));

        $(outputDiv).html(markedText);
    }

    function htmlEncode(value){
        if (!value) {
            return '';
        }
        return $('<div />').text(value).html();
    }

    function htmlDecode(value) {
        if (!value) {
            return '';
        }
        return $('<div />').html(value).text();
    }
});