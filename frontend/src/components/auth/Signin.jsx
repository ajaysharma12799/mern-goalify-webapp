import { useEffect } from 'react'
import { asyncLoginUser } from '../../redux/features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';

const Signin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, isSuccess, isLoading } = useSelector(state => state.auth);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: (values) => {
            console.log(values);
            dispatch(asyncLoginUser(values));
            dispatch(reset());
        }
    })

    useEffect(() => {
        if (isSuccess || user) {
            navigate('/dashboard');
        }
    }, [user, isSuccess, isLoading, navigate, dispatch])


    return (
        <form onSubmit={formik.handleSubmit}>
            <div className='my-3 flex flex-col items-start w-full'>
                <label htmlFor="email">Email</label>
                <input
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    type='email'
                    id='email'
                    className='border-2 outline-0 py-3 px-2 rounded-md w-full my-1'
                />
            </div>
            <div className='my-3 flex flex-col items-start w-full'>
                <label htmlFor="password">Password</label>
                <input
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    type='password'
                    id='password'
                    className='border-2 outline-0 py-3 px-2 rounded-md w-full my-1'
                />
            </div>
            <div className='my-3'>
                <button
                    className='bg-blue-500 w-full py-3 text-center rounded-md text-white'
                    type='submit'
                >
                    Signin
                </button>
            </div>
        </form>
    )
}

export default Signin