import React from 'react'
import "./styles/Login.css"
import { useState } from 'react'
import { auth, addDocument, googleAuth } from './firebase'
import { FirebaseError } from 'firebase/app'
import { Link,useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth'

const Login = (props) => {


    const onLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log(auth.currentUser.uid)
            localStorage.setItem("currentUser", auth?.currentUser?.uid)
            // props.setCurrentUser(auth?.currentUser?.uid);
        }
        catch (FirebaseError) {
            console.error(FirebaseError);
        }
        finally{
            window.location.reload()
        }
    }

    const onGoogleLogin = async () => {
        try {
            await signInWithPopup(auth, googleAuth)
            localStorage.setItem("currentUser", auth?.currentUser?.uid)
            await addDocument({ uid: auth?.currentUser?.uid, email: auth?.currentUser?.email });
        } catch (error) {
            console.error(error)
        }
        finally{
            window.location.reload()
        }
    }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <form className='login'>
            <h1>Login</h1>
            <span>Email</span>
            <input required="true" onChange={(e) => setEmail(e.target.value)} type="email" placeholder='e-mail' />
            <span>Password</span>
            <input required="true" onChange={(e) => setPassword(e.target.value)} type="password" />
            <button onClick={(e)=>onLogin(e)} >Login</button>
            <button onClick={onGoogleLogin} >Login with google</button>
            <Link to='/signup' >Create a new account ?</Link>

        </form>
    )
}

export default Login
