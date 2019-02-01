class AjaxPOST {
    constructor(target) {
        this.target = target;
    }
    send(params = [], callback = function() {}) {
        const request = new XMLHttpRequest();
        request.open('POST', this.target);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        // check state request
        request.onreadystatechange = function () {
            if (request.readyState === 4 && request.status === 200) {
                callback(request.response);
            }
        };

        let body = '';
        for (let key in params) {
            body += key + '=' + params[key] + '&';
        }
        body = body.slice(0, -1);
        request.send(body);
    }
}