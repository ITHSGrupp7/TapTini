import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Meny from './Meny'

function App() {
  const [page, setPage] = useState(<Meny />)
  

  return (
    <>
      <header>
        <h2>Tap & Tini</h2>
        <a href="/cart">
          <span className="material-symbols-outlined">
            shopping_cart
          </span>
        </a>
      </header>

      <main className='content'>
        {page}
      </main>
    </>
  )
}

export default App
