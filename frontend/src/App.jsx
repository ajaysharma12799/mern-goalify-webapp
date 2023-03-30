import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <main className='container mx-auto w-[90%]'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/' element={<Dashboard />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App