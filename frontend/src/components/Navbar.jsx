import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { asyncLogoutUser, reset } from '../redux/features/authSlice';

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth);

    const handleLogout = () => {
        dispatch(asyncLogoutUser());
        dispatch(reset());
        navigate('/')
    }

    return (
        <nav className='bg-blue-500 text-white'>
            <div className='container mx-auto w-[90%] p-3 flex items-center justify-between'>
                <h1 className='text-lg md:text-2xl'>Goalify</h1>
                {
                    user && (
                        <div className='flex items-center gap-5'>
                            <h1 className='text-lg md:text-xl capitalize'>{user?.username}</h1>
                            <button
                                onClick={handleLogout}
                                className='bg-red-500 rounded-md py-2 px-3'
                            >
                                Logout
                            </button>
                        </div>
                    )
                }
            </div>
        </nav>
    )
}

export default Navbar