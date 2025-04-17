import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Login'
import Signup from './Signup'
import './styles/Login.css'

const Auth = (props) => {
    return (
        <Router>
            <div className='auth'>
            <div className='description' >
                <h1>
                Welcome to Zeta – The Smarter Way to Practice DSA
                </h1>
                <p>
                Zeta is an online compiler built specifically for students learning Data Structures and Algorithms. It allows you to write, compile, and run C++, Java, and Python programs with pre-defined input, making it easier to test logic and debug efficiently. With a clean, distraction-free interface and seamless backend execution, Zeta offers a smooth coding experience.
                Need help? Zeta Bot is integrated for instant doubt clarification – no more getting stuck.
                </p>
            </div>
                <Routes>
                    <Route path='/' element={<Login/>} />
                    <Route path='/signup' element={<Signup/>} />
                </Routes>
            </div>
        </Router>
    )
}

export default Auth
