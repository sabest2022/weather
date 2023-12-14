import Main from './pages/Main/Main'
import Profile from './pages/Profile/Profile'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { WeatherProvider } from './context/WeatherContext'
import Confirmation from './pages/Confirmation/Confirmation'

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
    path: '/confirmation',
    element: <Confirmation />,
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
