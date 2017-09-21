(function (WeatherRequestsService, CONFIG) {
    const requests = WeatherRequestsService.getInstance();
    class WeatherComponent {

        constructor(e, timestamp, latlng) {
            this.date = new Date(timestamp);
            this.latlng = latlng;

            this.parentElement = e;
            this.init();


            this.onComplete = this.getWeather(timestamp, latlng).then(weather => {
                this.details = Object.assign(weather);
                this.render(weather);
                return this;
            });
        }


        getWeather(timestamp, latLng) {
            const time = parseInt(timestamp / 1000);
            return requests.getDailyWeather(latLng, time)
                .then(weatherResp => {
                    let weather = {};
                    weather.temperatureMin = weatherResp.temperatureMin;
                    weather.temperatureMax = weatherResp.temperatureMax;
                    weather.windSpeed = weatherResp.windSpeed;
                    weather.humidity = weatherResp.humidity;
                    weather.summary = weatherResp.summary;
                    return weather;
                });
        }


        init() {
            this.initElem = document.createElement('ul');
            this.parentElement.appendChild(this.initElem);
        }

        render(weather) {
            const elem = document.createElement('div');
            elem.innerHTML = `
			<p class="daily-weather-item">
				<span>Max ${weather.temperatureMax}</span>
				<span>Min ${weather.temperatureMin}</span>
				<strong>${this.date.getDate()} / ${CONFIG.days[this.date.getDay()]}</strong>
				
			</p>
		`;
            this.initElem.appendChild(elem);

        }
    }

    window.WeatherComponent = WeatherComponent;
})(WeatherRequestsService, CONFIG);
