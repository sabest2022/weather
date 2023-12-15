import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../ProfileCard/ProfileCard.scss'
import { useUserContext } from '../../context/UserContext'
const ProfileCard = () => {
  const { currentUser } = useUserContext()

  return (
    <div className="profile-card-container">
      <Link to="/profile">
        {currentUser && (
          <>
            <img src={currentUser.imageUrl} alt={currentUser.name} />
          </>
        )}
      </Link>
    </div>
  )
}

export default ProfileCard
