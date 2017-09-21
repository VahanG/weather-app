(function (ServerConnector, CONFIG) {

    let instance = null;
    class Requests extends ServerConnector {
        constructor() {
            super();
            this.url = CONFIG.weatherAPI
        }

        static getInstance() {
            if (!instance) {
                instance = new Requests();
            }
            return instance;
        }


        getDailyWeather(latlng, timestamp) {
            return this.request({id: '' + latlng + ',' + timestamp}).then(
                (result) => {
                    return JSON.parse(result).daily.data[0];
                }
            )
        }

    }

    window.WeatherRequestsService = Requests;
})(ServerConnector, CONFIG);
