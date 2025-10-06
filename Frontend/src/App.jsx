import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { SignIn } from './pages/SignIn'
import { Home } from './pages/Home'
import { SignUp } from './pages/SignUp'

export const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<SignIn/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/signUp' element={<SignUp/>}/>
      </Routes>
    </div>
  )
}
