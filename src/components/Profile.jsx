import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Profile = () => {
  const [user, setUser] = useState(null)

  const CheckSession = async () => {
    const token = localStorage.getItem('token')
    try {
      const response = await axios.get(
        'http://127.0.0.1:5000/users/getDetails',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      console.log(`response ${JSON.stringify(response)}`)
      // if (!response.ok) throw new Error('Network response was not ok')
      const userData = await response.data
      console.log(`userData ${userData}`)
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
    <div className="profile-container">
      {user ? (
        <div className="profile-card">
          <h1 className="profile-welcome">Welcome {user.name}</h1>
          <h2 className="profile-info">Name: {user.name}</h2>
          <h2 className="profile-info">Email: {user.email}</h2>
        </div>
      ) : (
        <p className="profile-message">User Not Logged In</p>
      )}
    </div>
  )
}

export default Profile
