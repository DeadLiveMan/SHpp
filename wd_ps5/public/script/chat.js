window.onload = function() {
    const HANDLER_PATH = 'handler.php';
    const CHAT_BOX = document.getElementById("chat-box");
    const MESSAGE_INPUT = document.getElementById('message');
    const CHAT_BUTTON = document.getElementById('send-message');
    const LOGOUT_BUTTON = document.getElementById('logout-button');

    const SMILE_GOOD = "<img class='smiles' src='img/good.png'>";
    const SMILE_SAD = "<img class='smiles' src='img/sad.png'>";

    const TIME_INTERVAL_REQUEST = 1000;

    let lastTime = 0;

    function readMessages(callback = function(){}) {
        $.ajax({
            method: "POST",
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
                    CHAT_BOX.scrollTop = CHAT_BOX.scrollHeight
                }
            }
        }).always(function() {callback()});
    }

    const intervalRequest = function interval() {
        setTimeout(function () {
            readMessages(intervalRequest);
        }, TIME_INTERVAL_REQUEST);
    };

    // first run for recursion
    intervalRequest();

    // event button logout
    LOGOUT_BUTTON.onclick = function () {
        $.ajax({
                method: "POST",
                url: HANDLER_PATH,
                data: { command: 'logout' }
            }).done(function() {
                location.reload();
            })
        };

    // event button on click - send message
    CHAT_BUTTON.onclick = function () {
        if (MESSAGE_INPUT.value.replace(/\s/g,'') === '') {
            MESSAGE_INPUT.value = "";
            return;
        }

        $.ajax({
            method: "POST",
            url: HANDLER_PATH,
            data: {
                command: 'send',
                message: MESSAGE_INPUT.value
            }
        }).done(function() {
            readMessages();
        });
        MESSAGE_INPUT.value = "";
    };

    function appendMessages(data) {
        let elementMessage;
        for (let i = 0; i < data.length; i++) {
            // dropped duplicated messages
            if (data[i]['time'] <= lastTime) {
                continue;
            }
            elementMessage = document.createElement("div");
            let date = new Date(data[i]['time']);
            let time = date.getHours().toString().padStart(2, "0")
                + ':' + date.getMinutes().toString().padStart(2, "0")
                + ':' + date.getSeconds().toString().padStart(2, "0");
            // replace smiles
            data[i]['message'] = replacementSmiles(data[i]['message']);
            elementMessage.innerHTML =
                `<div class="user">[${time}] ${data[i]['user']}:</div><div class="message">${data[i]['message']}</div>`;
            CHAT_BOX.appendChild(elementMessage);
        }
        lastTime = +data[data.length - 1]['time'];
    }

    function replacementSmiles(message) {
        return message.replace(/:\)/g, SMILE_GOOD).replace(/:\(/g, SMILE_SAD);
    }
};