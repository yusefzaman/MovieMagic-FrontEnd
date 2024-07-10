const API_URL = 'http://localhost:3000'

export const register = async (name, email, password) => {
  const response = await fetch(`${API_URL}/users/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email, password })
  })
  return response.json()
}

export const login = async (email, password) => {
  const response = await fetch(`${API_URL}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
  const data = await response.json()
  if (data.success) {
    localStorage.setItem('user', JSON.stringify(data.user))
  }
  return data
}
export const logout = () => {
  localStorage.removeItem('user')
}

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'))
}
