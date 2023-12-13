import React from 'react'
import './WeatherDetailInfo.scss'
import { useWeatherContext } from '../../context/WeatherContext'
import humidity_pic from '../../assets/humidity_pic.png'

const WeatherDetailInfo = () => {
  const { todayWeather, currentWeather } = useWeatherContext()

  const renderHumidity = (date) => (
    <div className="weather-detail-item">
      <h3>Humidity: {date.main.humidity}%</h3>
      <img src={humidity_pic} alt={date.weather[0].description} />
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
      <h3>Deg: {date.wind.deg}</h3>
      <img
        src={`https://openweathermap.org/img/wn/${date.weather[0].icon}@2x.png`}
        alt={date.weather[0].description}
      />
    </div>
  )

  const renderSunrise = () => {
    const sunriseTime = currentWeather.sys?.sunrise
      ? new Date(currentWeather.sys.sunrise * 1000).toLocaleTimeString()
      : 'N/A'

    const sunsetTime = currentWeather.sys?.sunset
      ? new Date(currentWeather.sys.sunset * 1000).toLocaleTimeString()
      : 'N/A'

    return (
      <div className="weather-detail-item">
        <h2>Sunrise & Sunset</h2>
        <h3>Sunrise: {sunriseTime}</h3>
        <h3>Sunset: {sunsetTime}</h3>
        <img
          src={`https://openweathermap.org/img/wn/${currentWeather.weather[0]?.icon}@2x.png`}
          alt={currentWeather.weather[0]?.description}
        />
      </div>
    )
  }

  return (
    <div className="weather-detail-container">
      {todayWeather.length > 0 && (
        <>
          <div className="detail-card">{renderHumidity(todayWeather[0])}</div>
          <div className="detail-card">{renderVisibility(todayWeather[0])}</div>
          <div className="detail-card">{renderWind(todayWeather[0])}</div>
          <div className="detail-card">{renderSunrise(currentWeather[0])}</div>
        </>
      )}
    </div>
  )
}

export default WeatherDetailInfo
