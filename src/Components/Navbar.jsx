import React from 'react'

const Navbar = () => {
    return (
        <div className='max-w-[1640px] mx-auto flex justify-between items-center p-4 bg-gray-700'>
            <div className=''>
            <h1 className='text-2xl sm:text-3xl lg:text-4xl px-2 text-white' >ABC <span className='font-bold text-orange-600'>School</span>
                </h1>
            </div>
            <div className='flex w- justify-between items-center gap-5'>
                <p className='text-white cursor-pointer'>Home</p>
                <p className='text-white cursor-pointer'>Students</p>
                <button className='bg-red-600 rounded p-2 text-white'>Login</button>
            </div>
        </div>
    )
}

export default Navbar