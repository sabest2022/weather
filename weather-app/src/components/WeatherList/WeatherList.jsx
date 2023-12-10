import { useEffect, useState } from 'react'
import './WeatherList.scss'
import WeatherCard from '../WeatherCard/WeatherCard'
import { useWeatherContext } from '../../context/WeatherContext'
import Loader from '../Loader/Loader'

const WeatherList = () => {
  const { todayWeather, isLoading } = useWeatherContext()

  return (
    <>
      <div className="weather-selector">
        <h2 className={todayWeather.length > 0 && 'selected'}>Today</h2>
        <h2>Week</h2>
      </div>
      {!isLoading ? (
        <div className="weather-list-loading-container">
          <Loader />
        </div>
      ) : (
        <div className="weather-list">
          {todayWeather.map((day, index) => (
            <WeatherCard
              dt={day.dt}
              icon={day.weather[0].icon}
              description={day.weather[0].description}
              temp={day.main.temp}
              feels_like={day.main.feels_like}
              key={index}
            />
          ))}
        </div>
      )}
    </>
  )
}

export default WeatherList
