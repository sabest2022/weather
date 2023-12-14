import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

export const CheckoutContext = createContext()

export const useCheckoutContext = () => useContext(CheckoutContext)

export const CheckoutProvider = ({ children }) => {
  const redirectToCheckout = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/checkout', {
        amount: 1000,
        userId: '657a087463e46863af742a27',
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

  return (
    <CheckoutContext.Provider
      value={{
        redirectToCheckout,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  )
}
