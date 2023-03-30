import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-blue-500 text-white'>
            <div className='container mx-auto w-[90%] p-3 flex items-center justify-between'>
                <h1 className='text-lg md:text-2xl'>Goalify</h1>
                <button className='bg-red-500 rounded-md py-2 px-3'>Logout</button>
            </div>
        </nav>
    )
}

export default Navbar