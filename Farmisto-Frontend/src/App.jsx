import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import assets from './assets/assets'

const App = () => {
  return (
    <div className='h-screen w-screen'>
    <Routes>
    <Route path='/' element={<Home/>}/>
    </Routes>
    </div>
  )
}

export default App