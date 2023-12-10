import { useEffect, useState } from 'react'
import './WeatherList.scss'
import WeatherCard from '../WeatherCard/WeatherCard'

const WeatherList = () => {
  let api_key = '0e27dfb9c6082f5b89f8745c47d36ccb'
  const [data, setData] = useState({})

  const search = async () => {
    let url = `https://api.openweathermap.org/data/2.5/forecast?q=London&units=Metric&appid=${api_key}`

    let response = await fetch(url)
    let data = await response.json()

    setData(data)
  }

  useEffect(() => {
    search()
  }, [])

  return (
    <>
      <div>
        <h2>Today</h2>
        <h2>Week</h2>
      </div>
      <WeatherCard />
    </>
  )
}

export default WeatherList
