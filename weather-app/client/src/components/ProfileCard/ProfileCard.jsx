import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../ProfileCard/ProfileCard.scss'
const ProfileCard = () => {
  const [user, setUser] = useState({})

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    setUser(currentUser)
  }, [])

  return (
    <div className="profile-card-container">
      <Link to="/profile">
        {user ? (
          <>
            <img src={user.imageUrl} alt="" />
          </>
        ) : (
          <p>No user logged in</p>
        )}
      </Link>
    </div>
  )
}

export default ProfileCard
