import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Profile.scss'
import axios from 'axios'

const Profile = () => {
  const [user, setUser] = useState({})
  const [isCheckoutSuccess, setIsCheckoutSuccess] = useState(false)

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    setUser(currentUser)
  }, [])

  const redirectToCheckout = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/checkout', {
        amount: 1000,
        userId: '657a087463e46863af742a27',
      })

      if (response.status === 200) {
        const { url, sessionId } = response.data
        localStorage.setItem('session-id', sessionId)
        window.location = url
      } else {
        console.error('Failed to create session')
      }
    } catch (error) {
      console.error('Error starting Checkout session:', error)
    }
  }

  return (
    <main>
      <div className="profile-wrapper">
        <div className="user-info-wrapper">
          <img src={user.imageUrl} alt="Profile image" />
          <ul>
            <li>ID: {user.googleId}</li>
            <li>Username: {user.name}</li>
            <li>Email: {user.email}</li>
          </ul>
          <Link to="/">
            <button>Home</button>
          </Link>
        </div>
        <div className="plans-list">
          <h1>Top up your balance with</h1>
          <button onClick={redirectToCheckout}>100</button>
          <button>250</button>
          <button>500</button>
        </div>
      </div>
      {isCheckoutSuccess && <Confirmation />}
    </main>
  )
}

export default Profile
