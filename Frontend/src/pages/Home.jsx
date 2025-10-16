import React from 'react'
import { Logout } from '../components/Logout'
import { Link } from 'react-router-dom'

export const Home = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Logout/>
      <Link to={"/createCard"}><button className='bg-green-500 p-2'>Create Card</button></Link>
    </div>
  )
}
