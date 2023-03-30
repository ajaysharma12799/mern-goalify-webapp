import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AddGoalModal from '../components/modal/AddGoalModal';
import { AiOutlinePlus, AiFillEdit } from 'react-icons/ai'

import GoalCard from '../components/card/GoalCard';

const Dashboard = () => {
    const [isAddGoalModalOpen, setIsAddGoalModalOpen] = useState(false);
    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth);

    const toggleAddGoalModal = () => {
        setIsAddGoalModalOpen(!isAddGoalModalOpen);
    }

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [navigate, user])

    return (
        <React.Fragment>
            <div className='my-5'>
                <div className='flex items-center justify-between'>
                    <h1 className='text-lg md:text-2xl'>Dashboard</h1>
                    <button
                        onClick={toggleAddGoalModal}
                        className='bg-blue-500 py-3 px-3 rounded-md text-white flex items-center gap-3'
                    >
                        <AiOutlinePlus />
                        Add Goal
                    </button>
                </div>
                <div className='goals-container'>
                    <h1 className='text-lg md:text-3xl'>All Goals</h1>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-2 my-3'>

                        {
                            [1, 2, 3, 4, 5, 6, 7].map((_, idx) => {
                                return (
                                    <GoalCard key={idx} />
                                );
                            })
                        }
                    </div>
                </div>
            </div>
            <AddGoalModal
                toggleAddGoalModal={toggleAddGoalModal}
                isAddGoalModalOpen={isAddGoalModalOpen}
            />
        </React.Fragment>
    )
}

export default Dashboard