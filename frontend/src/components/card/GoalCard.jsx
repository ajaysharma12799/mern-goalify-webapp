import React from 'react'
import { ImBin } from 'react-icons/im';
import { AiFillEdit } from 'react-icons/ai'
import { useDispatch } from 'react-redux';
import { asyncDeleteGoal } from '../../redux/features/goals/goalSlice';

const GoalCard = ({ goal, toggleEditGoalModal }) => {
    const dispatch = useDispatch();
    const handleDelete = () => {
        dispatch(asyncDeleteGoal(goal?._id));
    }
    const bgColor = goal?.priority === 'low' ? 'green' : goal?.priority === 'medium' ? 'gray' : 'red';

    return (
        <div className='border rounded-md px-2 py-3 shadow-md'>
            <h1 className='text-lg md:text-xl font-bold'>
                {goal?.text}
            </h1>
            <p className='text-sm text-gray-500 my-2'>
                Date: {goal?.createdAt}
            </p>
            <div className='flex items-center justify-between'>
                <p>Priority</p>
                <span className={`bg-${bgColor}-500 text-white py-1 px-3 capitalize`}>{goal?.priority}</span>
            </div>
            <div className='my-3 flex items-center justify-between'>
                <button onClick={toggleEditGoalModal} className='text-white bg-green-500 p-3 rounded-full'>
                    <AiFillEdit />
                </button>
                <button onClick={handleDelete} className='text-white bg-red-500 p-3 rounded-full'>
                    <ImBin />
                </button>
            </div>
        </div>
    )
}

export default GoalCard