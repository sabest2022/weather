import React, { useEffect, useState } from 'react'
import '../ProfileCard/ProfileCard.scss'
const ProfileCard = () => {
  const [user, setUser] = useState({})

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    setUser(currentUser)
  }, [])

  return (
    <div className="profile-card-container">
      <img src={user.imageURl} alt="" />
      <p>{user.name}</p>
    </div>
  )
}

export default ProfileCard
