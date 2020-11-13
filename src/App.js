import React, { useState } from "react";
import "./App.css";
import axios from "axios";
export default function SearchEngine() {
  let [temperature, setTemperature] = useState("");
  let [forecast, setForecast] = useState("");
  let [wind, setWind] = useState("");
  let [humidity, setHumidity] = useState("");
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");
  function handleSubmit(event) {
    event.preventDefault();
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3a94f3778290bfeee61278505dbbe51d&units=metric`;
    axios.get(url).then(showTemperature);
    let urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=3a94f3778290bfeee61278505dbbe51d&units=metric`;
    axios.get(urlForecast).then(showForecast);
  }

  function showTemperature(response) {
    setMessage(response.data.name);
    setTemperature(`${Math.round(response.data.main.temp)}ºC`);
    setHumidity(response.data.main.humidity);
    setWind(response.data.wind.speed);
  }

  function showForecast(response) {
    setMessage(response.data.name);
    setForecast(response.data.main.forecast);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  return (
    <div>
      <div className="container mt-3">
        <div className="row mt-3">
          <form onSubmit={handleSubmit}>
            <input
              type="search"
              placeholder="Enter a city..."
              id="searchBar"
              onChange={updateCity}
            />
            <input type="submit" value="Search" className="btn" />
            <input type="submit" value="Current" className="btn" />
          </form>

          <div className="btn-group-vertical">
            <div className="col-2">
              <button id="celcius">C°</button>
              <button id="farenhiet">F°</button>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-3">
        <div className="row mt-3">
          <div className="col">
            <div className="row no-gutters">
              <div className="col-12">
                <div className="card-body">
                  <p id="city" className="card-text sunny">
                    {message} {temperature}
                  </p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card-body" id="te">
                  <p id="date-time">Date And Time: 3:20 pm on the 15th</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="col mb-3">
            <div className="card-body">
              <h2 className="its">It is...</h2>
              <p className="sunny">Sunny! Don't forget your sunscreen. ☀️</p>

              <h2 className="its" id="weather-description">
                Precipitation:
                <span id="humidity"> {humidity}</span>
                <br />
                Wind:
                <span id="wind"> {wind}</span>
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div className="row" id="forecast">
        <div className="col five">
          <div className="card-body">
            <h5 className="card-title">Tuesday</h5>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRqvhageIEMkDr9Ncz7gWMYsn8wnXmT8xjkuw&usqp=CAU"
              className="card-img-top"
              alt="weather"
            />
            <p className="card-text five">{forecast}</p>
          </div>
        </div>
        <div className="col five">
          <div className="card-body">
            <h5 className="card-title">Wednesday</h5>
            <img
              src="data:image/png;base64,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"
              className="card-img-top"
              alt="weather"
            />
            <p className="card-text five">{forecast}</p>
          </div>
          {/*  */}
        </div>
        <div className="col five">
          <div className="card-body">
            <h5 className="card-title">Thursday</h5>
            <div className="imgfive">
              <img
                src="data:image/png;base64,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"
                className="card-img-top"
                alt="weather"
              />
            </div>
            <p className="card-text five">{forecast}</p>
          </div>
        </div>
        <div className="col five">
          <div className="card-body">
            <h5 className="card-title">Friday</h5>
            <div className="imgfive">
              <img
                src="data:image/png;base64,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"
                className="card-img-top"
                alt="weather"
              />
            </div>
            <p className="card-text five">{forecast}</p>
          </div>
        </div>
        <div className="col five">
          <div className="card-body">
            <h5 className="card-title">Saturday</h5>
            <div className="imgfive">
              <img
                src="data:image/png;base64,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"
                className="card-img-top"
                alt="weather"
              />
            </div>
            <p className="card-text five">{forecast}</p>
          </div>
        </div>
      </div>
      <p id="github">
        <a href="https://github.com/tiyanamathew/">Link to GitHub</a>
      </p>
    </div>
  );
}
