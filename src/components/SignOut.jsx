import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const SignOut = () => {
  const navigate = useNavigate()

  useEffect(() => {
    localStorage.removeItem('token')
    navigate('/')
  }, [navigate])

  return null
}

export default SignOut
