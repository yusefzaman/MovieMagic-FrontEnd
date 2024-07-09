import axios from 'axios'
import { useState } from 'react'
const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const handleSubmit = async (event) => {
    event.preventDefault()
    const url = 'http://127.0.0.1:5000/login'

    try {
      const response = await axios.post(url, { email, password })
      localStorage.setItem('token', response.data.access_token)
      console.log('Login succesful👌')
    } catch (error) {
      setError('Inaccurate Email or password')
    }
  }
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};
export default Login
