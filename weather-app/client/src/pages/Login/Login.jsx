import React, { useState, useEffect } from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import axios from 'axios'
import { useUserContext } from '../../context/UserContext';

const clientId =
  '152826738328-2gschac9945q44ilfue2n9c6d19nt296.apps.googleusercontent.com'

function Login() {
  const { isSignedIn, setIsSignedIn, currentUser, setCurrentUser } = useUserContext();

  // const [user, setCurrentUser] = useState(null)
  // const [isSignedIn, setIsSignedIn] = useState(false)
  // console.log(user)
  const checkAuthStatus = async () => {
    try {
      const { data } = await axios.get(
        'http://localhost:3000/api/google-authorize',
        { withCredentials: true },
      )
      setCurrentUser(data)
      setIsSignedIn(true)
    } catch (error) {
      setCurrentUser(null)
      setIsSignedIn(false)
    }
  }

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const onSuccess = async (res) => {
    await axios
      .post(
        'http://localhost:3000/api/google-login',
        { token: res.tokenId },
        { withCredentials: true },
      )
      .then((response) => {
        console.log('Server response:', response.data)
        checkAuthStatus()
      })
      .catch((error) => {
        console.error('Server error', error)
      })
  }

  const onFailure = (res) => {
    console.log('Login Failed! res: ', res)
  }

  const onLogoutSuccess = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/google-logout',
        null,
        {
          withCredentials: true,
        },
      )

      if (response.status === 204) {
        setCurrentUser(null)
        setIsSignedIn(false)
        console.log('Logout was successful')
      } else {
        console.error('Logout failed with status:', response.status)
      }
    } catch (error) {
      console.error('Server error during logout', error)
    }
  }

  return (
    <div id="signinbutton">
      {!isSignedIn ? (
        <GoogleLogin
          clientId={clientId}
          buttonText="Google Login"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
        />
      ) : (
        <GoogleLogout
          clientId={clientId}
          buttonText="Logout"
          onLogoutSuccess={onLogoutSuccess}
        />
      )}
    </div>
  )
}

export default Login
