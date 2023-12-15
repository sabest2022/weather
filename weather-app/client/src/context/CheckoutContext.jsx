import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

export const CheckoutContext = createContext()

export const useCheckoutContext = () => useContext(CheckoutContext)

export const CheckoutProvider = ({ children }) => {
  const redirectToCheckout = async (amount) => {
    try {
      const response = await axios.post('http://localhost:3000/api/checkout', {
        product: amount,
      })

      if (response.status === 200) {
        const { url, sessionId } = response.data
        localStorage.setItem('session-id', sessionId)
        window.location = url
      } else {
        console.error('Failed to create session')
      }
    } catch (error) {
      console.error('Error starting Checkout session:', error)
    }
  }

  const verifyPayment = async (currentUser) => {
    try {
      const sessionId = localStorage.getItem('session-id')

      const response = await axios.post('http://localhost:3000/api/verify', {
        sessionId,
        userId: currentUser._id,
      })
      const { verified } = response.data

      if (verified) {
        localStorage.removeItem('session-id')
      }
    } catch (error) {
      throw new Error('Failed to verify payment')
    }
  }

  return (
    <CheckoutContext.Provider
      value={{
        redirectToCheckout,
        verifyPayment,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  )
}
