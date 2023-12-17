import React from 'react'
import './Sidebar.scss'
import { IoSearch } from 'react-icons/io5'

import Loader from '../Loader/Loader'
import { useWeatherContext } from '../../context/WeatherContext'
import { convertTimestampToDayAndTime } from '../../utils/formatDate'
import { capitalizeWords } from '../../utils/stringUtils'
import { useUserContext } from '../../context/UserContext'

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
    temperatureUnit,
  } = useWeatherContext()

  const { isSignedIn, currentUser } = useUserContext()

  const handleInputChange = (event) => {
    setCityInput(event.target.value)
  }

  const handleSearchClick = () => {
    setCity(cityInput)
  }

  return (
    <aside>
      <div className="container">
        {isSignedIn && (
          <div className="top-bar">
            <IoSearch
              onClick={() => currentUser?.balance > 0 && handleSearchClick()}
            />
            <input
              type="text"
              className="city-input"
              placeholder="Search for places..."
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  currentUser?.balance > 0 && handleSearchClick()
                }
              }}
            />
          </div>
        )}

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
              {currentWeather.main?.temp.toFixed(0)}
              <span>&deg;{temperatureUnit === 'Metric' ? 'C' : 'F'}</span>
            </div>
            <div className="weather-location">{currentWeather.name}</div>
            <h2 className="weather-date">
              {convertTimestampToDayAndTime(currentWeather.dt)}
            </h2>
            <h2 className="weather-description">
              {capitalizeWords(currentWeather.weather?.[0]?.description)}
            </h2>
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
