import React, { useState, useEffect } from 'react'
import './Sidebar.scss'
import { IoSearch } from 'react-icons/io5'

import windy_pic from '../../assets/windy_pic.png'
import humidity_pic from '../../assets/humidity_pic.png'
import Loader from '../Loader/Loader'
import { useWeatherContext } from '../../context/WeatherContext'

const Sidebar = () => {
  const {
    currentWeather,
    isLoading,
    error,
    setCity,
    cityInput,
    setCityInput,
    cityImage,
    hasImage,
  } = useWeatherContext()

  const handleInputChange = (event) => {
    setCityInput(event.target.value)
  }

  const handleSearchClick = () => {
    setCity(cityInput)
  }

  return (
    <aside>
      <div className="container">
        <div className="top-bar">
          <IoSearch onClick={handleSearchClick} />
          <input
            type="text"
            className="city-input"
            placeholder="Search for places..."
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearchClick()
              }
            }}
          />
        </div>

        {!isLoading && !error ? (
          <div className="loading-container">
            <Loader />
          </div>
        ) : error ? (
          <div className="error-container">
            <h1>Theres no such city...</h1>
          </div>
        ) : (
          <div>
            <div className="weather-image">
              <img
                src={`https://openweathermap.org/img/wn/${currentWeather.weather?.[0]?.icon}@4x.png`}
                alt={currentWeather.weather?.[0]?.description}
              />
            </div>
            <div className="weather-temp">
              {currentWeather.main?.temp.toFixed(1)}
              <span>&deg;C</span>
            </div>
            <div className="weather-location">{currentWeather.name}</div>
            <div className="data-container">
              <div className="element">
                <img src={humidity_pic} alt="humidity" className="icon" />
                <div className="data">
                  <div className="humidity-percent">
                    {currentWeather.main?.humidity}%
                  </div>
                  <div className="text">Humidity</div>
                </div>
              </div>
              <div className="element">
                <img src={windy_pic} alt="wind" className="icon" />
                <div className="data">
                  <div className="wind-rate">
                    {currentWeather.wind?.speed} km/h
                  </div>
                  <div className="text">Wind</div>
                </div>
              </div>
            </div>
            {hasImage && (
              <div className="weather-city-image">
                <h2>{currentWeather.sys?.country}</h2>
                <img
                  src={cityImage.photos?.[0]?.image?.web}
                  alt={currentWeather.name}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  )
}

export default Sidebar
