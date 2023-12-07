import React from 'react'
import './WeatherDetailInfo.scss'

import frost_pic from '../../assets/Frost_weather.png'
import snow_pic from '../../assets/Snow_weather.png'
import sunny_pic from '../../assets/Sunny_weather.png'
import search_icon from '../../assets/Search_icon.png'

const WeatherDetailInfo = () => {
  return (
    <div className="container">
      WeatherDetailInfo
      <div className="top-bar">
        <input type="text" className="city-input" placeholder="Search City" />
        <div className="search-icon">
          <img src={search_icon} alt="" />
        </div>
      </div>
      <div className="weather-image">
        <img src={sunny_pic} alt="" />
      </div>
    </div>
  )
}

export default WeatherDetailInfo
