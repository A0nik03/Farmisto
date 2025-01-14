import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import assets from './assets/assets'
import MarketPlace from './Pages/MarketPlace/MarketPlace'
import About from './Pages/About/About'
import Contact from './Pages/Contact/Contact'
import NearbyFarmers from './Pages/NearbyFarmers/NearbyFarmers'
import FAQs from './Pages/Faq/FAQ'
import TermsConditions from './Pages/Terms/TermsConditions'
import PrivacyPolicy from './Pages/Privacy/PrivacyPolicy'
import Cart from './Pages/Cart/Cart'
import Register from './Pages/Register/Register'
import PlaceOrder from './Pages/PlaceOrder/PlaceOrder'
import Confirmation from './Pages/Confirmation/Confirmation'
import FarmerProfile from './Pages/NearbyFarmers/FarmerProfile'

const App = () => {
  return (
    <div className='h-screen w-screen font-[Inter]'>
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/market' element={<MarketPlace/>}/>
    <Route path='/about' element={<About/>}/>
    <Route path='/contact' element={<Contact/>}/>
    <Route path='/farmers' element={<NearbyFarmers/>}/>
    <Route path='/Profile' element={<FarmerProfile/>}/>
    <Route path='/faq' element={<FAQs/>}/>
    <Route path='/terms-conditions' element={<TermsConditions/>}/>
    <Route path='/privacy-policy' element={<PrivacyPolicy/>}/>

    <Route path='/form' element={<Register/>}/>
    <Route path='/cart' element={<Cart/>}/>
    <Route path='/place-order' element={<PlaceOrder/>}/>
    <Route path='/order-confirmation' element={<Confirmation/>}/>

    </Routes>
    </div>
  )
}

export default App