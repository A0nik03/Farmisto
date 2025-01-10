import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import assets from './assets/assets'
import Dashboard from './Dash/Dashboard'
import AddItem from './Dash/AddItem'
import Order from './Dash/Order'
import Message from './Dash/Message'
import Payments from './Dash/Payments'
import Register from './Pages/Register/Register'

const App = () => {
  return (
    <div className='h-full w-full font-[Inter]'>
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/Dashboard' element={<Dashboard/>}/>

    <Route path='/Additem' element={<AddItem/>}/>
    <Route path='/Orders' element={<Order/>}/>
    <Route path='/Message' element={<Message/>}/>
    <Route path='/Payments' element={<Payments/>}/>
    <Route path='/Register' element={<Register/>}/>
    </Routes>
    </div>
  )
}

export default App