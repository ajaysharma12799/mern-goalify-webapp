import React from 'react'

const Signin = () => {
    return (
        <form>
            <div className='my-3 flex flex-col items-start w-full'>
                <label htmlFor="email">Email</label>
                <input type='email' id='email' className='border-2 outline-0 py-3 px-2 rounded-md w-full my-1' />
            </div>
            <div className='my-3 flex flex-col items-start w-full'>
                <label htmlFor="password">Password</label>
                <input type='password' id='password' className='border-2 outline-0 py-3 px-2 rounded-md w-full my-1' />
            </div>
            <div className='my-3'>
                <button className='bg-blue-500 w-full py-3 text-center rounded-md text-white' type='submit'>Signin</button>
            </div>
        </form>
    )
}

export default Signin