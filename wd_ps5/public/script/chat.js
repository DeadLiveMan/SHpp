window.onload = function() {
    const HANDLER_PATH = 'handler.php';
    const CHAT_BOX = document.getElementById("chat-box");
    const MESSAGE_INPUT = document.getElementById('message');
    const CHAT_BUTTON = document.getElementById('send-message');
    const LOGOUT_BUTTON = document.getElementById('logout');

    const SMILE_GOOD = "<img class='smiles' src='img/good.png'>";
    const SMILE_SAD = "<img class='smiles' src='img/sad.png'>";

    let lastTimeMessage = 0;
    let changeFile = 0;

    const ajax = new AjaxPOST(HANDLER_PATH);

    // event button logout
    LOGOUT_BUTTON.onclick = function () {
        ajax.send('logout', null, function () {
            location.reload();
        });
    };

    // event button on click
    CHAT_BUTTON.onclick = function () {
        if (MESSAGE_INPUT.value === '') {
            return;
        }
        ajax.send('send', 'message=' + encodeURIComponent(MESSAGE_INPUT.value), function () {
            readMessages(Number(lastTimeMessage));
        });
        MESSAGE_INPUT.value = "";
    };

    function readMessages(lastTimeMessage = 0) {
        ajax.send('read', 'lastTime=' + encodeURIComponent(lastTimeMessage.toString()), function (response) {
            const messages = JSON.parse(response);
            if (messages.length > 0) {
                appendMessages(messages);
                CHAT_BOX.scrollTop = CHAT_BOX.scrollHeight
            }
        });
    }

    readMessages(lastTimeMessage);
    setInterval(function() {
        ajax.send('check', 'lastTime=' + encodeURIComponent(lastTimeMessage.toString()), function (response) {
            if (response) {
                readMessages(lastTimeMessage);
                changeFile = response;
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
            elementMessage.innerHTML = '[' + time + '] ' + messages[i][1] + ': ' + messages[i][2];
            CHAT_BOX.appendChild(elementMessage);
            lastTimeMessage = messages[i][0];
        }
    }

    function replacementSmiles(message) {
        message = message.replace(/:\)/g, SMILE_GOOD);
        message = message.replace(/:\(/g, SMILE_SAD);
        return message;
    }
};