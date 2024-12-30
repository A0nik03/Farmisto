import React from 'react'
import NavBar from '../../Components/Major/NavBar'
import Header from '../../Components/Header/Header'
import CircularOverlay from '../../Components/Minor/CircularOverlay'
import Story from '../../Components/Story/Story'
import FeaturedProduct from '../../Components/FeaturedProduct/FeaturedProduct'
import HowItWorks from '../../Components/Minor/HowItWorks'

const Home = () => {
  const images = [
    { src: 'https://picsum.photos/id/1040/300/300', alt: 'a house on a mountain' },
    { src: 'https://picsum.photos/id/106/300/300', alt: 'some pink flowers' },
    { src: 'https://picsum.photos/id/136/300/300', alt: 'big rocks with some trees' },
    { src: 'https://picsum.photos/id/1039/300/300', alt: 'a waterfall, a lot of trees and a great view from the sky' },
    { src: 'https://picsum.photos/id/110/300/300', alt: 'a cool landscape' },
    { src: 'https://picsum.photos/id/1047/300/300', alt: 'inside a town between two big buildings' },
    { src: 'https://picsum.photos/id/1057/300/300', alt: 'a great view of the sea above the mountain' },
  ];
  return (
    <div className='relative'>
        <CircularOverlay/>
        <NavBar/>
        <Header/>
        <main>
          <Story/>
          <FeaturedProduct/>
          <div className='h-screen bg-red-100 flex'>
          <HowItWorks images={images} />
          </div>
        </main>
    </div>
  )
}

export default Home