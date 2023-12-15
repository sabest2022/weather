import React from 'react'
import './WeatherDetailInfo.scss'
import { useWeatherContext } from '../../context/WeatherContext'
import humidity_pic from '../../assets/humidity_pic.png'
import windy_pic from '../../assets/windy_pic.png'
import visibility_pic from '../../assets/visibility_pic.png'
import solup from '../../assets/solup_pic.png'
import solned from '../../assets/solned_pic.png'
import { BsFillSunriseFill } from 'react-icons/bs'
import { BsFillSunsetFill } from 'react-icons/bs'

const WeatherDetailInfo = () => {
  const { todayWeather, currentWeather } = useWeatherContext()

  const renderHumidity = (date) => (
    <div className="weather-detail-item">
      <h3>Humidity</h3>
      <div>
        <p>
          {date.main.humidity} <span>%</span>
        </p>
        {/* <img src={humidity_pic} alt={date.weather[0].description} /> */}
      </div>
    </div>
  )

  const renderVisibility = (date) => (
    <div className="weather-detail-item">
      <h3>Visibility</h3>
      <div>
        <p>
          {date.visibility} <span>km</span>
        </p>
        {/* <img src={visibility_pic} alt={date.weather[0].description} /> */}
      </div>
    </div>
  )

  const renderWind = (date) => (
    <div className="weather-detail-item">
      <h3>Wind Status</h3>
      <div>
        <p>
          {date.wind.speed} <span>km/h</span>
        </p>
        <p>
          {date.wind.deg} <span>&deg;</span>{' '}
        </p>
        {/* <img src={windy_pic} alt={date.weather[0].description} /> */}
      </div>
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
        <h3>Sunrise & Sunset</h3>
        <div>
          <div className="sunrise-sundown">
            <BsFillSunriseFill />
            <p>{sunriseTime}</p>
          </div>
          <div className="sunrise-sundown">
            <BsFillSunsetFill />
            <p>{sunsetTime}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="weather-detail-container">
      <h2>Today's Highlights</h2>
      <div>
        {todayWeather.length > 0 && (
          <>
            {renderHumidity(todayWeather[0])}

            {renderVisibility(todayWeather[0])}

            {renderWind(todayWeather[0])}

            {renderSunrise(currentWeather[0])}
          </>
        )}
      </div>
    </div>
  )
}

export default WeatherDetailInfo
