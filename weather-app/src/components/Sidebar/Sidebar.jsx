import React, { useState, useEffect } from 'react'
import './Sidebar.scss'
import { IoSearch } from 'react-icons/io5'

import windy_pic from '../../assets/windy_pic.png'
import humidity_pic from '../../assets/humidity_pic.png'
import Loader from '../Loader/Loader'

const Sidebar = () => {
  let api_key = '0e27dfb9c6082f5b89f8745c47d36ccb'

  const [city, setCity] = useState('London')
  const [data, setData] = useState({})
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (event) => {
    setCity(event.target.value)
  }

  const search = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${api_key}`

      let response = await fetch(url)
      let data = await response.json()

      if (!response.ok) {
        throw new Error(`Status: ${response.status}`)
      }

      setIsLoading(true)
      setError(false)
      setData(data)
    } catch (error) {
      setIsLoading(false)
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

        {!isLoading && !error ? (
          <div className="loading-container">
            <Loader />
          </div>
        ) : error ? (
          <div className="error-container">
            <h1>Theres no such city...</h1>
          </div>
        ) : (
          <div>
            <div className="weather-image">
              <img
                src={`https://openweathermap.org/img/wn/${data.weather?.[0]?.icon}@2x.png`}
                alt=""
              />
            </div>
            <div className="weather-temp">
              {data.main?.temp.toFixed(1)}
              <span>&deg;C</span>
            </div>
            <div className="weather-location">{data.name}</div>
            <div className="data-container">
              <div className="element">
                <img src={humidity_pic} alt="humidity" className="icon" />
                <div className="data">
                  <div className="humidity-percent">{data.main?.humidity}%</div>
                  <div className="text">Humidity</div>
                </div>
              </div>
              <div className="element">
                <img src={windy_pic} alt="wind" className="icon" />
                <div className="data">
                  <div className="wind-rate">{data.wind?.speed} km/h</div>
                  <div className="text">Wind</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}

export default Sidebar
