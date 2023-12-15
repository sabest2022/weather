import './Confirmation.scss'
import { useUserContext } from '../../context/UserContext'
import { useCheckoutContext } from '../../context/CheckoutContext'

const Confirmation = () => {
  const { currentUser } = useUserContext()
  const { verifyPayment } = useCheckoutContext()

  const sessionId = localStorage.getItem('session-id')

  if (currentUser && sessionId) {
    verifyPayment(currentUser)
  }

  return (
    <div className="conf">
      <h1>Confirmation</h1>
    </div>
  )
}

export default Confirmation
