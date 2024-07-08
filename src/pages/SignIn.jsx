import React, { useState } from 'react'

import Form from '../components/Form'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  

  const handleLogin = async (e) => {
    e.preventDefault()

    const response = { success: true, message: 'Login successful' }
    setMessage(response.message)
    if (response.success) {
      history.push('/dashboard')
    }
  }

  const fields = [
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
    <div className="signin-container">
      <h2>Sign In</h2>
      <Form
        fields={fields}
        onSubmit={handleLogin}
        buttonText="Sign In"
        message={message}
      />
    </div>
  )
}

export default SignIn
