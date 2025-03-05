import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Complier from './Compiler'
import Loading from './Loading'
import ZetaBot from './ZetaBot'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='app-container'>
          <Complier/>
          {/* <ZetaBot/> */}
      </div>
    </>
  )
}

export default App
