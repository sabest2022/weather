import Main from './pages/Main/Main'
import Profile from './pages/Profile/Profile'
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
])

function App() {
  return (
    <CheckoutProvider>
      <UserProvider>
        <WeatherProvider>
          <RouterProvider router={router} />
        </WeatherProvider>
      </UserProvider>
    </CheckoutProvider>
  )
}

export default App
