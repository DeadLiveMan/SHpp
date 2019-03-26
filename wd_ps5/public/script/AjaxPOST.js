class AjaxPOST {
    constructor(target) {
        this.target = target;
    }
    send(params = [], callback = function() {}) {
        const request = new XMLHttpRequest();
        request.open('POST', this.target);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        // check state request
        request.onload = function () {
            (request.status === 200) ? callback(request.response) : callback('');
        };

        request.onerror = function() {
            callback('');
        };

        let body = '';
        for (let key in params) {
            body += key + '=' + params[key] + '&';
        }
        body = body.slice(0, -1);
        request.send(body);
    }
}