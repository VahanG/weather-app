(function (CityRequestsService) {
    const requests = CityRequestsService.getInstance();
    class CityComponent {
        constructor(e, parent) {
            this.parentElment = e;
            this.location = {};

            this.emit = parent.emit;
            this.init();
            this.render();
        }

        init() {
            this.initElem = document.createElement('div');
            this.initElem.innerHTML = `
                <div class="auto-complete">
                    <input id="cityInput">
                    <div id="predictions" class="dropdown-content">
                    </div>
                </div>`;
            const input = this.initElem.querySelector("#cityInput");
            const predictions = this.initElem.querySelector('#predictions');
            const self = this;
            input.onkeyup = function (event) {
                console.log(event.target);
                requests.getAutoComplete(event.target.value).then(res => {
                    predictions.style.display = 'initial';
                    predictions.innerHTML = "";
                    res.forEach(prediction => {
                        const elem = document.createElement('div');
                        elem.innerHTML = `<a class="city-description">${prediction.description}</a>`;
                        elem.querySelector('.city-description').addEventListener('click', self.selectCity.bind({
                            self,
                            prediction
                        }));
                        predictions.appendChild(elem);
                    })
                });
            };
            this.parentElment.appendChild(this.initElem);
        }

        selectCity() {
            this.self.initElem.querySelector('#cityInput').value = this.prediction.description;
            this.self.initElem.querySelector('#predictions').style.display = 'none';
            requests.getCityDetails(this.prediction.place_id).then(result => {
                const latlng = "" + result.lat + "," + result.lng;
                this.self.location = result;
                this.self.emit(latlng);
            })
        }

        render() {

        }
    }
    window.CityComponent = CityComponent;
})(CityRequestsService);
