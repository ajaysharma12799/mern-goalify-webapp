import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AddGoalModal from '../components/modal/AddGoalModal';
import { AiOutlinePlus } from 'react-icons/ai'

import GoalCard from '../components/card/GoalCard';
import EditGoalModal from '../components/modal/EditGoalModal';
import { asyncGetGoals } from '../redux/features/goals/goalSlice';

const Dashboard = () => {
    const dispatch = useDispatch();
    const { goals, isLoading } = useSelector(state => state.goal);
    const [isAddGoalModalOpen, setIsAddGoalModalOpen] = useState(false);
    const [isEditGoalModalOpen, setIsEditGoalModalOpen] = useState(false);

    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth);

    const toggleAddGoalModal = () => {
        setIsAddGoalModalOpen(!isAddGoalModalOpen);
    }

    const toggleEditGoalModal = () => {
        setIsEditGoalModalOpen(!isEditGoalModalOpen);
    }

    useEffect(() => {
        if (!user) {
            navigate('/');
        }

        dispatch(asyncGetGoals());
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
                <hr className='my-2' />
                <div className='goals-container'>
                    <h1 className='text-lg md:text-3xl'>All Goals</h1>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-2 my-3'>

                        {
                            isLoading ? (
                                <h1 className='text-lg md:text-xl text-center'>Loading...</h1>
                            ) : (
                                goals.length === 0 ? (
                                    <h1>No Goals Yet</h1>
                                ) : (
                                    goals?.map((goal, idx) => {
                                        return (
                                            <GoalCard
                                                goal={goal}
                                                key={idx}
                                                toggleEditGoalModal={toggleEditGoalModal}
                                            />
                                        );
                                    })
                                    )
                                )
                        }
                    </div>
                </div>
            </div>
            <AddGoalModal
                toggleAddGoalModal={toggleAddGoalModal}
                isAddGoalModalOpen={isAddGoalModalOpen}
            />
            <EditGoalModal
                isEditGoalModalOpen={isEditGoalModalOpen}
                toggleEditGoalModal={toggleEditGoalModal}
            />
        </React.Fragment>
    )
}

export default Dashboard