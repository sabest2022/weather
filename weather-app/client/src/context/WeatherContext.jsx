import { createContext, useContext, useState, useEffect } from 'react'
import { formatCity } from '../utils/formatCity'
import { useUserContext } from './UserContext'
import axios from 'axios'

export const WeatherContext = createContext()

export const useWeatherContext = () => useContext(WeatherContext)

export const WeatherProvider = ({ children }) => {
  const api_key = import.meta.env.VITE_REACT_APP_WEATHER_API_KEY

  const [cityInput, setCityInput] = useState('')
  const [handleSearchClick, setHandleSearchClick] = useState(false)
  const [city, setCity] = useState('stockholm')
  const [cityImage, setCityImage] = useState({})
  const [hasImage, setHasImage] = useState(true)
  const [currentWeather, setCurrentWeather] = useState({})
  const [todayWeather, setTodayWeather] = useState([])
  const [weekWeather, setWeekWeather] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  const [temperatureUnit, setTemperatureUnit] = useState(
    localStorage.getItem('temperatureUnit') || 'Metric',
  )

  const { currentUser, checkAuthStatus } = useUserContext()

  const getCurrentWeather = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${temperatureUnit}&appid=${api_key}`
      let response = await fetch(url)
      let data = await response.json()

      if (!response.ok) {
        throw new Error(`Status: ${response.status}`)
      }

      getCityImage()
      getTodayWeather()

      if (handleSearchClick) {
        payForSearch(currentUser?._id)
      }

      setIsLoading(true)
      setError(false)
      setCurrentWeather(data)
      setHandleSearchClick(false)
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

  const getCityImage = async () => {
    try {
      let url = `https://api.teleport.org/api/urban_areas/slug:${formatCity(
        city,
      )}/images/`
      let response = await fetch(url)
      let data = await response.json()

      if (!response.ok) {
        throw new Error(`Status: ${response.status}`)
      }

      setCityImage(data)
      setHasImage(true)
    } catch (error) {
      setHasImage(false)
    }
  }

  const payForSearch = async (userId) => {
    try {
      await axios.post(`http://localhost:3000/api/paid-service/${userId}`)

      checkAuthStatus()
    } catch (error) {
      console.error('Failed to pay for search', error)
    }
  }

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
        cityImage,
        hasImage,
        temperatureUnit,
        setTemperatureUnit,
        getCurrentWeather,
        getTodayWeather,
        getCityImage,
        city,
        setHandleSearchClick,
      }}
    >
      {children}
    </WeatherContext.Provider>
  )
}
