import React from 'react'
import './WeatherDetailInfo.scss'
import { useWeatherContext } from '../../context/WeatherContext'
import { BsFillSunriseFill } from 'react-icons/bs'
import { BsFillSunsetFill } from 'react-icons/bs'
import { WiHumidity } from 'react-icons/wi'
import { MdVisibility } from 'react-icons/md'
import { TbWindmillFilled } from 'react-icons/tb'

import { convertVisibilityToKilometers } from '../../utils/stringUtils'

const WeatherDetailInfo = () => {
  const { currentWeather } = useWeatherContext()

  const renderHumidity = (date) => (
    <div className="weather-detail-item">
      <h3>Humidity</h3>
      <div>
        <p>
          {date.main.humidity} <span>%</span>
        </p>
        {<WiHumidity />}
      </div>
    </div>
  )

  const renderVisibility = (date) => (
    <div className="weather-detail-item">
      <h3>Visibility</h3>
      <div>
        <p>
          {convertVisibilityToKilometers(date.visibility)} <span>km</span>
        </p>
        {<MdVisibility />}
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
        <p className="weather-wind-deg">
          {date.wind.deg}
          <span>&deg;</span>{' '}
        </p>
        {<TbWindmillFilled />}
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
        {currentWeather && (
          <>
            {renderHumidity(currentWeather)}

            {renderVisibility(currentWeather)}

            {renderWind(currentWeather)}

            {renderSunrise(currentWeather)}
          </>
        )}
      </div>
    </div>
  )
}

export default WeatherDetailInfo
