import React from 'react'
import './Main.scss'
import Sidebar from '../../components/Sidebar/Sidebar'
import WeatherList from '../../components/WeatherList/WeatherList'
import WeatherDetailInfo from '../../components/WeatherDetailInfo/WeatherDetailInfo'

const Main = () => {
  return (
    <main>
      <Sidebar />
      <div className="main-wrapper">
        <div className="main-buttons">
          <button>Theme</button>
          <button>Login</button>
          <button>Register</button>
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
