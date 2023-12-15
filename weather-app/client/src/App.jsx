import Main from './pages/Main/Main'
import Profile from './pages/Profile/Profile'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { WeatherProvider } from './context/WeatherContext'
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
])

function App() {
  return (
    <UserProvider>
      <WeatherProvider>
        <RouterProvider router={router} />
      </WeatherProvider>
    </UserProvider>
  )
}

export default App
