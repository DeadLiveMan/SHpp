$(function () {

    const textArea = document.getElementById('text-area');
    const regInput = document.getElementById('input-reg');
    const outputDiv = document.getElementById('output-text');

    const flagsInfo = $('#flags-info h2');
    const button = $('#btn');
    const flagReg = $('.flag-reg');

    const mark = {
        open: '<mark>',
        close: '</mark>'
    };

    let flags;
    flagReg.on('click', function () {
        flags = '';
        flagReg.each(function () {
            if (this.checked) {
                flags += this.value;
            }
            flagsInfo[0].innerText = '/' + flags + '/';
        });
        const regExp = checkReg();
        printMarkers(regExp);
    });


    // textArea.oninput = function () {
    //     const regExp = checkReg();
    //     printMarkers(regExp);
    // };
    //
    // regInput.oninput = function () {
    //     const regExp = checkReg();
    //     printMarkers(regExp);
    // };

    button.click(function (e) {
        e.preventDefault();
        const regExp = checkReg();
        printMarkers(regExp);
    });

    function checkReg() {
        if (!regInput.value) {
            $(regInput).removeClass('error');
            return;
        }

        let regExp;
        try {
            regExp = new RegExp(regInput.value, flags);
            $(regInput).removeClass('error');
        } catch {
            $(regInput).addClass('error');
            return;
        }
        return regExp;
    }

    function printMarkers(regExp) {
        if (!regExp) {
            return;
        }

        const text = textArea.value;

        let markedText = text.replace(regExp, function (findElement) {
            return mark.open + findElement + mark.close;
        });

        let arr = markedText.split(mark.open);

        let result = '';
        for (let i = 0; i < arr.length; i++) {
            const marker = arr[i].split(mark.close);

            if (marker.length > 1 && marker[0] !== '') {
                result += mark.open + htmlEncode(marker[0]) + mark.close;
            } else {
                result += htmlEncode(marker[0]);
            }
            result += htmlEncode(marker[1]);
        }
        $(outputDiv).html(result);
    }

    function htmlEncode(value) {
        if (!value) {
            return '';
        }
        return $('<div />').text(value).html();
    }
});