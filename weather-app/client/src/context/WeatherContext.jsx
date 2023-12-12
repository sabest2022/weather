import { createContext, useContext, useState, useEffect } from 'react'

export const WeatherContext = createContext()

export const useWeatherContext = () => useContext(WeatherContext)

export const WeatherProvider = ({ children }) => {
  const api_key = import.meta.env.VITE_REACT_APP_WEATHER_API_KEY

  const [cityInput, setCityInput] = useState('')
  const [city, setCity] = useState('Stockholm')
  const [currentWeather, setCurrentWeather] = useState({})
  const [todayWeather, setTodayWeather] = useState([])
  const [weekWeather, setWeekWeather] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)
  const [temperatureUnit, setTemperatureUnit] = useState(
    localStorage.getItem('temperatureUnit') || 'Metric',
  )

  const getCurrentWeather = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${temperatureUnit}&appid=${api_key}`
      console.log(`${url} this is the url`)
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
      let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${temperatureUnit}&appid=${api_key}`

      let response = await fetch(url)
      let data = await response.json()

      const currentDate = new Date().toISOString().split('T')[0]
      const todayWeatherData = data.list.filter((item) =>
        item.dt_txt.startsWith(currentDate),
      )

      const uniqueDays = []
      const weekWeatherData = data.list.filter((item) => {
        const date = item.dt_txt.split(' ')[0]
        if (!uniqueDays[date]) {
          uniqueDays[date] = true
          return true
        }

        return false
      })

      setIsLoading(true)
      setError(false)
      setTodayWeather(todayWeatherData)
      setWeekWeather(weekWeatherData)
    } catch (error) {
      setIsLoading(false)
      setError(true)
    }
  }

  useEffect(() => {
    getCurrentWeather()
    getTodayWeather()
  }, [city, temperatureUnit])

  useEffect(() => {
    localStorage.setItem('temperatureUnit', temperatureUnit)
  }, [temperatureUnit])

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
        weekWeather,
        temperatureUnit,
        setTemperatureUnit,
      }}
    >
      {children}
    </WeatherContext.Provider>
  )
}
