window.onload = function () {

    const HANDLER_PATH = 'handler.php';

    const MIN_LOGIN_LENGTH = 3;
    const MAX_LOGIN_LENGTH = 18;
    const MIN_PASSWORD_LENGTH = 3;
    const MAX_PASSWORD_LENGTH = 16;

    const INPUT_LOGIN = document.getElementById('login');
    const INPUT_PASSWORD = document.getElementById('password');
    const SUBMIT_BUTTON = document.getElementById('submit');
    const LOGIN_TEXT = document.getElementById('login-info');
    const PASSWORD_TEXT = document.getElementById('password-info');

    const VALID_LOGIN = /(^[a-zA-Z]+([a-zA-Z0-9][\s]?)*$)/;
    const VALID_PASSWORD = /(^[a-zA-Z0-9]+$)/;

    const INCORRECT_INPUT_MESSAGE = 'Incorrect input';
    const CLASS_NOT_VALID = 'not-valid';
    const CLASS_VALID = 'valid';

    let validLogin = false;
    let validPassword = false;

    INPUT_LOGIN.setAttribute('placeholder', `Enter your Login (${MIN_LOGIN_LENGTH} - ${MAX_LOGIN_LENGTH} symbols)`);
    INPUT_PASSWORD.setAttribute('placeholder', `Enter password (${MIN_PASSWORD_LENGTH} - ${MAX_PASSWORD_LENGTH} symbols)`);

    INPUT_LOGIN.oninput = function () {
        validLogin = validateInput(this, MIN_LOGIN_LENGTH, MAX_LOGIN_LENGTH, VALID_LOGIN);
    };

    INPUT_PASSWORD.oninput = function () {
        validPassword = validateInput(this, MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH, VALID_PASSWORD);
    };

    SUBMIT_BUTTON.onclick = function() {
        if(!validLogin) {
            LOGIN_TEXT.innerText = INCORRECT_INPUT_MESSAGE;
            INPUT_LOGIN.setAttribute('class', CLASS_NOT_VALID);
            return;
        } else {
            LOGIN_TEXT.innerText = "";
        }

        if(!validPassword) {
            PASSWORD_TEXT.innerText = INCORRECT_INPUT_MESSAGE;
            INPUT_PASSWORD.setAttribute('class', CLASS_NOT_VALID);
            return;
        } else {
            PASSWORD_TEXT.innerText = "";
        }

        const request = new XMLHttpRequest();
        request.open('POST', HANDLER_PATH);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        // check state request
        request.onreadystatechange = function () {
            if (request.readyState === 4 && request.status === 200) {
                if(request.response !== '0') {
                    INPUT_PASSWORD.setAttribute('class', CLASS_NOT_VALID);
                    PASSWORD_TEXT.innerText = request.response;
                } else {
                    INPUT_PASSWORD.setAttribute('class', CLASS_VALID);
                    PASSWORD_TEXT.innerText = '';
                    location.reload();
                }
            }
        };
        const body = 'login=' + encodeURIComponent(INPUT_LOGIN.value) +
            '&pass=' + encodeURIComponent(INPUT_PASSWORD.value);
        request.send(body);
    };

    // check inputs
    function validateInput(elementInput, minValue, maxValue, reg) {
        const validSymbols = (reg).test(elementInput.value);
        if (elementInput.value.length >= minValue && elementInput.value.length <= maxValue && validSymbols) {
            elementInput.setAttribute('class', CLASS_VALID);
            return true;
        }
        elementInput.setAttribute('class', CLASS_NOT_VALID);
        return false
    }
};