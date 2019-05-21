$(function () {
    const HANDLER_PATH = 'handler.php';
    const chatBox = $('#chat-box');
    const messageInput = $('#message');
    const chatButton = $('#send-message');
    const logoutButton = $('#logout-button');
    const labelError = $('.error');
    const mainText = $('#main-text');

    const SMILE_GOOD = '<img class="smiles" src="img/good.png">';
    const SMILE_SAD = '<img class="smiles" src="img/sad.png">';

    const ANIMATE_TIME_WELCOME_MESSAGE = 300;
    const SHOW_TIME_WELCOME_MESSAGE = 2000;

    const TIME_INTERVAL_REQUEST = 1000;
    const MAX_MESSAGE_LENGTH = 255;

    let lastTime = 0;

    // animate main-text
    setTimeout(function() {
        mainText.animate({opacity: "0", marginLeft: "-=2000px"}, ANIMATE_TIME_WELCOME_MESSAGE , function() {
            mainText[0].innerText = "Easy Chat";
            console.log(mainText);
            mainText.animate({opacity: "1", marginLeft: "+=2000px"}, ANIMATE_TIME_WELCOME_MESSAGE);
        });
    }, SHOW_TIME_WELCOME_MESSAGE);

    function readMessages(callback = function(){}) {
        $.ajax({
            method: 'POST',
            url: HANDLER_PATH,
            dataType: 'json',
            data: {
                command: 'read',
                lastTime : lastTime
            }
        }).done(function(response) {
            if (response['data'] && !response['data']['login']) {
                location.reload();
                return;
            }
            if (response.length > 0) {
                const messages = response;
                if (messages.length > 0) {
                    appendMessages(messages);
                    chatBox[0].scrollTop = chatBox[0].scrollHeight
                }
            }
            if (labelError.text()) {
                labelError.text('');
            }

        }).always(function() {
            callback();
        }).fail(function() {
            if (labelError.text() === '') {
                labelError.text('Service is temporarily unavailable');
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
    logoutButton.on('click', function () {
        $.ajax({
            method: 'POST',
            url: HANDLER_PATH,
            data: { command: 'logout' }
        }).done(function() {
            //location.reload();
            location.href = ('index.php');
        })
    });

    // event button on click - send message
    chatButton.on('click', function () {
        if (messageInput.val().replace(/\s/g,'') === '') {
            messageInput.val('');
            return;
        }

        if (messageInput.val().length > MAX_MESSAGE_LENGTH) {
            alert('to long message, maximum ' + MAX_MESSAGE_LENGTH + ' symbols, delete please '
                + (messageInput.val().length - MAX_MESSAGE_LENGTH)  + ' symbols');
            return;
        }

        $.ajax({
            method: 'POST',
            url: HANDLER_PATH,
            dataType: 'json',
            data: {
                command: 'send',
                message: messageInput.val()
            }
        }).done(function(response) {
            if(response['isError']) {
                alert(response['data']['serverError']);
                return;
            }
            messageInput.val('');
            readMessages();
        });
    });

    function appendMessages(data) {
        let messages = '';

        for (let i = 0; i < data.length; i++) {
            // dropped duplicated messages
            if (data[i]['time'] <= lastTime) {
                continue;
            }
            let date = new Date(data[i]['time']);
            let time = date.getHours().toString().padStart(2, '0')
                + ':' + date.getMinutes().toString().padStart(2, '0')
                + ':' + date.getSeconds().toString().padStart(2, '0');
            // replace smiles
            data[i]['message'] = replacementSmiles(data[i]['message']);
            messages += `<div><div class="time">[${time}]</div><div class="user">${data[i]['user']}:</div><div class="message">${data[i]['message']}</div></div>`;

        }
        chatBox.append(messages);
        lastTime = +data[data.length - 1]['time'];
    }

    function replacementSmiles(message) {
        return message.replace(/:\)/g, SMILE_GOOD).replace(/:\(/g, SMILE_SAD);
    }
});