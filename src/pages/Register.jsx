import React, { useState } from 'react'

import Form from '../components/Form'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleRegister = async (e) => {
    e.preventDefault()

    const response = { success: true, message: 'Registration successful' }
    setMessage(response.message)
    if (response.success) {
      history.push('/signin')
    }
  }

  const fields = [
    {
      label: 'Name',
      type: 'text',
      value: name,
      onChange: (e) => setName(e.target.value)
    },
    {
      label: 'Email',
      type: 'email',
      value: email,
      onChange: (e) => setEmail(e.target.value)
    },
    {
      label: 'Password',
      type: 'password',
      value: password,
      onChange: (e) => setPassword(e.target.value)
    }
  ]

  return (
    <div className="register-container">
      <h2>Register</h2>
      <Form
        fields={fields}
        onSubmit={handleRegister}
        buttonText="Register"
        message={message}
      />
    </div>
  )
}

export default Register
