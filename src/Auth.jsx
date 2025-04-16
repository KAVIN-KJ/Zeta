import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Login'
import Signup from './Signup'
import './styles/Login.css'

const Auth = (props) => {
    return (
        <Router>
            <div className='auth'>
                <Routes>
                    <Route path='/' element={<Login/>} />
                    <Route path='/signup' element={<Signup/>} />
                </Routes>
            </div>
        </Router>
    )
}

export default Auth
