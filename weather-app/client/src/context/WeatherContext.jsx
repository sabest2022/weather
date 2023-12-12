import { createContext, useContext, useState, useEffect } from 'react'

export const WeatherContext = createContext()

export const useWeatherContext = () => useContext(WeatherContext)

export const WeatherProvider = ({ children }) => {
  let api_key = 'f8ee96c6a342bb7f0aac5e5023ffe79d'

  const [cityInput, setCityInput] = useState('')
  const [city, setCity] = useState('London')
  const [currentWeather, setCurrentWeather] = useState({})
  const [todayWeather, setTodayWeather] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  const getCurrentWeather = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${api_key}`

      let response = await fetch(url)
      let data = await response.json()

      if (!response.ok) {
        throw new Error(`Status: ${response.status}`)
      }

      setIsLoading(true)
      setError(false)
      setCurrentWeather(data)
    } catch (error) {
      setIsLoading(false)
      setError(true)
    }
  }

  const getTodayWeather = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=Metric&appid=${api_key}`

      let response = await fetch(url)
      let data = await response.json()

      const currentDate = new Date().toISOString().split('T')[0]
      const todayWeatherData = data.list.filter((item) =>
        item.dt_txt.startsWith(currentDate),
      )

      setIsLoading(true)
      setError(false)
      setTodayWeather(todayWeatherData)
    } catch (error) {
      setIsLoading(false)
      setError(true)
    }
  }

  useEffect(() => {
    getCurrentWeather()
    getTodayWeather()
  }, [city])

  return (
    <WeatherContext.Provider
      value={{
        currentWeather,
        isLoading,
        error,
        setCity,
        todayWeather,
        cityInput,
        setCityInput,
      }}
    >
      {children}
    </WeatherContext.Provider>
  )
}
