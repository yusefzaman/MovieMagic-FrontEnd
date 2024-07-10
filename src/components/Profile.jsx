import { useState, useEffect } from 'react'
import axios from 'axios'

const Profile = () => {
  const [user, setUser] = useState(null)

  // Function to fetch user details from the backend
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
 hussain
      return response.data // Return user data from the response

    } catch (error) {
      console.error('Error fetching user details:', error)
      return null
    }
  }

  // Function to update user admin status
  const makeAdmin = async () => {
    const token = localStorage.getItem('token')
    try {
      const response = await axios.put(
        `http://127.0.0.1:5000/users/${user.id}`,
        { admin: true },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      setUser(response.data) // Update user data after admin status update
    } catch (error) {
      console.error('Error updating admin status:', error)
    }
  }

  // Fetch user details and set state on component mount
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      fetchUserDetails().then((userData) => {
        setUser(userData)
      })
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
