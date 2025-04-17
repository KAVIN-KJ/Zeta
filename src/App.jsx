import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Complier from './Compiler'
import { useEffect } from 'react'
import Compiler from './Compiler'
import Auth from './Auth'
import FileList from './FileList'
function App() {
  return (
    <>
      <div className='app-container'>
        {
          localStorage.getItem("currentUser") !== "null" && localStorage.getItem("currentUser") !== null ? (
            <>
              <Compiler />
            </>
          ) :
            <Auth />
        }

      </div>
    </>
  )
}

export default App
