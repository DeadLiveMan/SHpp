class AjaxPOST {
    constructor(target) {
        this.target = target;
    }

    send(command, params, callback = function() {}) {
        const request = new XMLHttpRequest();
        request.open('POST', this.target);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        // check state request
        request.onreadystatechange = function () {
            if (request.readyState === 4 && request.status === 200) {
                callback(request.response);
            }
        };
        const body = 'command=' + command + '&' + params;
        request.send(body);
    }
}