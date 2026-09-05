'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getCookie } from 'cookies-next'

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    // Check every 1 second if token has expired
    const interval = setInterval(() => {
      const token = getCookie('myToken')

      if (!token) {
        console.log('Token expired! Redirecting to /login...')
        clearInterval(interval) // Stop interval
        router.push('/login')    // Push to login page
      }
    }, 1000)

    // Cleanup interval when component unmounts
    return () => clearInterval(interval)
  }, [router])

  return (
    <div>
      <h1>Home Page</h1>
      <p>You will be redirected automatically to /login 1 minute after login.</p>
    </div>
  )
}