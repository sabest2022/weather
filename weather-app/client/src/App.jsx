import Main from './pages/Main/Main'
import Profile from './pages/Profile/Profile'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { WeatherProvider } from './context/WeatherContext'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
])

function App() {
  return (
    <WeatherProvider>
      <RouterProvider router={router} />
    </WeatherProvider>
  )
}

export default App
