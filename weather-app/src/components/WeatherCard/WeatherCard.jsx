import React from 'react'
import './WeatherCard.scss'

const WeatherCard = ({ dt, temp_max, temp_min, icon, description }) => {
  const convertTimestampToDate = (timestamp) => {
    const date = new Date(timestamp * 1000)
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    return `${hours}:${minutes}`
  }

  return (
    <div className="weather-card-container">
      <h3>{convertTimestampToDate(dt)}</h3>
      <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={description}
      />
      <div className="weather-card-temperature">
        <h4>{temp_max.toFixed(0)}&deg;</h4>
        <h4>{temp_min.toFixed(0)}&deg;</h4>
      </div>
    </div>
  )
}

export default WeatherCard
