import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Home from './pages/Home'

const App = () => {
  return (
    <div className='w-screen h-screen'>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/home' element={<Home/>}/>
      </Routes>
    </div>
  )
}

export default App