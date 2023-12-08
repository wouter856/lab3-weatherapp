export default class App {
    constructor() {
        console.log('Constructed!');
        this.getLocation();
    }

    getLocation() {
        navigator.geolocation.getCurrentPosition(
            this.showPosition.bind(this),
            this.showError()
        );
    }

    showPosition(position) {
        console.log(position);
        let x = position.coords.latitude;
        let y = position.coords.longitude;
        this.getWeather(x, y);
    }

    getWeather(x, y) {
        //api key url to ask for all data needed with x and y coordinates
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${x}&longitude=${y}&hourly=temperature_2m&current_weather=true&forecast_days=1`)
            .then(response => response.json())
            .then(data => {
                document.querySelector("h2").innerHTML = data.current_weather.temperature + "°C";
            })
            .catch(error => console.log(error));
    }

    showError(error) {
        console.log(error);
    }
}   