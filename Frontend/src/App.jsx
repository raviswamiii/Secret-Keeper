import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { UserLogin } from './pages/UserLogin'
import { Home } from './pages/Home'
import { UserRegister } from './pages/UserRegister'

export const App = () => {
  return (
    <div>
      <Routes>
        <Route path={"/"} element={<UserLogin/>}/>
        <Route path={"/home"} element={<Home/>}/>
        <Route path={"/userRegister"} element={<UserRegister/>}/>
      </Routes>
    </div>
  )
}
