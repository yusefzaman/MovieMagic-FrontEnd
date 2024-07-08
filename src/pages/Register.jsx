import axios from 'axios'
import { useState } from 'react'
const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const handleSubmit = (event) => {
    event.preventDefault()
  }
  if (password !== confirmPassword) {
  }
}
