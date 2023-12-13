import React, { useState, useEffect} from 'react'
import { Link } from "react-router-dom"
import './Profile.scss'

const Profile = () => {
  const [user, setUser] = useState({})

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))
    setUser(currentUser)
  }, [])

  return (
    <div className='profile'>
      <h3>Profile page</h3>
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
  )
}

export default Profile
