/* Validator*/

const regs = {
    ip : /^((([0-1]?\d?\d)|(2[0-5]{2}))\.){3}(([0-1]?\d?\d)|(2[0-5]{2}))$/,
    url : /^(http[s]?:\/\/)?(www\.)?(\w+\.)\w+(\.\w+)*((\/.*)?)*$/,
    email : /\w+(\.\w+)*@\w+(\.\w+)+/,
    date : /^((0[1-9])|(1[0-2]))\/((0[1-9])|([1-2][0-9])|(3[0-1]))\/[0-9]{4}$/,
    time : /^(([0-1][0-9])|(2[0-3]))(:([0-5][0-9])){2}$/
};

const inputs = document.getElementsByClassName('on-validation');

for (let i = 0; i < inputs.length; i++) {
    const validationInputName = inputs[i].classList[1];
    if(!validationInputName) {
        continue;
    }
    inputs[i].oninput = function () {
        changeInputStyle(this, isValid(regs[this.classList[1]], this.value));
    };
}

function isValid(reg, value) {
    return reg.test(value);
}

function changeInputStyle(element, isValid) {
    isValid ? element.classList.remove('incorrect') : element.classList.add('incorrect');
}
/**/