import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [page, setPage] = useState(<div><p>body</p></div>)

  return (
    <>
      <header>
        <h2>Tap & Tini</h2>
        <button>Cart</button>
      </header>
      
      <div className='content'>
        {page}
      </div>
    </>
  )
}

export default App
