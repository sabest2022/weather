import './Confirmation.scss'
import { useUserContext } from '../../context/UserContext'
import { useCheckoutContext } from '../../context/CheckoutContext'
import { Link } from 'react-router-dom'

const Confirmation = () => {
  const { currentUser } = useUserContext()
  const { verifyPayment } = useCheckoutContext()

  const sessionId = localStorage.getItem('session-id')

  if (currentUser && sessionId) {
    verifyPayment(currentUser)
  }

  return (
    <main>
      <div className="confirmation-wrapper">
        <h1>You have successfully topped up your balance...</h1>
        <Link to="/profile">
          <button>Profile</button>
        </Link>
      </div>
    </main>
  )
}

export default Confirmation
