$(function () {

    const HANDLER_PATH = 'handler.php';

    const MIN_LOGIN_LENGTH = 3;
    const MAX_LOGIN_LENGTH = 18;
    const MIN_PASSWORD_LENGTH = 3;
    const MAX_PASSWORD_LENGTH = 16;

    const INPUT_LOGIN = $('#login');
    const INPUT_PASSWORD = $('#password');
    const SUBMIT_BUTTON = $('#submit');
    const LOGIN_TEXT = $('#login-info');
    const PASSWORD_TEXT = $('#password-info');

    const VALID_LOGIN = /(^[a-zA-Z]+([a-zA-Z0-9][\s]?)*$)/;
    const VALID_PASSWORD = /(^[a-zA-Z0-9]+$)/;

    const COMMAND_AUTHORIZED = 'auth';

    const CLASS_NOT_VALID = 'not-valid';
    const CLASS_VALID = 'valid';

    let passwordErrorMessage = 'empty password';
    let loginErrorMessage = 'empty login';

    INPUT_LOGIN.attr('placeholder', `${MIN_LOGIN_LENGTH} - ${MAX_LOGIN_LENGTH} symbols`);
    INPUT_PASSWORD.attr('placeholder', `${MIN_PASSWORD_LENGTH} - ${MAX_PASSWORD_LENGTH} symbols`);

    INPUT_LOGIN.on('input', function () {
        loginErrorMessage = checkInputError(this, MIN_LOGIN_LENGTH, MAX_LOGIN_LENGTH, VALID_LOGIN);
    });

    INPUT_PASSWORD.on('input', function () {
        passwordErrorMessage = checkInputError(this, MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH, VALID_PASSWORD);
    });

    SUBMIT_BUTTON.on('click', function() {
        LOGIN_TEXT.text('');
        PASSWORD_TEXT.text('');

        if(loginErrorMessage) {
            LOGIN_TEXT.text(loginErrorMessage);
        }

        if(passwordErrorMessage) {
            PASSWORD_TEXT.text(passwordErrorMessage);
        }

        if (loginErrorMessage || passwordErrorMessage) {
            return;
        }

        $.ajax({
            method: 'POST',
            url: HANDLER_PATH,
            data: {
                command: COMMAND_AUTHORIZED,
                login: INPUT_LOGIN.val(),
                pass: INPUT_PASSWORD.val()
            }
        }).done(function (response) {
            if (response === null) {
                location.reload();
            }
            response = JSON.parse(response);
            if(!response['isError']) {
                INPUT_PASSWORD.attr('class', CLASS_VALID);
                PASSWORD_TEXT.text('');
                location.reload();
            } else {
                if (response['data'] && response['data']['login']) {
                    INPUT_LOGIN.attr('class', CLASS_NOT_VALID);
                    LOGIN_TEXT.text(response['data']['login']);
                }
                if (response['data'] && response['data']['pass']) {
                    INPUT_PASSWORD.attr('class', CLASS_NOT_VALID);
                    PASSWORD_TEXT.text(response['data']['pass']);
                }
            }
        }).fail(function() {
            alert('Service is temporarily unavailable');
        });
    });

    function checkInputError(elementInput, minValue, maxValue, reg) {

        if (elementInput.value.length < minValue || elementInput.value.length > maxValue) {
            elementInput.setAttribute('class', CLASS_NOT_VALID);
            return 'length must be: ' + minValue + ' - ' + maxValue + ' symbols';
        }
        if (!reg.test(elementInput.value)) {
            elementInput.setAttribute('class', CLASS_NOT_VALID);
            return 'only latin and numbers' + ((reg === VALID_LOGIN) ? ', first symbol must be letter' : '');
        }
        elementInput.setAttribute('class', CLASS_VALID);
        return false;
    }
});