import React from 'react'
import { Link } from 'react-router-dom'
import '../ProfileCard/ProfileCard.scss'
import { useUserContext } from '../../context/UserContext'
import { formatBalance } from '../../utils/stringUtils'
import { MdAccountBalanceWallet } from 'react-icons/md'

const ProfileCard = () => {
  const { currentUser } = useUserContext()

  return (
    <div className="profile-card-container">
      {currentUser && (
        <>
          <div>
            <Link to="/profile">
              <img src={currentUser.imageUrl} alt={currentUser.name} />
            </Link>
          </div>
          <div className="user-balance">
            <MdAccountBalanceWallet />
            <p>{formatBalance(currentUser.balance)} kr</p>
          </div>
        </>
      )}
    </div>
  )
}

export default ProfileCard
