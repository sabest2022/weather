import React from 'react'
import './Profile.scss'

const Profile = () => {
  return (
    <div className='profile'>
      <h3>Profile page</h3>
      <img src="https://robohash.org/yohanna" alt="Profile image" />
      <ul>
       <li>ID: "ID GOES HERE"</li>
       <li>Username: "John Doe"</li>
       <li>Email: "john@gmail.com"</li>
       <li>Subscription: "IS USER SUBSCRIBED?"</li>
      </ul>
      <button>Sign out</button>
    </div>
  )
}

export default Profile
