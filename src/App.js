export default class App {
    constructor() {
        console.log('Constructed!');
        this.getLocation();
    }

    getLocation() {
        navigator.geolocation.getCurrentPosition(
            this.showPosition.bind(this),
            this.showError.bind(this)
        );
    }

    showPosition(position) {
        console.log(position);
        let x = position.coords.latitude;
        let y = position.coords.longitude;
        this.getWeather(x, y);
    }

    getWeather(x, y) {
        let state = "";
        //api key url to ask for all data needed with x and y coordinates
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${x}&longitude=${y}&hourly=temperature_2m&current_weather=true&forecast_days=1`)
            .then(response => response.json())
            .then(data => {
                document.querySelector("h1").innerHTML = data.current_weather.temperature + "°C";
                console.log(data);

                //if temperature is higher than 20 degrees, background is sunny
                if (data.current_weather.temperature > 20) {
                    document.getElementById("app").classList.add("sunny");
                    state = "sunny sky";
                }
                //if temperature is lower than 20 degrees, background is cloudy
                else if (0 < data.current_weather.temperature < 20) {
                    document.getElementById("app").classList.add("cloudy");
                    state = "cloudy sky";
                }
                //if temperature is lower than 0 degrees, background is snowy
                else if (data.current_weather.temperature < 0) {
                    document.getElementById("app").classList.add("snowy");
                    state = "snowy landscape";
                }
            })
            .catch(error => this.showError(error));

        this.getWeatherImage(state);
    }

    async getWeatherImage(state) {
        const acces_key = "OHmlj3Eru9_Ou6azg6NWQqufWmRi7ZQrvk_EqfMyhVk";
        const acces_secret = "2XIymbl14JisKfUny7yvhYbf9vtHaj0esb6EF8GB580";
    
        const response = await fetch(`https://api.unsplash.com/photos/random?query=${state}&client_id=${acces_key}&client_secret=${acces_secret}`);
        const data = await response.json();
        console.log(data);
        document.getElementById("screen").style.backgroundImage = `url(${data.urls.regular})`;
    };

    showError(error) {
        console.log(error);
    }
}   