import React from 'react'
import { Card } from './components/Card'
import { Route, Routes } from 'react-router-dom'
import { SignIn } from './components/SignIn'
import { CreateCard } from './components/CreateCard'
import { SignUp } from './components/SignUp'

export const App = () => {
  return (
    <div className='h-screen flex justify-center items-center bg-black p-4'>
      <Routes>
        <Route path='/' element={<Card/>} />
        <Route path='/signIn' element={<SignIn/>} />
        <Route path='/signUp' element={<SignUp/>} />
        <Route path='/createCard' element={<CreateCard/>} />
      </Routes>
    </div>
  )
}
