(function (CityRequestsService) {
    const requests = CityRequestsService.getInstance();
    class WeatherDetailsComponent {
        constructor(e, day, latlng) {
            this.parentElement = e;
            this.latlng = latlng;
            this.day = Object.assign({}, day);
            this.init();
            this.render();
        }

        init() {
            this.initElem = document.createElement('div');
            this.parentElement.appendChild(this.initElem);
        }

        remove() {
            this.initElem.parentElement.removeChild(this.initElem);
        }

        getCity() {
            requests.getCity(this.latlng).then(res => {
                this.city = res;
                this.initElem.querySelector(".city-name").innerHTML = res;
            })
        }

        render() {
            this.getCity();
            const detailsElem = document.createElement('div');
            detailsElem.innerHTML = `
            <div>
                <h1>Details for ${this.day.date.toString().substr(0, 10)} in <span class="city-name"></span></h1>
                <h2>${this.day.details.summary}</h2>
                <span><strong>Min Temp-</strong> ${this.day.details.temperatureMin}</span>
                <span><strong>Max Temp-</strong> ${this.day.details.temperatureMax}</span>
                <span><strong>Humidity-</strong> ${this.day.details.humidity}</span>
                <span><strong>windSpeed-</strong> ${this.day.details.windSpeed}</span>
            </div>
            
        `;
            this.initElem.appendChild(detailsElem);

        }
    }
    window.WeatherDetailsComponent = WeatherDetailsComponent;
})(CityRequestsService);
