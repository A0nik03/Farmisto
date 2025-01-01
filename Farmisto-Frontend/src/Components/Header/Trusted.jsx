import React from 'react'
import { FaAirbnb } from "react-icons/fa";
import { PiFramerLogoFill } from "react-icons/pi";
import { FaMountainSun } from "react-icons/fa6";
import { SiTreehouse } from "react-icons/si";
import { SiWprocket } from "react-icons/si";
const Trusted = () => {

    const partners = {
        'Airbnb': FaAirbnb,
        'Framer': PiFramerLogoFill,
        'Himalayas': FaMountainSun,
        'Treehouse': SiTreehouse,
        'Pendo': SiWprocket
    }

  return (
    <div className='h-[40vh] w-full bg-zinc-100 p-5 flex flex-col justify-center items-center font-[satoshi]'>
        <h1 className='text-5xl font-semibold text-[#242424]'>Trusted by Over 20,000 Partners</h1>
        <div className='flex gap-14 mt-10'>
            {Object.keys(partners).map((partner, index) => {
                const Icon = partners[partner]
                return (
                    <div key={index} className='h-20 bg-[#f9f9f9] flex items-center justify-center rounded-full'>
                        <div className='flex gap-3'>
                        <Icon size={40} className="text-zinc-400"/>
                        <p className='text-3xl text-zinc-400 font-medium'>{partner}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default Trusted