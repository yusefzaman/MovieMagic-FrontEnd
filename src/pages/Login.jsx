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
  return <div className="login"></div>
}
export default Login
