import React from 'react'
import { ImBin } from 'react-icons/im';
import { AiFillEdit } from 'react-icons/ai'

const GoalCard = ({ toggleEditGoalModal }) => {
    return (
        <div className='border rounded-md px-2 py-3 shadow-md'>
            <h1 className='text-lg md:text-xl font-bold'>
                Learn React
            </h1>
            <p className='text-sm text-gray-500 my-2'>Date: 12/07/1999</p>
            <div className='flex items-center justify-between'>
                <p>Priority</p>
                <span className='bg-red-500 text-white py-1 px-3'>High</span>
            </div>
            <div className='my-3 flex items-center justify-between'>
                <button onClick={toggleEditGoalModal} className='text-white bg-green-500 p-3 rounded-full'>
                    <AiFillEdit />
                </button>
                <button className='text-white bg-red-500 p-3 rounded-full'>
                    <ImBin />
                </button>
            </div>
        </div>
    )
}

export default GoalCard