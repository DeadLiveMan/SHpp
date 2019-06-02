window.onload = function () {

    const textArea = document.getElementById('text-area');
    const regInput = document.getElementById('input-reg');

    const outputDiv = document.getElementById('output-text');

    textArea.oninput = function () {
        checkReg(textArea.value, regInput.value);
    };

    regInput.oninput = function () {
        checkReg(textArea.value, regInput.value);
    };

    function checkReg(text, reg) {

        const regularExp = reg.substr(1, reg.lastIndexOf('/') - 1);
        const flags = reg.substr(reg.lastIndexOf('/') + 1);

        const regExp = new RegExp(regularExp, flags);


        // outputDiv.innerHTML = text.replace(regExp, function (findElement) {
        //     return '<mark>' + findElement + '</mark>';
        // });



    }


};