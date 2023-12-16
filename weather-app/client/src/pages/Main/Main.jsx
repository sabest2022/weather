import React from 'react'
import './Main.scss'
import { useEffect } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import WeatherList from '../../components/WeatherList/WeatherList'
import WeatherDetailInfo from '../../components/WeatherDetailInfo/WeatherDetailInfo'
import ProfileCard from '../../components/ProfileCard/ProfileCard'
import LoginButton from '../Login/Login'
import { gapi } from 'gapi-script'
import { IoMdMoon } from 'react-icons/io'
import { useWeatherContext } from '../../context/WeatherContext'

const clientId = import.meta.env.GOOGLE_CLIENT_ID

const Main = () => {
  const {
    temperatureUnit,
    setTemperatureUnit,
    city,
    getCurrentWeather,
    getTodayWeather,
    getCityImage,
  } = useWeatherContext()

  const handleTemperatureUnitChange = () => {
    setTemperatureUnit((prevUnit) =>
      prevUnit === 'Metric' ? 'Imperial' : 'Metric',
    )
  }

  useEffect(() => {
    getCurrentWeather()
    getTodayWeather()
    getCityImage()
  }, [city, temperatureUnit])

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: '',
      })
    }
    gapi.load('client:auth2', start)
  }, [clientId])

  return (
    <main>
      <Sidebar />
      <div className="main-wrapper">
        <div className="main-buttons">
          <button className="interactive-button">
            <IoMdMoon />
          </button>
          <button
            className="interactive-button"
            onClick={handleTemperatureUnitChange}
          >
            &deg;{temperatureUnit === 'Metric' ? 'C' : 'F'}
          </button>
          <LoginButton />
          <ProfileCard />
        </div>
        <div className="main-content">
          <WeatherList />
          <WeatherDetailInfo />
        </div>
      </div>
    </main>
  )
}

export default Main
