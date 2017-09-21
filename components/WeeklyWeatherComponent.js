(function () {
    const requests = CityRequestsService.getInstance();

    class WeeklyWeatherComponent {

        constructor(e, latlng) {
            this.parentElement = e;
            this.day = new Date();
            this.weathers = [];
            this.latlng = latlng;
            this.init();
            this.render();
        }


        init() {
            this.initElem = document.createElement('div');
            this.initElem.innerHTML = `	<div class="days-weather"></div>
									<div class="details"></div>	
								`;
            this.parentElement.appendChild(this.initElem);
        }

        render() {
            for (let i = 0; i < 7; i++) {
                this.weathers.push(new WeatherComponent(this.initElem.querySelector('.days-weather'), this.addDay(i).getTime(), this.latlng));
            }
            this.weathers.forEach(weather => {
                weather.initElem.addEventListener('click', e => this.onWeatherClick(e, weather));
            });

            this.weathers[0].onComplete.then(weather => this.selectDay(weather));

        }

        addDay(count) {
            const timestamp = this.day.getTime() + 24 * 3600 * 1000 * count;
            return new Date(timestamp);
        }

        remove() {
            this.initElem.parentElement.removeChild(this.initElem);
        }


        selectDay(w) {
            const elem = this.initElem.querySelector('.details');
            elem.innerHTML = '';
            new WeatherDetailsComponent(elem, w, this.latlng);
        }

        onWeatherClick(event, w) {
            this.selectDay(w);
        }
    }
    window.WeeklyWeatherComponent = WeeklyWeatherComponent;
})();
