import React, { useState, useEffect } from 'react'
import './Sidebar.scss'
import { IoSearch } from 'react-icons/io5'

import windy_pic from '../../assets/windy_pic.png'
import humidity_pic from '../../assets/humidity_pic.png'

const Sidebar = () => {
  let api_key = '0e27dfb9c6082f5b89f8745c47d36ccb'

  const [searchCity, setSearchCity] = useState('London')
  const [city, setCity] = useState('')
  const [temperature, setTemperature] = useState('')
  const [humidity, setHumidity] = useState('')
  const [wind, setWind] = useState('')
  const [icon, setIcon] = useState('')
  const [error, setError] = useState(false)

  const handleInputChange = (event) => {
    setSearchCity(event.target.value)
  }

  const search = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&units=Metric&appid=${api_key}`

      let response = await fetch(url)
      let data = await response.json()

      setCity(data.name)
      setTemperature(data.main.temp.toFixed(1))
      setHumidity(data.main.humidity)
      setWind(data.wind.speed)
      setIcon(data.weather[0].icon)
      setError(false)
    } catch (error) {
      setError(true)
    }
  }

  useEffect(() => {
    search()
  }, [])

  return (
    <aside>
      <div className="container">
        <div className="top-bar">
          <IoSearch onClick={() => search()} />
          <input
            type="text"
            className="city-input"
            placeholder="Search for places..."
            onChange={handleInputChange}
          />
        </div>
        {!error ? (
          <div>
            <div className="weather-image">
              <img
                src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                alt=""
              />
            </div>
            <div className="weather-temp">
              {temperature}
              <span>&deg;C</span>
            </div>
            <div className="weather-location">{city}</div>
            <div className="data-container">
              <div className="element">
                <img src={humidity_pic} alt="humidity" className="icon" />
                <div className="data">
                  <div className="humidity-percent">{humidity}%</div>
                  <div className="text">Humidity</div>
                </div>
              </div>
              <div className="element">
                <img src={windy_pic} alt="wind" className="icon" />
                <div className="data">
                  <div className="wind-rate">{wind} km/h</div>
                  <div className="text">Wind</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="error-container">
            <h1>Theres no such city...</h1>
          </div>
        )}
      </div>
    </aside>
  )
}

export default Sidebar
