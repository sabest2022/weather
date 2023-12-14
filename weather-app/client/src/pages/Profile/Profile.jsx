import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Profile.scss'
import { useCheckoutContext } from '../../context/CheckoutContext'

const Profile = () => {
  const { redirectToCheckout } = useCheckoutContext()
  const [user, setUser] = useState({})

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    setUser(currentUser)
  }, [])

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
    </main>
  )
}

export default Profile
