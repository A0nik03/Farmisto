import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import assets from './assets/assets'
import Dashboard from './Dash/Dashboard'


const App = () => {
  return (
    <div className='h-full w-full font-[Inter]'>
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/Dashboard' element={<Dashboard/>}/>
    </Routes>
    </div>
  )
}

export default App