import React, { useState } from 'react'
import './Sidebar.scss'

import frost_pic from '../../assets/Frost_weather.png'
import snow_pic from '../../assets/Snow_weather.png'
import sunny_pic from '../../assets/Sunny_weather.png'
import search_icon from '../../assets/Search_icon.png'
import windy_pic from '../../assets/windy_pic.png'
import humidity_pic from '../../assets/humidity_pic.png'

const Sidebar = () => {
  let api_key = '0e27dfb9c6082f5b89f8745c47d36ccb'

  const [wicon, setWicon] = useState(snow_pic)

  const search = async () => {
    const element = document.getElementsByClassName('city-input')
    if (element[0].value === '') {
      return 0
    }

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`

    let response = await fetch(url)
    let data = await response.json()

    const humidity = document.getElementsByClassName('humidity-percent')
    const wind = document.getElementsByClassName('wind-rate')
    const temperture = document.getElementsByClassName('weather-temp')
    const cityLocation = document.getElementsByClassName('weather-location')

    humidity[0].innerHTML = data.main.humidity + ' %'
    wind[0].innerHTML = data.wind.speed + ' km/h'
    temperture[0].innerHTML = data.main.temp.toFixed(1) + 'c'
    cityLocation[0].innerHTML = data.name
  }

  return (
    <aside>
      <div className="container">
        WeatherDetailInfo
        <div className="top-bar">
          <input type="text" className="city-input" placeholder="Search City" />
          <div className="search-icon" onClick={() => search()}>
            <img src={search_icon} alt="" />
          </div>
        </div>
        <div className="weather-image">
          <img src={sunny_pic} alt="" />
        </div>
        <div className="weather-temp">25&deg;C</div>
        <div className="weather-location">London</div>
        <div className="data-container">
          <div className="element">
            <img src={humidity_pic} alt="" className="icon" />
            <div className="data">
              <div className="humidity-percent">64%</div>
              <div className="text">Humidity</div>
            </div>
          </div>
          <div className="element">
            <img src={windy_pic} alt="" className="icon" />
            <div className="data">
              <div className="humidity-percent"></div>
              <div className="wind-rate">Wind speed</div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
