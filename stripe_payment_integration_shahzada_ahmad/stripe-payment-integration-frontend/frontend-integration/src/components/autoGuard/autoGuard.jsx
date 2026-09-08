'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getCookie } from 'cookies-next'

const AuthGuard = ({ children }) => {
  const router = useRouter()

  useEffect(() => {
    // Function to check if token exists
    const checkAuth = () => {
      const token = getCookie('myToken')
      if (!token) {
        console.log('Token expired or missing. Redirecting to login...')
        router.push('/login')
      }
    }

    // Check immediately on mount
    checkAuth()

    // Periodically check every 2 seconds if token is still valid
    const interval = setInterval(checkAuth, 2000)

    return () => clearInterval(interval)
  }, [router])

  return <>{children}</>
}

export default AuthGuard