import React, { useState } from 'react'
import { login } from '../services/Auth'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    const response = await login(email, password)
    setMessage(response.message)
    if (response.success) {
      window.location.href = '/mainpage'
    }
  }
  return (
    <div>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">Login</button>
        </form>
        {message && <p>{message}</p>}
    </div>
);
}

export default Login
