import React from 'react';
import './App.css';
import Weather from "./components/weather"
import 'bootstrap/dist/css/bootstrap.min.css';
import "weather-icons/css/weather-icons.css"
import Form from "./components/form"

const API_KEY = "54a329d1bcf2001a542b94c9c9ace8a2";


export default class App extends React.Component {
  state = {
    city: undefined,
    country: undefined,
    icon: undefined,
    main: undefined,
    temperature: undefined,
    temp_max: undefined,
    temp_min: undefined,
    description: "",
    error: false


  }
  weatherIcon = {
    Thunderstorm: "wi-thunderstorm",
    Drizzle: "wi-sleet",
    Rain: "wi-storm-showers",
    Snow: "wi-snow",
    Atmosphere: "wi-fog",
    Clear: "wi-day-sunny",
    Clouds: "wi-day-fog"
  };

  get_WeatherIcon(icons, rangeId) {
    switch (true) {
      case rangeId >= 200 && rangeId < 232:
        this.setState({ icon: icons.Thunderstorm });
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({ icon: icons.Drizzle });
        break;
      case rangeId >= 500 && rangeId <= 521:
        this.setState({ icon: icons.Rain });
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({ icon: icons.Snow });
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState({ icon: icons.Atmosphere });
        break;
      case rangeId === 800:
        this.setState({ icon: icons.Clear });
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({ icon: icons.Clouds });
        break;
      default:
        this.setState({ icon: icons.Clouds });
    }
  }

  // componentDidMount() {
  //   this.getWeather();

  // }

  tempRoundUp(temp) {
    let num = Math.round(temp)
    return num;
  }


  getWeather = async (e) => {
    e.preventDefault();

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    if(city && country){
      const weather_api_call = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${country} &appid=${API_KEY}&units=metric`);
      const res = await weather_api_call.json();
      console.log(res)
      console.log(res.weather[0].description)
      this.setState({
        city: `${res.name}, ${res.sys.country}`,
        temperature: this.tempRoundUp(res.main.temp),
        temp_max: this.tempRoundUp(res.main.temp_max),
        temp_min: this.tempRoundUp(res.main.temp_min),
        description: res.weather[0].description,
        error : false
      })
      this.get_WeatherIcon(this.weatherIcon, res.weather[0].id);
    }
    else{
      this.setState({error : true})
    }
  }



  render() {
    return (
      <div className="App">
        <Form 
        loadweather ={this.getWeather}
        error = {this.state.error}
        />
        <Weather
          city={this.state.city}
          country={this.state.country}
          temperature={this.state.temperature}
          temp_max={this.state.temp_max}
          temp_min={this.state.temp_min}
          description={this.state.description}
          weatherIcon={this.state.icon}
        />
      </div>
    )
  }
}




