import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const Profile = () => {
  const [user, setUser] = useState(null)

  const CheckSession = async () => {
    const token = localStorage.getItem('token')
    try {
      const response = await fetch('http://127.0.0.1:5000/users/:uuid', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (!response.ok) throw new Error('Network response was not ok')
      const userData = await response.json()
      return userData
    } catch (error) {
      console.error(
        'There has been a problem with your fetch operation:',
        error
      )
      return null
    }
  }

  const checkToken = async () => {
    const user = await CheckSession()
    setUser(user)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      checkToken()
    }
  }, [])

  return (
    <div>
      {user ? (
        <>
          <h1>Welcome {user.name}</h1>
          <h2>Name: {user.name}</h2>
          <h2>Email: {user.email}</h2>
        </>
      ) : (
        <p>User Not Logged In</p>
      )}
    </div>
  )
}

export default Profile
