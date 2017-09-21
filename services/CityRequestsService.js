(function (ServerConnector, CONFIG) {
    let instance = null;
    class Requests extends ServerConnector {
        constructor() {
            super();
            this.url = CONFIG.googlePlace;

        }

        static getInstance() {
            if (!instance) {
                instance = new Requests();
            }
            return instance;
        }

        getCityDetails(id) {
            return this.request({id: 'place/details/json?placeid=' + id + '&key=' + CONFIG.googleAPI_KEY}).then(
                result => {
                    return JSON.parse(result).result.geometry.location;
                }
            )
        }

        getCity(latlng) {
            return this.request({id: 'geocode/json?latlng=' + latlng + '&key=' + CONFIG.googleGEO_KEY}).then(result => {
                return JSON.parse(result).results[0].formatted_address;
            })
        }

        getAutoComplete(input) {
            return this.request({id: 'place/autocomplete/json?input=' + input + "&types=geocode&language=fr&key=" + CONFIG.googleAPI_KEY}).then(result => {
                //return only firs 5 predictions
                return JSON.parse(result).predictions.slice(0, 5);
            });
        }

    }


    window.CityRequestsService = Requests;
})(ServerConnector, CONFIG);
