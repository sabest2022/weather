import React, { useState, useEffect } from 'react'
import './Sidebar.scss'
import { IoSearch } from 'react-icons/io5'

import frost_pic from '../../assets/Frost_weather.png'
import snow_pic from '../../assets/Snow_weather.png'
import sunny_pic from '../../assets/Sunny_weather.png'
import windy_pic from '../../assets/windy_pic.png'
import humidity_pic from '../../assets/humidity_pic.png'

const Sidebar = () => {
  let api_key = '0e27dfb9c6082f5b89f8745c47d36ccb'

  const [searchCity, setSearchCity] = useState('London')
  const [city, setCity] = useState('')
  const [temperature, setTemperature] = useState('')
  const [humidity, setHumidity] = useState('')
  const [wind, setWind] = useState('')
  const [weatherIcon, setWeatherIcon] = useState('')

  const handleInputChange = (event) => {
    setSearchCity(event.target.value)
  }

  const search = async () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&units=Metric&appid=${api_key}`

    let response = await fetch(url)
    let data = await response.json()

    setCity(data.name)
    setTemperature(data.main.temp.toFixed(1))
    setHumidity(data.main.humidity)
    setWind(data.wind.speed)
    setWeatherIcon(data.weather[0].icon)
    console.log(data)
  }

  useEffect(() => {
    search()
  }, [])

  return (
    <aside>
      <div className="container">
        <div className="top-bar">
          <IoSearch onClick={() => search()} />
          <input
            type="text"
            className="city-input"
            placeholder="Search City"
            onChange={handleInputChange}
          />
        </div>
        <div className="weather-image">
          <img
            src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
            alt=""
          />
        </div>
        <div className="weather-temp">
          {temperature}
          <span>&deg;C</span>
        </div>
        <div className="weather-location">{city}</div>
        <div className="data-container">
          <div className="element">
            <img src={humidity_pic} alt="" className="icon" />
            <div className="data">
              <div className="humidity-percent">{humidity}%</div>
              <div className="text">Humidity</div>
            </div>
          </div>
          <div className="element">
            <img src={windy_pic} alt="" className="icon" />
            <div className="data">
              <div className="wind-rate">{wind}</div>
              <div className="text">Wind</div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
