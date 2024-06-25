import React from "react";
function getWeatherIcon(wmoCode) {
  const icons = new Map([
    [[0], "☀️"],
    [[1], "🌤"],
    [[2], "⛅️"],
    [[3], "☁️"],
    [[45, 48], "🌫"],
    [[51, 56, 61, 66, 80], "🌦"],
    [[53, 55, 63, 65, 57, 67, 81, 82], "🌧"],
    [[71, 73, 75, 77, 85, 86], "🌨"],
    [[95], "🌩"],
    [[96, 99], "⛈"],
  ]);
  const arr = [...icons.keys()].find((key) => key.includes(wmoCode));
  if (!arr) return "NOT FOUND";
  return icons.get(arr);
}

function convertToFlag(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function formatDay(dateStr) {
  return new Intl.DateTimeFormat("en", {
    weekday: "short",
  }).format(new Date(dateStr));
}

async function getWeather(location) {}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "lisbon",
      isLoading: false,
      displayLocation: "",
      weather: {},
    };
    this.fetchWeather = this.fetchWeather.bind(this);
  }
  async fetchWeather() {
    try {
      this.setState({ isLoading: true });
      // 1) Getting location (geocoding)
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${this.state.location}`
      );
      const geoData = await geoRes.json();
      // console.log(geoData);

      if (!geoData.results) throw new Error("Location not found");

      const { latitude, longitude, timezone, name, country_code } =
        geoData.results.at(0);
      this.setState({
        displayLocation: `${name} ${convertToFlag(country_code)}`,
      });

      // 2) Getting actual weather
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
      );
      const weatherData = await weatherRes.json();
      this.setState({ weather: weatherData.daily });
    } catch (err) {
      console.err(err);
    } finally {
      this.setState({ isLoading: false });
    }
  }
  render() {
    return (
      <div className="app">
        <h1>老式React天气查询</h1>
        <div>
          <input
            type="text"
            placeholder="请输入地区..."
            value={this.state.location}
            onChange={(e) => this.setState({ location: e.target.value })}
          />
        </div>
        <button onClick={this.fetchWeather}>查询</button>
        {this.state.isLoading && <p className="loader">加载中... </p>}
        {this.state.weather.weathercode && (
          <Weather
            weather={this.state.weather}
            displayLocation={this.state.displayLocation}
          />
        )}
      </div>
    );
  }
}
export default App;
class Weather extends React.Component {
  render() {
    console.log(this.props);
    const {
      temperature_2m_max: maxTems,
      temperature_2m_min: minTems,
      time: days,
      weathercode: codes,
    } = this.props.weather;
    return (
      <div>
        <h2>weather {this.props.displayLocation}</h2>
        <ul className="weather">
          {days.map((dv, i) => (
            <Day
              day={dv}
              maxTem={maxTems[i]}
              minTem={minTems[i]}
              code={codes[i]}
              isToday={i === 0}
              key={dv}
            />
          ))}
        </ul>
      </div>
    );
  }
}
class Day extends React.Component {
  render() {
    const { maxTem, minTem, day, code, isToday } = this.props;
    // console.log(this.props);
    return (
      <li className="day">
        <span>{getWeatherIcon(code)}</span>
        <p>{isToday ? "Today" : formatDay(day)}</p>
        <p>
          {minTem} &deg; &mdash; {maxTem}&deg;
        </p>
      </li>
    );
  }
}
