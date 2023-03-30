import React, { useState } from 'react'
import Signin from '../components/auth/Signin';
import Signup from '../components/auth/Signup';

const HomePage = () => {
    const [tabView, setTabView] = useState('signin');
    return (
        <div className='w-1/2 mx-auto my-5'>
            <div className='flex items-center justify-between border'>
                <button onClick={() => setTabView('signin')} className={`${tabView === 'signin' && 'bg-green-500'} font-bold w-full py-3`}>SignIn</button>
                <button onClick={() => setTabView('signup')} className={`${tabView === 'signup' && 'bg-green-500'} font-bold w-full py-3`}>SignUp</button>
            </div>
            {
                tabView === 'signin' ? <Signin /> : <Signup />
            }
        </div>
    )
}

export default HomePage