import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { SignIn } from './pages/SignIn'
import { Home } from './pages/Home'
import { SignUp } from './pages/SignUp'
import { ProtectRoutes } from './components/ProtectRoutes'
import { CreateCard } from './components/CreateCard'

export const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<SignIn/>}/>
        <Route path='/home' element={<ProtectRoutes><Home/></ProtectRoutes>}/>
        <Route path='/signUp' element={<SignUp/>}/>
        <Route path='/createCard' element={<CreateCard/>}/>
      </Routes>
    </div>
  )
}
