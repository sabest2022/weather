import React from 'react'
import './WeatherCard.scss'

const WeatherCard = ({ dt, temp_max, temp_min, icon, description }) => {
  const convertTimestampToDate = (timestamp) => {
    const date = new Date(timestamp * 1000)
    return date.toLocaleString()
  }

  return (
    <div>
      <h3>{convertTimestampToDate(dt)}</h3>
      <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={description}
      />
      <div>
        <h4>{temp_max}</h4>
        <h4>{temp_min}</h4>
      </div>
    </div>
  )
}

export default WeatherCard
