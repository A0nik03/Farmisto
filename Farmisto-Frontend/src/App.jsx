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

const App = () => {
  return (
    <div className='h-screen w-screen font-[Inter]'>
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/market' element={<MarketPlace/>}/>
    <Route path='/about' element={<About/>}/>
    <Route path='/contact' element={<Contact/>}/>
    <Route path='/farmers' element={<NearbyFarmers/>}/>
    <Route path='/faq' element={<FAQs/>}/>
    <Route path='/terms-conditions' element={<TermsConditions/>}/>
    <Route path='/privacy-policy' element={<PrivacyPolicy/>}/>

    <Route path='/cart' element={<Cart/>}/>
    </Routes>
    </div>
  )
}

export default App