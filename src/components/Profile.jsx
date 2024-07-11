import { useState, useEffect } from 'react'
import axios from 'axios'

const Profile = () => {
  const [user, setUser] = useState(null)

  const fetchUserDetails = async () => {
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
      return response.data
    } catch (error) {
      console.error('Error fetching user details:', error)
      return null
    }
  }

  const makeAdmin = async () => {
    const token = localStorage.getItem('token')
    const userEmail = user.email.trim() // Trim the email

    try {
      const url = `http://localhost:5000/users/${encodeURIComponent(userEmail)}` // Ensure email is properly encoded
      const response = await axios.put(
        url,
        { admin: true },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      setUser(response.data) // Update user data after admin status update
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error('Server Error Status:', error.response.status)
        console.error('Server Error Data:', error.response.data)
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request)
      } else {
        // Something happened in setting up the request that triggered an error
        console.error('Request setup error:', error.message)
      }
      console.error('Error updating admin status:', error)
    }
  }
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      fetchUserDetails().then((userData) => {
        setUser(userData)
      })
    } else {
      setUser(null)
    }
  }, [])

  return (
    <div className="profile-container">
      {user ? (
        <div className="profile-card">
          <h1 className="profile-welcome">Welcome {user.name}</h1>
          <h2 className="profile-info">Name: {user.name}</h2>
          <h2 className="profile-info">Email: {user.email}</h2>
          <h2 className="profile-info">
            Status: {user.admin ? 'Admin' : 'User'}
          </h2>
          {!user.admin && <button onClick={makeAdmin}>Make Admin</button>}
        </div>
      ) : (
        <p className="profile-message">User Not Logged In</p>
      )}
    </div>
  )
}

export default Profile
