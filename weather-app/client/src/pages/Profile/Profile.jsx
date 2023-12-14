import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Profile.scss'
import { useCheckoutContext } from '../../context/CheckoutContext'
import { useUserContext } from '../../context/UserContext'

const Profile = () => {
  const { redirectToCheckout } = useCheckoutContext()
  const { currentUser } = useUserContext()

  return (
    <main>
      <div className="profile-wrapper">
        <div className="user-info-wrapper">
          <img src={currentUser?.imageUrl} alt="Profile image" />
          <ul>
            <li>ID: {currentUser?._id}</li>
            <li>Username: {currentUser?.name}</li>
            <li>Email: {currentUser?.email}</li>
            <li>Balance: {currentUser?.balance}</li>
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
