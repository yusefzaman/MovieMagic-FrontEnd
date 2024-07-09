import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [registrationMessage, setRegistrationMessage] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setRegistrationMessage('')
      return
    }

    const url = 'http://127.0.0.1:5000/register'
    try {
      const response = await axios.post(url, {
        name,
        email,
        password
      })

      // Handle success
      const { data } = response
      setRegistrationMessage(
        `Nice work ${name}! You're registered successfully.`
      )
      setError('')

      // Redirect after successful registration
      setTimeout(() => {
        navigate('/signin') // Navigate to the signin page after successful registration
      }, 2000) // Redirect after 2 seconds
    } catch (error) {
      console.error(error)
      setError('Registration failed')
      setRegistrationMessage('')
    }
  }

  return (
    <div className="register">
      <div className="registerCard">
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="name">Name</label>
            <input
              onChange={(event) => setName(event.target.value)}
              name="name"
              type="text"
              placeholder="John Smith"
              value={name}
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              onChange={(event) => setEmail(event.target.value)}
              name="email"
              type="email"
              placeholder="example@example.com"
              value={email}
              required
            />
          </div>

          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              value={password}
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
          {registrationMessage && (
            <p className="success">{registrationMessage}</p>
          )}
          <button
            type="submit"
            disabled={
              !name || !email || !password || password !== confirmPassword
            }
          >
            Register
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register
