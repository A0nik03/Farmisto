import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import assets from './assets/assets'
import MarketPlace from './Pages/MarketPlace/MarketPlace'

const App = () => {
  return (
    <div className='h-screen w-screen font-[Inter]'>
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/market' element={<MarketPlace/>}/>
    </Routes>
    </div>
  )
}

export default App