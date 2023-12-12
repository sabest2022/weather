import { useState } from 'react'
import './WeatherList.scss'
import WeatherCard from '../WeatherCard/WeatherCard'
import { useWeatherContext } from '../../context/WeatherContext'
import Loader from '../Loader/Loader'
import {
  convertTimestampToDayOfWeek,
  convertTimestampToTime,
} from '../../utils/formatDate'

const WeatherList = () => {
  const { todayWeather, weekWeather, isLoading } = useWeatherContext()
  const [selected, setSelected] = useState('today')

  const handleSelectorClick = (selected) => {
    setSelected(selected)
  }

  return (
    <>
      <div className="weather-selector">
        <h2
          className={selected === 'today' ? 'selected' : undefined}
          onClick={() => handleSelectorClick('today')}
        >
          Today
        </h2>
        <h2
          className={selected === 'week' ? 'selected' : undefined}
          onClick={() => handleSelectorClick('week')}
        >
          Week
        </h2>
      </div>
      {!isLoading ? (
        <div className="weather-list-loading-container">
          <Loader />
        </div>
      ) : (
        <div className="weather-list">
          {selected === 'today'
            ? todayWeather.map((date, index) => (
                <WeatherCard
                  dt={convertTimestampToTime(date.dt)}
                  icon={date.weather[0].icon}
                  description={date.weather[0].description}
                  temp={date.main.temp}
                  feels_like={date.main.feels_like}
                  key={index}
                />
              ))
            : weekWeather.map((date, index) => (
                <WeatherCard
                  dt={convertTimestampToDayOfWeek(date.dt)}
                  icon={date.weather[0].icon}
                  description={date.weather[0].description}
                  temp={date.main.temp}
                  feels_like={date.main.feels_like}
                  key={index}
                />
              ))}
        </div>
      )}
    </>
  )
}

export default WeatherList
