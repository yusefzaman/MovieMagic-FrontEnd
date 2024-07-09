import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const Profile = () => {
  const { id } = useParams()

  return (
    <div>
      {/* <img src="{id.img}"></img>
      <h1>Welcome {id.name}</h1>
      <h2>Name: {id.name} </h2>
      <h2>Email: {id.email}</h2> */}
    </div>
  )
}

export default Profile
