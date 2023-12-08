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
        let search = "";
        //api key url to ask for all data needed with x and y coordinates
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${x}&longitude=${y}&hourly=temperature_2m&current_weather=true&forecast_days=1`)
            .then(response => response.json())
            .then(data => {
                document.querySelector("h1").innerHTML = "It's " + data.current_weather.temperature + "°C outside!";
                console.log(data);

                //if temperature is higher than 20 degrees, background is sunny
                if (data.current_weather.temperature > 20) {
                    document.getElementById("app").classList.add("sunny");
                    document.querySelector("h2").innerHTML = "Get a cocktail 🍸";
                    document.querySelector("h1").style.color = "yellow";
                    document.querySelector("h2").style.color = "yellow";
                    search = "very good sunny weather at the beach";
                }
                //if temperature is lower than 20 degrees, background is cloudy
                else if (0 < data.current_weather.temperature < 20) {
                    document.getElementById("app").classList.add("cloudy");
                    document.querySelector("h2").innerHTML = "Not too bad 🤗";
                    document.querySelector("h1").style.color = "grey";
                    document.querySelector("h2").style.color = "grey";
                    search = "very cloudy sky gray rain";
                }
                //if temperature is lower than 0 degrees, background is snowy
                else if (data.current_weather.temperature < 0) {
                    document.getElementById("app").classList.add("snowy");
                    document.querySelector("h2").innerHTML = "Brrrrr ❄️";
                    document.querySelector("h1").style.color = "snow";
                    document.querySelector("h2").style.color = "snow";
                    search = "snowy day with snowflakes";
                }
            })
            .catch(error => this.showError(error));

        this.getWeatherImage(search);
    }

    async getWeatherImage(search) {
        const acces_key = "OHmlj3Eru9_Ou6azg6NWQqufWmRi7ZQrvk_EqfMyhVk";
        const acces_secret = "2XIymbl14JisKfUny7yvhYbf9vtHaj0esb6EF8GB580";
    
        const response = await fetch(`https://api.unsplash.com/photos/random?query=${search}&client_id=${acces_key}&client_secret=${acces_secret}`);
        const data = await response.json();
        console.log(data);
        document.getElementById("screen").style.backgroundImage = `url(${data.urls.regular})`;
    };

    showError(error) {
        console.log(error);
    }
}   