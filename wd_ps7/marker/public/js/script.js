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
    /* event for regExp flags (click checkbox)*/
    flagReg.on('click', function () {
        flags = '';
        flagReg.each(function () {
            flags += this.checked ? this.value : '';
            flagsInfo[0].innerText = '/' + flags + '/';
        });
        const regExp = isCorrectReg(regInput.value);
        regExp ? printMarkedText(regExp) : printMarkedText('');
    });

    /* event for input in textArea */
    textArea.oninput = function () {
        const regExp = isCorrectReg(regInput.value);
        regExp ? printMarkedText(regExp) : printMarkedText('');
    };

    /* event for input regExp */
    regInput.oninput = function () {
        const regExp = isCorrectReg(regInput.value);
        regExp ? printMarkedText(regExp) : printMarkedText('');
    };

    /* event for click button "Check" */
    button.click(function (e) {
        e.preventDefault();
        const regExp = isCorrectReg(regInput.value);
        regExp ? printMarkedText(regExp) : printMarkedText('');
    });

    /* if regExp not correct, return false, else create and return regExp object */
    function isCorrectReg(reg) {
        if (!reg) {
            $(regInput).removeClass('error');
            return false;
        }
        let regExp;
        try {
            regExp = new RegExp('(' + reg + ')', flags);
            $(regInput).removeClass('error');
        } catch {
            $(regInput).addClass('error');
            return false;
        }
        return regExp;
    }

    // todo problem for tag <mark>, Coming Soon
    function printMarkedText(regExp) {
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
        return value ? $('<div />').text(value).html() : '';
    }
});