import React from 'react'
import NavBar from '../../Components/Major/NavBar'
import CircularOverlay from '../../Components/Minor/CircularOverlay'
import MarketHeader from '../../Components/Header/MarketHeader'
import VegMarquee from '../../Components/Minor/VegMarquee'
import TwoCards from './TwoCards'
import BuyBlock from './BuyBlock'

const MarketPlace = () => {
  return (
    <div className='w-full'>
    <NavBar/>
    <CircularOverlay/>
    <MarketHeader/>
    <VegMarquee/>
    <TwoCards/>
    <BuyBlock/>
    </div>
  )
}

export default MarketPlace