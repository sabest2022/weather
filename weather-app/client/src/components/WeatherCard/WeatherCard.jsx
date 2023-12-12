import React from 'react'
import './WeatherCard.scss'
import { convertTimestampToDate } from '../../utils/formatDate'

const WeatherCard = ({ dt, temp, feels_like, icon, description }) => {
  return (
    <div className="weather-card-container">
      <h3>{convertTimestampToDate(dt)}</h3>
      <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={description}
      />
      <div className="weather-card-temperature">
        <h4>{temp.toFixed(0)}&deg;</h4>
        <h4>{feels_like.toFixed(0)}&deg;</h4>
      </div>
    </div>
  )
}

export default WeatherCard
