(function () {

    class ServerConnector {
        constructor() {
            this.url = "";
        }

        request(req) {

            const path = req.id ? this.url + "/" + req.id : this.url;
            const options = {
                method: req.method || 'GET',
            };

            const promise = new Promise(function (resolve, reject) {
                const xhr = new XMLHttpRequest();
                xhr.open(options.method, path);
                xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
                xhr.onload = function () {
                    if (this.status >= 200 && this.status < 300) {
                        resolve(xhr.response);
                    } else {
                        reject({
                            status: this.status,
                            statusText: xhr.statusText
                        });
                    }
                };
                xhr.send();
            });
            return promise;
        }

    }

    window.ServerConnector = ServerConnector;
})();
