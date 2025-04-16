import React from 'react'
import "./styles/Login.css"
import { useState } from 'react'
import { auth, addDocument, googleAuth } from './firebase'
import { Link,useNavigate } from 'react-router-dom'
import { FirebaseError } from 'firebase/app'
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth'

const Signup = (props) => {
    const onSignup = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            await addDocument({ uid: auth?.currentUser?.uid, email: auth?.currentUser?.email });
            localStorage.setItem("currentUser",auth?.currentUser?.uid)
            window.location.reload()
        }
        catch (FirebaseError) {
            console.error(FirebaseError);
            alert("Invalid credentials")
        }

    }

    const onGoogleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithPopup(auth, googleAuth)
            await addDocument({ uid: auth?.currentUser?.uid, email: auth?.currentUser?.email });
            localStorage.setItem("currentUser",auth?.currentUser?.uid)
            window.location.reload()
        } catch (error) {
            console.error(error)
        }
    }


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className='login'>
            <h1>Signup</h1>
            <span>Email</span>
            <input required="true" onChange={(e) => setEmail(e.target.value)} type="email" placeholder='e-mail' />
            <span>Password</span>
            <input required="true" onChange={(e) => setPassword(e.target.value)} type="password" />
            <button onClick={(e)=>onSignup(e)} >Signup</button>
            <button onClick={(e)=>onGoogleLogin(e)} >Signup with google</button>
            <Link to='/' >Already have an account ?</Link>
        </div>
    )
}

export default Signup
