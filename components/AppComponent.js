(function () {
    //const requests = CityRequestsService.getInstance();
    class AppComponent {
        constructor(e) {
            this.parentElement = e;
            this.latlng = '40.181579899999996,44.5224747';
            navigator.geolocation.getCurrentPosition(position => {
                this.latlng = position.coords.latitude + ',' + position.coords.longitude;
                this.init();
                this.render();
            }, _ => {
                this.init();
                this.render();
            });

        }

        selectCity(latlng) {
            this.weather && this.weather.remove();
            this.weather = new WeeklyWeatherComponent(this.initElem.querySelector('.weather'), latlng);
        }

        init() {
            this.initElem = document.createElement('div');
            this.initElem.className = 'main';
            this.initElem.id = 'app';
            this.initElem.innerHTML = `
                    <div>
                        <div class="city">City</div>
                        <div class="weather"></div>
                    </div>
            `;


            this.parentElement.appendChild(this.initElem);
        }

        emit(latlng) {
            this.selectCity(latlng);
        }


        render() {
            this.selectCity(this.latlng);
            const city = this.initElem.querySelector('.city');
            this.city = new CityComponent(city, {emit: this.emit.bind(this)});
        }
    }
    window.AppComponent = AppComponent;
})();
