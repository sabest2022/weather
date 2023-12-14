import Main from './pages/Main/Main'
import Profile from './pages/Profile/Profile'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { WeatherProvider } from './context/WeatherContext'
import Confirmation from './pages/Confirmation/Confirmation'
import { CheckoutProvider } from './context/CheckoutContext'
import { UserProvider } from './context/UserContext'
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
    <UserProvider>
      <CheckoutProvider>
        <WeatherProvider>
          <RouterProvider router={router} />
        </WeatherProvider>
      </CheckoutProvider>
    </UserProvider>
  )
}

export default App
