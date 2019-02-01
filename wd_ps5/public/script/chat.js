window.onload = function() {
    const HANDLER_PATH = 'handler.php';
    const CHAT_BOX = document.getElementById("chat-box");
    const MESSAGE_INPUT = document.getElementById('message');
    const CHAT_BUTTON = document.getElementById('send-message');
    const LOGOUT_BUTTON = document.getElementById('logout-button');

    const SMILE_GOOD = "<img class='smiles' src='img/good.png'>";
    const SMILE_SAD = "<img class='smiles' src='img/sad.png'>";

    const COMMAND_LOGOUT = {"command":'logout'};
    const COMMAND_MESSAGE = {"command":'send'};
    const COMMAND_READ_MESSAGE = {"command": 'read'};
    const COMMAND_CHECK_MESSAGE = {"command": 'check'};

    let lastTimeMessage = 0;

    const ajax = new AjaxPOST(HANDLER_PATH);

    // event button logout
    LOGOUT_BUTTON.onclick = function () {
        ajax.send(COMMAND_LOGOUT, function () {
            location.reload();
        });
    };

    // event button on click
    CHAT_BUTTON.onclick = function () {
        if (MESSAGE_INPUT.value === '') {
            return;
        }
        COMMAND_MESSAGE['message'] = encodeURIComponent(MESSAGE_INPUT.value);
        ajax.send(COMMAND_MESSAGE);
        MESSAGE_INPUT.value = "";
        readMessages(lastTimeMessage);
    };

    function readMessages(lastTimeMessage = 0) {
        COMMAND_READ_MESSAGE['lastTime'] = encodeURIComponent(lastTimeMessage.toString());
        ajax.send(COMMAND_READ_MESSAGE, function (response) {
            const messages = JSON.parse(response);
            if (messages.length > 0) {
                appendMessages(messages);
                CHAT_BOX.scrollTop = CHAT_BOX.scrollHeight
            }
        });
    }

    readMessages(lastTimeMessage);
    setInterval(function() {
        COMMAND_CHECK_MESSAGE['lastTime'] = encodeURIComponent(lastTimeMessage.toString());
        ajax.send(COMMAND_CHECK_MESSAGE, function (response) {
            if (response === 'logout') {
                location.reload();
                return;
            }
            if (+response !== lastTimeMessage) {
                readMessages(lastTimeMessage);
            }
        })
    }, 1000);

    function appendMessages(messages) {
        let elementMessage;
        for (let i = 0; i < messages.length; i++) {
            elementMessage = document.createElement("div");
            let date = new Date(messages[i][0]);
            let time = date.getHours().toString().padStart(2, "0")
                + ':' + date.getMinutes().toString().padStart(2, "0")
                + ':' + date.getSeconds().toString().padStart(2, "0");
            // replace smiles
            messages[i][2] = replacementSmiles(messages[i][2]);
            elementMessage.innerHTML =
                `<div class="user">[${time}] ${messages[i][1]}:</div><div class="message">${messages[i][2]}</div>`;
            CHAT_BOX.appendChild(elementMessage);
            lastTimeMessage = +messages[i][0];
        }
    }

    function replacementSmiles(message) {
        return message.replace(/:\)/g, SMILE_GOOD).replace(/:\(/g, SMILE_SAD);
    }
};