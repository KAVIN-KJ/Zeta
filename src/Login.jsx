import React from 'react'
import "./styles/Login.css"
import { useState } from 'react'
import { auth, addDocument, googleAuth } from './firebase'
import { FirebaseError } from 'firebase/app'
import { Link,useNavigate } from 'react-router-dom'
import googleLogo from './assets/google-logo.svg'
import { createUserWithEmailAndPassword, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth'

const Login = (props) => {


    const onLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log(auth.currentUser.uid)
            localStorage.setItem("currentUser", auth?.currentUser?.uid)
            // props.setCurrentUser(auth?.currentUser?.uid);
            window.location.reload()
        }
        catch (FirebaseError) {
            alert("Something went wrong");
            console.error(FirebaseError);
        }
    }

    const onGoogleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithPopup(auth, googleAuth)
            localStorage.setItem("currentUser", auth?.currentUser?.uid)
            await addDocument({ uid: auth?.currentUser?.uid, email: auth?.currentUser?.email });
            window.location.reload()
        } catch (error) {
            alert("Something went wrong");
            console.error(error);
        }

    }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <form className='login'>
            <h1>Login</h1>
            <span>Email</span>
            <input autoComplete="email" required="true" onChange={(e) => setEmail(e.target.value)} type="email" placeholder='e-mail' />
            <span>Password</span>
            <input autoComplete="current-password" required="true" onChange={(e) => setPassword(e.target.value)} type="password" placeholder='password' />
            <button onClick={(e)=>onLogin(e)} >Login</button>
            <button className='google-auth' onClick={(e)=>onGoogleLogin(e)} >Login/Signup with google <img width="30px" src={googleLogo} alt="" /> </button>
            <Link to='/signup' >No account ? create a new one</Link>

        </form>
    )
}

export default Login
