import React from 'react'
import './Main.scss'
import Sidebar from '../../components/Sidebar/Sidebar'
import WeatherList from '../../components/WeatherList/WeatherList'
import WeatherDetailInfo from '../../components/WeatherDetailInfo/WeatherDetailInfo'

const Main = () => {
  return (
    <>
      <h1>Main page</h1>
      <Sidebar />
      <WeatherList />
      <WeatherDetailInfo />
    </>
  )
}

export default Main
