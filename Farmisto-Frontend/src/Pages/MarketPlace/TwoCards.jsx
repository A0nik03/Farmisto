import React from 'react'

const TwoCards = () => {
  return (
    <div className='h-[52vh] w-full flex items-center justify-center gap-5'>
    <div style={{
        backgroundImage: "url(https://images.unsplash.com/photo-1633954643938-cf09ec60c436?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
    }} className='h-[80%] w-[42%] rounded-xl bg-green-100 flex flex-col gap-2 pl-5 justify-center shadow-xl'>
        <p className='text-xl font-medium text-white'>Vegetable</p>
        <h1 className='font-[kurale] text-5xl text-white font-semibold'>Green World</h1>
        <p className='text-xl font-medium text-white mt-3'>Get 50% off on selected Veggies.</p>
        <button className='bg-white text-[#0d331c] font-bold py-2 px-4 w-40 rounded-lg mt-2'>Discover Now</button>
    </div>
    <div style={{
        backgroundImage: "url(https://images.unsplash.com/photo-1559028901-a2768411cc29?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGRhcmslMjBmcnVpdHN8ZW58MHx8MHx8fDA%3D)",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",

    }} className='h-[80%] w-[42%] rounded-xl bg-green-400 flex flex-col gap-2 justify-center pl-5 shadow-xl'>
        <p className='text-xl font-medium text-white'>Fresh Fruits</p>
        <h1 className='font-[kurale] text-5xl font-semibold text-white'>Healthy Food</h1>
        <p className='text-xl font-medium text-white mt-3'>Get 40% off on selected Fruits.</p>
        <button className='bg-white text-[#0d331c] font-bold py-2 px-4 w-40 rounded-lg mt-2'>Discover Now</button>
    </div>
    </div>
  )
}

export default TwoCards