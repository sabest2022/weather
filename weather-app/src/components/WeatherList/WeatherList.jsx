import { useEffect, useState } from 'react'
import './WeatherList.scss'
import WeatherCard from '../WeatherCard/WeatherCard'
import { useWeatherContext } from '../../context/WeatherContext'

const WeatherList = () => {
  const { todayWeather } = useWeatherContext()

  return (
    <>
      <div className="weather-selector">
        <h2>Today</h2>
        <h2>Week</h2>
      </div>
      <div className="weather-list">
        {todayWeather.map((day, index) => (
          <WeatherCard
            dt={day.dt}
            icon={day.weather[0].icon}
            description={day.weather[0].description}
            temp_max={day.main.temp_max}
            temp_min={day.main.temp_min}
            key={index}
          />
        ))}
      </div>
    </>
  )
}

export default WeatherList
