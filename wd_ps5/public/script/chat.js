window.onload = function() {
    const HANDLER_PATH = 'handler.php';
    const CHAT_BOX = $('#chat-box');
    const MESSAGE_INPUT = $('#message');
    const CHAT_BUTTON = $('#send-message');
    const LOGOUT_BUTTON = $('#logout-button');
    const labelError = $('.error')[0];

    const SMILE_GOOD = '<img class="smiles" src="img/good.png">';
    const SMILE_SAD = '<img class="smiles" src="img/sad.png">';

    const TIME_INTERVAL_REQUEST = 1000;
    const MAX_MESSAGE_LENGTH = 255;

    let lastTime = 0;

    function readMessages(callback = function(){}) {
        $.ajax({
            method: 'POST',
            url: HANDLER_PATH,
            data: {
                command: 'read',
                lastTime : lastTime
            }
        }).done(function(response) {
            if (JSON.parse(response)['data'] && !JSON.parse(response)['data']['login']) {
                location.reload();
                return;
            }
            if (response.length > 0) {
                const messages = JSON.parse(response);
                if (messages.length > 0) {
                    appendMessages(messages);
                    CHAT_BOX[0].scrollTop = CHAT_BOX[0].scrollHeight
                }
            }
            if (labelError.innerText) {
                labelError.innerText = '';
            }

        }).always(function() {
            callback();
        }).fail(function() {
            if (labelError.innerText === '') {
                labelError.innerText = 'Service is temporarily unavailable';
            }
        });
    }

    const intervalRequest = function interval() {
        setTimeout(function () {
            readMessages(intervalRequest);
        }, TIME_INTERVAL_REQUEST);
    };

    // first run for recursion
    intervalRequest();

    // event button logout
    LOGOUT_BUTTON.on('click', function () {
        $.ajax({
            method: 'POST',
            url: HANDLER_PATH,
            data: { command: 'logout' }
        }).done(function() {
            location.reload();
        })
    });

    // event button on click - send message
    CHAT_BUTTON.on('click', function () {
        if (MESSAGE_INPUT[0].value.replace(/\s/g,'') === '') {
            MESSAGE_INPUT[0].value = '';
            return;
        }

        if (MESSAGE_INPUT[0].value.length > MAX_MESSAGE_LENGTH) {
            alert('to long message, maximum ' + MAX_MESSAGE_LENGTH + ' symbols, delete please '
                + (MESSAGE_INPUT[0].value.length - MAX_MESSAGE_LENGTH)  + ' symbols');
            return;
        }

        $.ajax({
            method: 'POST',
            url: HANDLER_PATH,
            data: {
                command: 'send',
                message: MESSAGE_INPUT[0].value
            }
        }).done(function() {
            MESSAGE_INPUT[0].value = '';
            readMessages();
        });
    });

    function appendMessages(data) {
        let elementMessage;
        for (let i = 0; i < data.length; i++) {
            // dropped duplicated messages
            if (data[i]['time'] <= lastTime) {
                continue;
            }
            elementMessage = document.createElement('div');
            let date = new Date(data[i]['time']);
            let time = date.getHours().toString().padStart(2, '0')
                + ':' + date.getMinutes().toString().padStart(2, '0')
                + ':' + date.getSeconds().toString().padStart(2, '0');
            // replace smiles
            data[i]['message'] = replacementSmiles(data[i]['message']);
            elementMessage.innerHTML =
                `<div class="time">[${time}]</div><div class="user">${data[i]['user']}:</div><div class="message">${data[i]['message']}</div>`;
            CHAT_BOX.append(elementMessage);
        }
        lastTime = +data[data.length - 1]['time'];
    }

    function replacementSmiles(message) {
        return message.replace(/:\)/g, SMILE_GOOD).replace(/:\(/g, SMILE_SAD);
    }
};