import React, { useState } from 'react'
import { register } from '../services/authService'

const Register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")

}

export default Register;