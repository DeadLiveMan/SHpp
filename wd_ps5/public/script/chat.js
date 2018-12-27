window.onload = function() {
    const HANDLER_PATH = 'handler.php';
    const CHAT_BOX = document.getElementById("chat-box");
    const MESSAGE_INPUT = document.getElementById('message');
    const CHAT_BUTTON = document.getElementById('send-message');
    const LOGOUT_BUTTON = document.getElementById('logout');
    let lastTimeMessage = 0;
    let changeFile = 0;

    // event button logout
    LOGOUT_BUTTON.onclick = function () {
        const request = new XMLHttpRequest();
        request.open('POST', HANDLER_PATH);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        // check state request
        request.onreadystatechange = function () {
            if (request.readyState === 4 && request.status === 200) {
                location.reload();
            }
        };
        const body = 'logout=1';
        request.send(body);
    };

    // event button on click
    CHAT_BUTTON.onclick = function () {
        if (MESSAGE_INPUT.value === '') {
            return;
        }
        const request = new XMLHttpRequest();
        request.open('POST', HANDLER_PATH);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        // check state request
        request.onreadystatechange = function () {
            if (request.readyState === 4 && request.status === 200) {
                readMessages(Number(lastTimeMessage));
            }
        };
        const body = 'message=' + encodeURIComponent(MESSAGE_INPUT.value);
        MESSAGE_INPUT.value = "";
        request.send(body);
    };

    function readMessages(lastTimeMessage = 0) {
        const request = new XMLHttpRequest();
        request.open('POST', HANDLER_PATH);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        // check state request
        request.onreadystatechange = function () {
            if (request.readyState === 4 && request.status === 200) {
                const messages = JSON.parse(request.response);
                appendMessages(messages);
                CHAT_BOX.scrollTop = CHAT_BOX.scrollHeight;
            }
        };
        const body = 'read=' + encodeURIComponent(lastTimeMessage.toString());
        request.send(body);
    }

    readMessages(lastTimeMessage);
    setInterval(function() {
        const request = new XMLHttpRequest();
        request.open('POST', HANDLER_PATH);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        // check state request
        request.onreadystatechange = function () {
            if (request.readyState === 4 && request.status === 200) {
                if (request.response) {
                    readMessages(lastTimeMessage);
                    changeFile = request.response;
                }
            }
        };
        const body = 'check=' + encodeURIComponent(lastTimeMessage.toString());
        request.send(body);
    }, 1000);

    function appendMessages(messages) {
        let elementMessage;
        for (let i = 0; i < messages.length; i++) {
            elementMessage = document.createElement("div");
            let date = new Date(messages[i][0]);
            let time = date.getHours().toString().padStart(2, "0")
                + ':' + date.getMinutes().toString().padStart(2, "0")
                + ':' + date.getSeconds().toString().padStart(2, "0");
            elementMessage.innerText = '[' + time + '] ' + messages[i][1] + ': ' + messages[i][2];
            CHAT_BOX.appendChild(elementMessage);
            lastTimeMessage = messages[i][0];
        }
    }
};