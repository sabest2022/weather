import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Profile.scss'
import { useCheckoutContext } from '../../context/CheckoutContext'
import { useUserContext } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { GoogleLogout } from 'react-google-login'
import { formatBalance } from '../../utils/stringUtils'

const Profile = () => {
  const clientId =
    '152826738328-2gschac9945q44ilfue2n9c6d19nt296.apps.googleusercontent.com'

  const { redirectToCheckout } = useCheckoutContext()
  const { currentUser, logout, checkAuthStatus } = useUserContext()

  const navigate = useNavigate()

  const onLogoutSuccess = async () => {
    await logout()
    navigate('/')
  }

  useEffect(() => {
    checkAuthStatus()
  }, [])

  return (
    <main>
      <div className="profile-wrapper">
        <div className="user-info-wrapper">
          <img src={currentUser?.imageUrl} alt="Profile image" />
          <ul>
            <li>ID: {currentUser?._id}</li>
            <li>Username: {currentUser?.name}</li>
            <li>Email: {currentUser?.email}</li>
            <li>Balance: {formatBalance(currentUser?.balance)} kr</li>
          </ul>
          <Link to="/">
            <button>Home</button>
          </Link>
          <GoogleLogout
            clientId={clientId}
            buttonText="Logout"
            onLogoutSuccess={onLogoutSuccess}
          />
        </div>
        <div className="plans-list">
          <h1>Top up your balance with</h1>
          <button onClick={() => redirectToCheckout(100)}>100</button>
          <button onClick={() => redirectToCheckout(250)}>250</button>
          <button onClick={() => redirectToCheckout(500)}>500</button>
        </div>
      </div>
    </main>
  )
}

export default Profile
