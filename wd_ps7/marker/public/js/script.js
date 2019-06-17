$(function () {

    const textArea = $('#text-area');
    const regInput = $('#input-reg');
    const outputDiv = $('#output-text');

    const flagsInfo = $('#flags-info h2');
    const button = $('#btn');
    const flagReg = $('.flag-reg');
    const interactiveCheckBox = $('.interactive-checkbox');

    const ERROR_CLASS = 'error';

    const mark = {
        open: '<mark>',
        close: '</mark>',
        openKostil: 'markKostilOpen',
        closeKostil: 'markKostilClose'
    };
    let flags;
    let interactiveMode = interactiveCheckBox.checked;

    interactiveCheckBox.on('click', function () {
        interactiveMode = interactiveCheckBox[0].checked;
        if(interactiveMode) {
            regExpHandler();
        }
    });

    /* event for regExp flags (click checkbox)*/
    flagReg.on('click', function () {
        flags = '';
        flagReg.each(function () {
            flags += this.checked ? this.value : '';
            flagsInfo[0].innerText = '/' + flags + '/';
        });
        if(interactiveMode) {
            regExpHandler();
        }
    });

    /* event for input in textArea */
    textArea.on('input', function () {
        if(interactiveMode) {
            regExpHandler();
        }
    });

    /* event for input regExp */
    regInput.on('input', function () {
        if(interactiveMode) {
            regExpHandler();
        }
    });

    /* event for click button "Check" */
    button.on('click', function (e) {
        e.preventDefault();
        regExpHandler();
    });

    function regExpHandler() {
        const regExp = isCorrectReg(regInput.val());
        regExp ? printMarkedText(regExp) : printMarkedText('');
    }

    /* if regExp not correct, return false, else create and return regExp object */
    function isCorrectReg(reg) {
        if (!reg) {
            regInput.removeClass(ERROR_CLASS);
            return false;
        }
        let regExp;
        try {
            regExp = new RegExp('(' + reg + ')', flags);
            regInput.removeClass(ERROR_CLASS);
        } catch {
            regInput.addClass(ERROR_CLASS);
            return false;
        }
        return regExp;
    }

    // todo problem for tag <mark>, Coming Soon
    function printMarkedText(reg) {
        const text = textArea.val();

        let markedText = text.replace(reg, function (findElement) {
            return mark.openKostil + findElement + mark.closeKostil;
        });

        let result = htmlEncode(markedText);

        reg = new RegExp(mark.openKostil, "g");
        result = result.replace(reg, mark.open);

        reg = new RegExp(mark.closeKostil, "g");
        result = result.replace(reg, mark.close);

        $(outputDiv).html(result);
    }

    function htmlEncode(value) {
        return value ? $('<div />').text(value).html() : '';
    }
});