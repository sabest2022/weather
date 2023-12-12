import React from 'react'
import './WeatherDetailInfo.scss'
import { useWeatherContext } from '../../context/WeatherContext'

const WeatherDetailInfo = () => {
  const { todayWeather } = useWeatherContext()

  const renderHumidity = (date) => (
    <div className="weather-detail-item">
      <h3>Humidity: {date.main.humidity}%</h3>
      <img
        src={`https://openweathermap.org/img/wn/${date.weather[0].icon}@2x.png`}
        alt={date.weather[0].description}
      />
    </div>
  )

  const renderVisibility = (date) => (
    <div className="weather-detail-item">
      <h3>Visibility: {date.visibility}</h3>
      <img
        src={`https://openweathermap.org/img/wn/${date.weather[0].icon}@2x.png`}
        alt={date.weather[0].description}
      />
    </div>
  )

  const renderWind = (date) => (
    <div className="weather-detail-item">
      <h3>Wind: {date.wind.speed}</h3>
      <img
        src={`https://openweathermap.org/img/wn/${date.weather[0].icon}@2x.png`}
        alt={date.weather[0].description}
      />
    </div>
  )

  const renderDescription = (date) => (
    <div className="weather-detail-item">
      <h3>{date.weather[0].description}</h3>
      <img
        src={`https://openweathermap.org/img/wn/${date.weather[0].icon}@2x.png`}
        alt={date.weather[0].description}
      />
    </div>
  )

  return (
    <div className="weather-detail-list">
      {todayWeather.length > 0 && (
        <>
          {renderHumidity(todayWeather[0])}
          {renderVisibility(todayWeather[0])}
          {renderWind(todayWeather[0])}
          {renderDescription(todayWeather[0])}
        </>
      )}
    </div>
  )
}

export default WeatherDetailInfo
