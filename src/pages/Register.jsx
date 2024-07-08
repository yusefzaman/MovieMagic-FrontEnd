import axios from 'axios'
import { useState } from 'react'
const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const handleSubmit = async (event) => {
    event.preventDefault()

    if (password !== confirmPassword) {
      setError('Invalid Password')
    }
    const url = 'http://127.0.0.1:5000/register'
    try {
      const response = await axios.post(url, {
        name,
        email,
        password
      })
      console.log(response.data)
    } catch (error) {
      console.error(error)
      setError('Registration failed')
    }
  }
}
