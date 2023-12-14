import { useEffect } from 'react'
import './Confirmation.scss'
import axios from 'axios'
import { useUserContext } from '../../context/UserContext'

const Confirmation = () => {
  const { currentUser } = useUserContext()

  const verifyPayment = async () => {
    try {
      const sessionId = localStorage.getItem('session-id')
      const response = await axios.post('http://localhost:3000/api/verify', {
        sessionId,
        userId: currentUser._id,
      })

      if (response.status !== 200) {
        throw new Error('Failed to fetch data from the server')
      }

      const { verified, data } = response.data

      if (verified) {
        localStorage.removeItem('session-id')
      }

      console.log(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    verifyPayment()
  }, [])

  return (
    <div className="conf">
      <h1>Confirmation</h1>
    </div>
  )
}

export default Confirmation
