$(function () {

    const HANDLER_PATH = 'handler.php';

    const MIN_LOGIN_LENGTH = 3;
    const MAX_LOGIN_LENGTH = 18;
    const MIN_PASSWORD_LENGTH = 3;
    const MAX_PASSWORD_LENGTH = 16;

    const VALID_LOGIN = /(^[a-zA-Z]+([a-zA-Z0-9][\s]?)*$)/;
    const VALID_PASSWORD = /(^[a-zA-Z0-9]+$)/;

    const COMMAND_AUTHORIZED = 'auth';

    const CLASS_NOT_VALID = 'not-valid';
    const CLASS_VALID = 'valid';

    const inputLogin = $('#login');
    const inputPassword = $('#password');
    const btnLogin = $('#submit');
    const labelLoginError = $('#login-info');
    const labelPasswordError = $('#password-info');

    let passwordErrorMessage = 'empty password';
    let loginErrorMessage = 'empty login';

    inputLogin.attr('placeholder', `${MIN_LOGIN_LENGTH} - ${MAX_LOGIN_LENGTH} symbols`);
    inputPassword.attr('placeholder', `${MIN_PASSWORD_LENGTH} - ${MAX_PASSWORD_LENGTH} symbols`);

    inputLogin.on('input', function () {
        loginErrorMessage = checkInputError(this, MIN_LOGIN_LENGTH, MAX_LOGIN_LENGTH, VALID_LOGIN);
    });

    inputPassword.on('input', function () {
        passwordErrorMessage = checkInputError(this, MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH, VALID_PASSWORD);
    });

    btnLogin.on('click', function() {
        labelLoginError.text('');
        labelPasswordError.text('');

        if(loginErrorMessage) {
            labelLoginError.text(loginErrorMessage);
        }

        if(passwordErrorMessage) {
            labelPasswordError.text(passwordErrorMessage);
        }

        if (loginErrorMessage || passwordErrorMessage) {
            return;
        }

        $.ajax({
            method: 'POST',
            url: HANDLER_PATH,
            dataType: 'json',
            data: {
                command: COMMAND_AUTHORIZED,
                login: inputLogin.val(),
                pass: inputPassword.val()
            }
        }).done(function (response) {
            if (response === null ) {
                location.reload();
            }
            if(!response['isError']) {
                inputPassword.attr('class', CLASS_VALID);
                labelPasswordError.text('');
                location.reload();
            } else {
                if (response['data'] && response['data']['login']) {
                    inputLogin.attr('class', CLASS_NOT_VALID);
                    labelLoginError.text(response['data']['login']);
                }
                if (response['data'] && response['data']['pass']) {
                    inputPassword.attr('class', CLASS_NOT_VALID);
                    labelPasswordError.text(response['data']['pass']);
                }
            }
        }).fail(function() {
            alert('Service is temporarily unavailable');
        });
    });

    // check inputs, for password and login
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