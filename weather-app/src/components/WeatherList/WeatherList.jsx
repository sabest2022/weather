import { useEffect, useState } from 'react'
import './WeatherList.scss'
import WeatherCard from '../WeatherCard/WeatherCard'

const WeatherList = () => {
  let api_key = '0e27dfb9c6082f5b89f8745c47d36ccb'

  const [data, setData] = useState([])
  console.log(data)

  const search = async () => {
    let url = `https://api.openweathermap.org/data/2.5/forecast?q=London&units=Metric&cnt=10&appid=${api_key}`

    let response = await fetch(url)
    let data = await response.json()

    const currentDate = new Date().toISOString().split('T')[0]
    const todayWeatherData = data.list.filter((item) =>
      item.dt_txt.startsWith(currentDate),
    )

    setData(todayWeatherData)
  }

  useEffect(() => {
    search()
  }, [])

  return (
    <>
      <div className="weather-selector">
        <h2>Today</h2>
        <h2>Week</h2>
      </div>
      <div className="weather-list">
        {data.map((day, index) => (
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
