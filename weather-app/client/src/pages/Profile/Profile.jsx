import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Profile.scss'
import { useCheckoutContext } from '../../context/CheckoutContext'
import { useUserContext } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { GoogleLogout } from 'react-google-login'
import { formatBalance } from '../../utils/stringUtils'
import { MdAccountBalanceWallet } from 'react-icons/md'

const Profile = () => {
  const clientId = import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID

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
          <div className="user-info">
            <h1>{currentUser?.name}</h1>
            <h2>{currentUser?.email}</h2>
            <h3 className="user-id">'{currentUser?._id}'</h3>
          </div>
          <div className="user-image">
            <div className="user-balance">
              <MdAccountBalanceWallet />
              <p>{formatBalance(currentUser?.balance)} kr</p>
            </div>
            <img src={currentUser?.imageUrl} alt="Profile image" />
          </div>
          <div className="user-button">
            <GoogleLogout
              clientId={clientId}
              buttonText="Logout"
              onLogoutSuccess={onLogoutSuccess}
            />
          </div>
        </div>
        <div className="plans-list">
          <h1>Top up your balance with</h1>
          <button onClick={() => redirectToCheckout(100)}>100 kr</button>
          <button onClick={() => redirectToCheckout(250)}>250 kr</button>
          <button onClick={() => redirectToCheckout(500)}>500 kr</button>
        </div>
        <div className="home-button">
          <Link to="/">
            <button>Home</button>
          </Link>
        </div>
      </div>
    </main>
  )
}

export default Profile
